// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { UserService } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { compare, genSalt, hash } from 'bcryptjs';
import { MESSAGE } from '../../../keys';
import {
  Credentials,
  ResetPassCredentials,
  UserCredential,
  UserInfo,
  UserInfoRelations,
} from '../../../models';
import {
  GroupInfoRepository,
  UserCredentialRepository,
  UserInfoRepository,
} from '../../../repositories';
import {
  RbacSubject,
  TokenParamsSchema,
  TokenProfile,
  UserStatus,
} from '../../keys';
import { TokenServiceBindings } from '../keys';
import { JWTService } from './jwt.service';

export class MyUserService implements UserService<UserInfo, Credentials> {
  constructor(
    @repository(UserInfoRepository) public userRepository: UserInfoRepository,
    @repository(GroupInfoRepository)
    public groupRepository: GroupInfoRepository,
    @repository(UserCredentialRepository)
    public userCredentialRepository: UserCredentialRepository,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService
  ) {}

  async verifyCredentials(request: Credentials): Promise<UserInfo> {
    // check if staff Id exists
    const foundUser = await this.userRepository.findOne({
      where: { username: request.username },
    });

    // Reject login request if user info is not found
    if (!foundUser) {
      throw new HttpErrors.Unauthorized();
    }

    // Reject login request if user credential not found
    const foundCredential = await this.userRepository.userCredential(
      foundUser.id
    );

    if (!foundCredential) {
      throw new HttpErrors.Unauthorized(MESSAGE.USER.INVALID_CREDENTIAL);
    }

    // Reject login request if user account is disabled
    if (foundUser.status === UserStatus.Disabled) {
      throw new HttpErrors.Unauthorized(MESSAGE.USER.DISABLED);
    }

    // Reject login request if exceeds number of password submissions
    const passwordSubmissions = foundCredential.passwordSubmissions ?? 0;
    if (passwordSubmissions <= 0) {
      throw new HttpErrors.Unauthorized(MESSAGE.PASSWORD.EXCEED_TRIES);
    }

    // Reject login request if password expires
    const passwordExpiry = foundCredential.passwordExpiry ?? new Date();
    if (new Date() > passwordExpiry) {
      throw new HttpErrors.Unauthorized(MESSAGE.PASSWORD.EXPIRES);
    }

    // Before checking password, we count this password submission
    await this.userCredentialRepository.updateById(foundCredential.id, {
      passwordSubmissions: passwordSubmissions - 1,
    });

    // Reject login request if wrong password
    const hashedPassword = foundCredential.password ?? '';
    const passwordMatched = await compare(request.password, hashedPassword);

    if (!passwordMatched) {
      throw new HttpErrors.Unauthorized(MESSAGE.USER.INVALID_CREDENTIAL);
    }

    return foundUser;
  }

  convertToUserProfile(userInfo: UserInfo): UserProfile {
    return {
      [securityId]: userInfo.id.toString(),
    };
  }

  async getUserRole(userId: number): Promise<string> {
    const group = await this.userRepository.group(userId);
    const accessLevel = await this.groupRepository.accessLevel(group.id);
    const userRole = accessLevel.alias ?? RbacSubject.None;

    return userRole;
  }

  async createTokenProfile(
    userInfo: UserInfo,
    userRole: string,
    tokenParams: TokenParamsSchema
  ): Promise<TokenProfile> {
    const tokenExpiry = new Date();
    tokenExpiry.setMinutes(
      tokenExpiry.getMinutes() + tokenParams.Expires_In_Minutes
    );
    return {
      [securityId]: userInfo.id.toString(),
      userId: userInfo.id,
      userRole,
      tokenType: tokenParams.Code,
      tokenExpiry,
    };
  }

  async generateToken(
    userInfo: UserInfo & UserInfoRelations,
    userRole: string,
    tokenParams: TokenParamsSchema
  ): Promise<string> {
    const tokenProfile = await this.createTokenProfile(
      userInfo,
      userRole,
      tokenParams
    );
    return await this.jwtService.generateToken(tokenProfile);
  }

  async hashPassword(password: string, rounds = 10): Promise<string> {
    const salt = await genSalt(rounds);
    return hash(password, salt);
  }

  async getUserInfoByKey(key: string, value: any): Promise<UserInfo> {
    const filter = { where: { [key]: value } };
    const userInfo = await this.userRepository.findOne(filter);
    if (!userInfo) {
      throw new HttpErrors.Unauthorized(MESSAGE.USER.NOT_EXISTS);
    }
    return userInfo;
  }

  async getUserInfo(
    username?: string,
    credential?: Credentials,
    reset_pass_request?: ResetPassCredentials
  ): Promise<UserInfo> {
    if (credential) {
      return await this.verifyCredentials(credential);
    }

    if (username) {
      return this.getUserInfoByKey('username', username);
    }

    if (reset_pass_request) {
      const userInfo = await this.getUserInfoByKey(
        'username',
        reset_pass_request.username
      );

      if (userInfo.contactNumber !== reset_pass_request.contactNumber) {
        throw new HttpErrors.Unauthorized(MESSAGE.USER.INVALID_CONTACT);
      }

      return userInfo;
    }

    throw new HttpErrors.Unauthorized(MESSAGE.MISC.NO_PARAMS);
  }

  async getUserCredential(userId: number): Promise<UserCredential> {
    const userCredential = await this.userRepository.userCredential(userId);
    if (!userCredential) {
      throw new HttpErrors.Unauthorized(MESSAGE.USER.NOT_EXISTS);
    }
    return userCredential;
  }

  async updateUserCredential(
    userCredentialId: number,
    data: Partial<UserCredential>
  ) {
    await this.userCredentialRepository.updateById(userCredentialId, data);
  }
}
