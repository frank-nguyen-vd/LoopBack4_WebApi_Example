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
import { MultipleCasketInfo, ServiceHallInfo } from '../models';
import { MultipleCasketInfoRepository } from '../repositories';

export class MultipleCasketInfoController {
  constructor(
    @repository(MultipleCasketInfoRepository)
    public multipleCasketInfoRepository: MultipleCasketInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/multiple-casket-info', {
    responses: {
      '200': {
        description: 'MultipleCasketInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(MultipleCasketInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MultipleCasketInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    multipleCasketInfo: Omit<MultipleCasketInfo, 'y'>
  ): Promise<MultipleCasketInfo> {
    return this.multipleCasketInfoRepository.create(multipleCasketInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/multiple-casket-info/count', {
    responses: {
      '200': {
        description: 'MultipleCasketInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(MultipleCasketInfo) where?: Where<MultipleCasketInfo>
  ): Promise<Count> {
    return this.multipleCasketInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/multiple-casket-info', {
    responses: {
      '200': {
        description: 'Array of MultipleCasketInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MultipleCasketInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MultipleCasketInfo) filter?: Filter<MultipleCasketInfo>
  ): Promise<MultipleCasketInfo[]> {
    return this.multipleCasketInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/multiple-casket-info', {
    responses: {
      '200': {
        description: 'MultipleCasketInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MultipleCasketInfo, { partial: true }),
        },
      },
    })
    multipleCasketInfo: MultipleCasketInfo,
    @param.where(MultipleCasketInfo) where?: Where<MultipleCasketInfo>
  ): Promise<Count> {
    return this.multipleCasketInfoRepository.updateAll(
      multipleCasketInfo,
      where
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/multiple-casket-info/{id}', {
    responses: {
      '200': {
        description: 'MultipleCasketInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MultipleCasketInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MultipleCasketInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<MultipleCasketInfo>
  ): Promise<MultipleCasketInfo> {
    return this.multipleCasketInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/multiple-casket-info/{id}', {
    responses: {
      '204': {
        description: 'MultipleCasketInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MultipleCasketInfo, { partial: true }),
        },
      },
    })
    multipleCasketInfo: MultipleCasketInfo
  ): Promise<void> {
    await this.multipleCasketInfoRepository.updateById(id, multipleCasketInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/multiple-casket-info/{id}', {
    responses: {
      '204': {
        description: 'MultipleCasketInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() multipleCasketInfo: MultipleCasketInfo
  ): Promise<void> {
    await this.multipleCasketInfoRepository.replaceById(id, multipleCasketInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/multiple-casket-info/{id}', {
    responses: {
      '204': {
        description: 'MultipleCasketInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.multipleCasketInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/multiple-casket-info/{id}/service-hall-info', {
    responses: {
      '200': {
        description: 'ServiceHallInfo belonging to MultipleCasketInfo',
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
    @param.path.number('id') id: typeof MultipleCasketInfo.prototype.id
  ): Promise<ServiceHallInfo> {
    return this.multipleCasketInfoRepository.serviceHall(id);
  }
}
