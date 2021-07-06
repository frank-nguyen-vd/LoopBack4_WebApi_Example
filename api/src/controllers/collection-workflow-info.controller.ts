import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import { log, LOG_LEVEL } from '../logger';
import {
  CollectionWorkflowInfo,
  DeceasedInfo,
  HearthInfo,
  LockerInfo,
  OneIlsToPcms,
  RecipientInfo,
  RoomInfo,
} from '../models';
import { CollectionWorkflowInfoRepository } from '../repositories';

export class CollectionWorkflowInfoController {
  constructor(
    @repository(CollectionWorkflowInfoRepository)
    public collectionWorkflowInfoRepository: CollectionWorkflowInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/collection-workflow-info', {
    responses: {
      '200': {
        description: 'CollectionWorkflowInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CollectionWorkflowInfo),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflowInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    collectionWorkflowInfo: Omit<CollectionWorkflowInfo, 'id'>
  ): Promise<CollectionWorkflowInfo> {
    return this.collectionWorkflowInfoRepository.create(collectionWorkflowInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/count', {
    responses: {
      '200': {
        description: 'CollectionWorkflowInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CollectionWorkflowInfo) where?: Where<CollectionWorkflowInfo>
  ): Promise<Count> {
    return this.collectionWorkflowInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info', {
    responses: {
      '200': {
        description: 'Array of CollectionWorkflowInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CollectionWorkflowInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CollectionWorkflowInfo)
    filter?: Filter<CollectionWorkflowInfo>
  ): Promise<CollectionWorkflowInfo[]> {
    return this.collectionWorkflowInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/collection-workflow-info', {
    responses: {
      '200': {
        description: 'CollectionWorkflowInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflowInfo, { partial: true }),
        },
      },
    })
    collectionWorkflowInfo: CollectionWorkflowInfo,
    @param.where(CollectionWorkflowInfo) where?: Where<CollectionWorkflowInfo>
  ): Promise<Count> {
    return this.collectionWorkflowInfoRepository.updateAll(
      collectionWorkflowInfo,
      where
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}', {
    responses: {
      '200': {
        description: 'CollectionWorkflowInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CollectionWorkflowInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CollectionWorkflowInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<CollectionWorkflowInfo>
  ): Promise<CollectionWorkflowInfo> {
    return this.collectionWorkflowInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/collection-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflowInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflowInfo, { partial: true }),
        },
      },
    })
    collectionWorkflowInfo: Partial<CollectionWorkflowInfo>
  ): Promise<void> {
    await this.collectionWorkflowInfoRepository.updateById(
      id,
      collectionWorkflowInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/collection-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflowInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() collectionWorkflowInfo: CollectionWorkflowInfo
  ): Promise<void> {
    await this.collectionWorkflowInfoRepository.replaceById(
      id,
      collectionWorkflowInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/collection-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflowInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.collectionWorkflowInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/hearth-cremain', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthCremain(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.collectionWorkflowInfoRepository.hearthCremain(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/hearth-empty-1', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthEmpty1(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.collectionWorkflowInfoRepository.hearthEmpty1(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/hearth-empty-2', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthEmpty2(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.collectionWorkflowInfoRepository.hearthEmpty2(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DeceasedInfo) },
          },
        },
      },
    },
  })
  async getDeceasedInfo(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<DeceasedInfo> {
    return this.collectionWorkflowInfoRepository.deceased(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'OneIlsToPcms belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(OneIlsToPcms) },
          },
        },
      },
    },
  })
  async getOneIlsToPcms(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<OneIlsToPcms> {
    return this.collectionWorkflowInfoRepository.oneIls(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/room-info', {
    responses: {
      '200': {
        description: 'RoomInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(RoomInfo) },
          },
        },
      },
    },
  })
  async getRoomInfo(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<RoomInfo> {
    return this.collectionWorkflowInfoRepository.room(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/locker-info', {
    responses: {
      '200': {
        description: 'LockerInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(LockerInfo) },
          },
        },
      },
    },
  })
  async getLockerInfo(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<LockerInfo> {
    return this.collectionWorkflowInfoRepository.locker(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow-info/{id}/recipient-info', {
    responses: {
      '200': {
        description: 'RecipientInfo belonging to CollectionWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(RecipientInfo) },
          },
        },
      },
    },
  })
  async getRecipientInfo(
    @param.path.number('id') id: typeof CollectionWorkflowInfo.prototype.id
  ): Promise<RecipientInfo> {
    return this.collectionWorkflowInfoRepository.recipient(id);
  }
}
