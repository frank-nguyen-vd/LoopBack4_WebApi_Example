// Copyright IBM Corp. 2020. All Rights Reserved.
// Node module: @loopback/example-access-control-migration
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import { TokenService } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { HttpErrors } from '@loopback/rest';
import { securityId, UserProfile } from '@loopback/security';
import { promisify } from 'util';
import { MESSAGE } from '../../../keys';
import { TokenProfile } from '../../keys';
import { TokenServiceBindings } from '../keys';

const jwt = require('jsonwebtoken');
const signAsync = promisify(jwt.sign);
const verifyAsync = promisify(jwt.verify);

export class JWTService implements TokenService {
  constructor(
    @inject(TokenServiceBindings.TOKEN_SECRET)
    private jwtSecret: string,
    @inject(TokenServiceBindings.TOKEN_EXPIRES_IN)
    private jwtExpiresIn: string
  ) {}

  async verifyToken(token: string): Promise<UserProfile> {
    throw new HttpErrors.Unauthorized(MESSAGE.TOKEN.INVALID);
  }

  async getTokenProfile(token: string): Promise<TokenProfile> {
    if (!token) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : 'token' is null`
      );
    }

    let tokenProfile: TokenProfile;

    try {
      // decode user profile from token
      const decodedToken = await verifyAsync(token, this.jwtSecret);

      if (!decodedToken.tokenExpiry || new Date() > decodedToken.tokenExpiry) {
        throw new HttpErrors.Unauthorized(
          `Error verifying token : 'token' expires`
        );
      }

      // don't copy over  token field 'iat' and 'exp', nor 'email' to user profile
      tokenProfile = Object.assign(
        { [securityId]: '', name: '' },
        {
          [securityId]: decodedToken.id,
          userId: decodedToken.userId,
          userRole: decodedToken.userRole,
          tokenType: decodedToken.tokenType,
          tokenExpiry: decodedToken.tokenExpiry,
        }
      );
    } catch (error) {
      throw new HttpErrors.Unauthorized(
        `Error verifying token : ${error.message}`
      );
    }
    return tokenProfile;
  }

  async generateToken(tokenProfile: TokenProfile): Promise<string> {
    if (!tokenProfile) {
      throw new HttpErrors.Unauthorized(
        'Error generating token : userProfile is null'
      );
    }

    // Generate a JSON Web Token
    let token: string;
    try {
      token = await signAsync(tokenProfile, this.jwtSecret, {
        expiresIn: Number(this.jwtExpiresIn),
      });
    } catch (error) {
      throw new HttpErrors.Unauthorized(`Error encoding token : ${error}`);
    }

    return token;
  }
}
