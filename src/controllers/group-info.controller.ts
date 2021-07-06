import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  FilterExcludingWhere,
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
  put,
  requestBody,
} from '@loopback/rest';
import { MESSAGE } from '../keys';
import { log, LOG_LEVEL } from '../logger';
import { AccessLevel, GroupInfo } from '../models';
import { GroupStatus } from '../rbac/keys';
import { GroupInfoRepository } from '../repositories';

export class GroupInfoController {
  constructor(
    @repository(GroupInfoRepository)
    public groupInfoRepository: GroupInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/group', {
    responses: {
      '200': {
        description: 'GroupInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(GroupInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupInfo, {
            exclude: ['id', 'status'],
          }),
        },
      },
    })
    newGroup: Omit<GroupInfo, 'id'>
  ): Promise<GroupInfo> {
    const foundGroup = await this.groupInfoRepository.findOne({
      where: { or: [{ name: newGroup.name }, { alias: newGroup.alias }] },
    });
    if (foundGroup) {
      throw new HttpErrors.BadRequest(MESSAGE.GROUP.EXISTS);
    }
    newGroup.status = GroupStatus.Enabled;
    return this.groupInfoRepository.create(newGroup);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/group/count', {
    responses: {
      '200': {
        description: 'GroupInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(GroupInfo) where?: Where<GroupInfo>
  ): Promise<Count> {
    return this.groupInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/group', {
    responses: {
      '200': {
        description: 'Array of GroupInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(GroupInfo),
            },
          },
        },
      },
    },
  })
  async find(): Promise<GroupInfo[]> {
    return this.groupInfoRepository.find();
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/group', {
    responses: {
      '200': {
        description: 'GroupInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupInfo, { partial: true }),
        },
      },
    })
    groupInfo: GroupInfo,
    @param.where(GroupInfo) where?: Where<GroupInfo>
  ): Promise<Count> {
    return this.groupInfoRepository.updateAll(groupInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/group/{id}', {
    responses: {
      '200': {
        description: 'GroupInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(GroupInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(GroupInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<GroupInfo>
  ): Promise<GroupInfo> {
    return this.groupInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/group/{id}', {
    responses: {
      '204': {
        description: 'GroupInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(GroupInfo, { partial: true }),
        },
      },
    })
    groupInfo: Partial<GroupInfo>
  ): Promise<void> {
    await this.groupInfoRepository.updateById(id, groupInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/group/{id}', {
    responses: {
      '204': {
        description: 'GroupInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() groupInfo: GroupInfo
  ): Promise<void> {
    await this.groupInfoRepository.replaceById(id, groupInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/group/{id}', {
    responses: {
      '204': {
        description: 'GroupInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.groupInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/group/{id}/access-level', {
    responses: {
      '200': {
        description: 'AccessLevel belonging to GroupInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AccessLevel) },
          },
        },
      },
    },
  })
  async getAccessLevel(
    @param.path.number('id') id: typeof GroupInfo.prototype.id
  ): Promise<AccessLevel> {
    return this.groupInfoRepository.accessLevel(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/group/{id}/disable', {
    responses: {
      '204': {
        description: 'Group DISABLE success',
      },
    },
  })
  async disableById(@param.path.number('id') id: number): Promise<void> {
    this.updateById(id, { status: GroupStatus.Disabled });
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/group/{id}/enable', {
    responses: {
      '204': {
        description: 'User ENABLE success',
      },
    },
  })
  async enableById(@param.path.number('id') id: number): Promise<void> {
    this.updateById(id, { status: GroupStatus.Enabled });
  }
}
