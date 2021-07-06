import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  model,
  property,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import _ from 'lodash';
import { MESSAGE } from '../keys';
import { log, LOG_LEVEL } from '../logger';
import { GroupInfo, UserCredential, UserInfo } from '../models';
import { MyUserService, UserServiceBindings } from '../rbac';
import { RbacParams, UserStatus } from '../rbac/casbin-authorization';
import {
  GroupInfoRepository,
  UserCredentialRepository,
  UserInfoRepository,
} from '../repositories';

@model()
export class NewUserRequest extends UserInfo {
  @property({
    type: 'string',
    required: true,
  })
  password: string;
}

export class UserInfoController {
  constructor(
    @repository(UserInfoRepository)
    public userRepository: UserInfoRepository,
    @repository(GroupInfoRepository)
    public groupRepository: GroupInfoRepository,
    @repository(UserCredentialRepository)
    public userCredentialRepository: UserCredentialRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/user', {
    responses: {
      '200': {
        description: 'DeceasedInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(UserInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewUserRequest, {
            exclude: ['id', 'userCredentialId', 'status'],
          }),
        },
      },
    })
    newUserRequest: Omit<NewUserRequest, 'id' | 'userCredentialId'>
  ): Promise<UserInfo> {
    // We ensure user profile does not exist
    if (
      await this.userRepository.findOne({
        where: { username: newUserRequest.username },
      })
    ) {
      throw new HttpErrors.BadRequest(MESSAGE.USER.EXISTS);
    }

    // We hash the password before saving it to ensure nobody else can uncover this password
    const password = await this.userService.hashPassword(
      newUserRequest.password
    );

    // New password will expire in number of days e.g 90 days from this moment
    const passwordExpiry = new Date();
    passwordExpiry.setDate(
      passwordExpiry.getDate() + RbacParams.Password.Expires_In_Days
    );

    // Create new user credential
    const newUserCredential = new UserCredential({
      password,
      passwordExpiry,
      passwordSubmissions: RbacParams.Password.Max_Submissions,
    });
    const createdUserCredential = await this.userCredentialRepository.create(
      newUserCredential
    );

    // Create new user account
    const newUserInfo = new UserInfo(_.omit(newUserRequest, 'password'));
    newUserInfo.userCredentialId = createdUserCredential.id;
    newUserInfo.status = UserStatus.Pending;
    const createdUserInfo = await this.userRepository.create(newUserInfo);

    // Update the number of members in a group
    this.groupRepository.increaseMembersCount(createdUserInfo.groupId);

    return createdUserInfo;
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/user', {
    responses: {
      '200': {
        description: 'List of users',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(UserInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async listAll(
    @param.filter(UserInfo) filter?: Filter<UserInfo>
  ): Promise<UserInfo[]> {
    return this.userRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/user/{id}', {
    responses: {
      '200': {
        description: 'User Info',
        content: {
          'application/json': {
            schema: getModelSchemaRef(UserInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<UserInfo> {
    const foundUser = await this.userRepository.findById(id);
    if (!foundUser) {
      throw new HttpErrors.BadRequest(MESSAGE.USER.NOT_EXISTS);
    }
    return foundUser;
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/user/{id}', {
    responses: {
      '204': {
        description: 'User PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(UserInfo, { partial: true }),
        },
      },
    })
    modifiedUser: Partial<UserInfo>
  ): Promise<void> {
    const foundUser = await this.findById(id);
    if (modifiedUser.groupId && foundUser.groupId !== modifiedUser.groupId) {
      await this.groupRepository.decreaseMembersCount(foundUser.groupId);
      await this.groupRepository.increaseMembersCount(modifiedUser.groupId);
    }
    this.userRepository.updateById(id, modifiedUser);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/user/{id}', {
    responses: {
      '204': {
        description: 'User DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    const foundUser = await this.findById(id);
    const userCredential = await this.getUserCredential(id);
    if (userCredential) {
      await this.userCredentialRepository.deleteById(userCredential.id);
    }
    await this.groupRepository.decreaseMembersCount(foundUser.groupId);
    await this.userRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/user/count', {
    responses: {
      '200': {
        description: 'UserInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(UserInfo) where?: Where<UserInfo>): Promise<Count> {
    return this.userRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/user/{id}/credential', {
    responses: {
      '200': {
        description: 'UserCredential belonging to UserInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserCredential) },
          },
        },
      },
    },
  })
  async getUserCredential(
    @param.path.number('id') id: typeof UserInfo.prototype.id
  ): Promise<UserCredential> {
    return this.userRepository.userCredential(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/user/{id}/group', {
    responses: {
      '200': {
        description: 'GroupInfo belonging to UserInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(GroupInfo) },
          },
        },
      },
    },
  })
  async getGroupInfo(
    @param.path.number('id') id: typeof UserInfo.prototype.id
  ): Promise<GroupInfo> {
    return this.userRepository.group(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/user/{id}/disable', {
    responses: {
      '204': {
        description: 'User DISABLE success',
      },
    },
  })
  async disableById(@param.path.number('id') id: number): Promise<void> {
    const foundUser = await this.findById(id);
    this.groupRepository.decreaseMembersCount(foundUser.groupId);
    this.updateById(id, { status: UserStatus.Disabled });
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/user/{id}/enable', {
    responses: {
      '204': {
        description: 'User ENABLE success',
      },
    },
  })
  async enableById(@param.path.number('id') id: number): Promise<void> {
    const foundUser = await this.findById(id);
    this.groupRepository.increaseMembersCount(foundUser.groupId);
    this.updateById(id, { status: UserStatus.Pending });
  }
}
