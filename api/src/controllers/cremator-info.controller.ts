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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import { MESSAGE } from '../keys';
import { log, LOG_LEVEL } from '../logger';
import { CrematorInfo, HearthInfo, ServiceHallInfo } from '../models';
import { CrematorInfoRepository } from '../repositories';

export class CrematorInfoController {
  constructor(
    @repository(CrematorInfoRepository)
    public crematorInfoRepository: CrematorInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/cremator-info', {
    responses: {
      '200': {
        description: 'CrematorInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(CrematorInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    crematorInfo: Omit<CrematorInfo, 'id'>
  ): Promise<CrematorInfo> {
    const foundItem = await this.crematorInfoRepository.findOne({
      where: { crematorNumber: crematorInfo.crematorNumber },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.CREMATOR_INFO.EXISTS);
    }
    return this.crematorInfoRepository.create(crematorInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-info/count', {
    responses: {
      '200': {
        description: 'CrematorInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CrematorInfo) where?: Where<CrematorInfo>
  ): Promise<Count> {
    return this.crematorInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-info', {
    responses: {
      '200': {
        description: 'Array of CrematorInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CrematorInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CrematorInfo) filter?: Filter<CrematorInfo>
  ): Promise<CrematorInfo[]> {
    return this.crematorInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremator-info', {
    responses: {
      '200': {
        description: 'CrematorInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorInfo, { partial: true }),
        },
      },
    })
    crematorInfo: CrematorInfo,
    @param.where(CrematorInfo) where?: Where<CrematorInfo>
  ): Promise<Count> {
    return this.crematorInfoRepository.updateAll(crematorInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-info/{id}', {
    responses: {
      '200': {
        description: 'CrematorInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CrematorInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CrematorInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<CrematorInfo>
  ): Promise<CrematorInfo> {
    return this.crematorInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremator-info/{id}', {
    responses: {
      '204': {
        description: 'CrematorInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorInfo, { partial: true }),
        },
      },
    })
    crematorInfo: Partial<CrematorInfo>
  ): Promise<void> {
    await this.crematorInfoRepository.updateById(id, crematorInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/cremator-info/{id}', {
    responses: {
      '204': {
        description: 'CrematorInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() crematorInfo: CrematorInfo
  ): Promise<void> {
    await this.crematorInfoRepository.replaceById(id, crematorInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/cremator-info/{id}', {
    responses: {
      '204': {
        description: 'CrematorInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.crematorInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-info/{id}/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to CrematorInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthInfo(
    @param.path.number('id') id: typeof CrematorInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.crematorInfoRepository.hearth(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-info/{id}/service-hall-info', {
    responses: {
      '200': {
        description: 'ServiceHallInfo belonging to CrematorInfo',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceHallInfo),
            },
          },
        },
      },
    },
  })
  async getServiceHallInfo(
    @param.path.number('id') id: typeof CrematorInfo.prototype.id
  ): Promise<ServiceHallInfo> {
    return this.crematorInfoRepository.serviceHall(id);
  }
}
