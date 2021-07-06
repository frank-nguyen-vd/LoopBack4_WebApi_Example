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
import { ScannerInfo, ServiceHallInfo, TvInfo } from '../models';
import { ServiceHallInfoRepository } from '../repositories';

export class ServiceHallInfoController {
  constructor(
    @repository(ServiceHallInfoRepository)
    public serviceHallInfoRepository: ServiceHallInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/service-hall-info', {
    responses: {
      '200': {
        description: 'ServiceHallInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ServiceHallInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceHallInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    serviceHallInfo: Omit<ServiceHallInfo, 'id'>
  ): Promise<ServiceHallInfo> {
    return this.serviceHallInfoRepository.create(serviceHallInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/service-hall-info/count', {
    responses: {
      '200': {
        description: 'ServiceHallInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ServiceHallInfo) where?: Where<ServiceHallInfo>
  ): Promise<Count> {
    return this.serviceHallInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/service-hall-info', {
    responses: {
      '200': {
        description: 'Array of ServiceHallInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceHallInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ServiceHallInfo) filter?: Filter<ServiceHallInfo>
  ): Promise<ServiceHallInfo[]> {
    return this.serviceHallInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/service-hall-info', {
    responses: {
      '200': {
        description: 'ServiceHallInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceHallInfo, { partial: true }),
        },
      },
    })
    serviceHallInfo: ServiceHallInfo,
    @param.where(ServiceHallInfo) where?: Where<ServiceHallInfo>
  ): Promise<Count> {
    return this.serviceHallInfoRepository.updateAll(serviceHallInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/service-hall-info/{id}', {
    responses: {
      '200': {
        description: 'ServiceHallInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ServiceHallInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ServiceHallInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<ServiceHallInfo>
  ): Promise<ServiceHallInfo> {
    return this.serviceHallInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/service-hall-info/{id}', {
    responses: {
      '204': {
        description: 'ServiceHallInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ServiceHallInfo, { partial: true }),
        },
      },
    })
    serviceHallInfo: ServiceHallInfo
  ): Promise<void> {
    await this.serviceHallInfoRepository.updateById(id, serviceHallInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/service-hall-info/{id}', {
    responses: {
      '204': {
        description: 'ServiceHallInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() serviceHallInfo: ServiceHallInfo
  ): Promise<void> {
    await this.serviceHallInfoRepository.replaceById(id, serviceHallInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/service-hall-info/{id}', {
    responses: {
      '204': {
        description: 'ServiceHallInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.serviceHallInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/service-hall-info/{id}/tv-info', {
    responses: {
      '200': {
        description: 'TvInfo belonging to ServiceHallInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(TvInfo) },
          },
        },
      },
    },
  })
  async getTvInfo(
    @param.path.number('id') id: typeof ServiceHallInfo.prototype.id
  ): Promise<TvInfo> {
    return this.serviceHallInfoRepository.tv(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/service-hall-info/{id}/scanner-info', {
    responses: {
      '200': {
        description: 'ScannerInfo belonging to ServiceHallInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ScannerInfo) },
          },
        },
      },
    },
  })
  async getScannerInfo(
    @param.path.number('id') id: typeof ServiceHallInfo.prototype.id
  ): Promise<ScannerInfo> {
    return this.serviceHallInfoRepository.hearseScanner(id);
  }
}
