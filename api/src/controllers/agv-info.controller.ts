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
  response,
} from '@loopback/rest';
import { log, LOG_LEVEL } from '../logger';
import { AgvInfo } from '../models';
import { AgvInfoRepository } from '../repositories';

export class AgvInfoController {
  constructor(
    @repository(AgvInfoRepository)
    public agvInfoRepository: AgvInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/agv-infos')
  @response(200, {
    description: 'AgvInfo model instance',
    content: { 'application/json': { schema: getModelSchemaRef(AgvInfo) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvInfo, {}),
        },
      },
    })
    agvInfo: AgvInfo
  ): Promise<AgvInfo> {
    return this.agvInfoRepository.create(agvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-infos/count')
  @response(200, {
    description: 'AgvInfo model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(AgvInfo) where?: Where<AgvInfo>): Promise<Count> {
    return this.agvInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-infos')
  @response(200, {
    description: 'Array of AgvInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AgvInfo, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(AgvInfo) filter?: Filter<AgvInfo>
  ): Promise<AgvInfo[]> {
    return this.agvInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/agv-infos')
  @response(200, {
    description: 'AgvInfo PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvInfo, { partial: true }),
        },
      },
    })
    agvInfo: AgvInfo,
    @param.where(AgvInfo) where?: Where<AgvInfo>
  ): Promise<Count> {
    return this.agvInfoRepository.updateAll(agvInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-infos/{id}')
  @response(200, {
    description: 'AgvInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AgvInfo, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AgvInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<AgvInfo>
  ): Promise<AgvInfo> {
    return this.agvInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/agv-infos/{id}')
  @response(204, {
    description: 'AgvInfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvInfo, { partial: true }),
        },
      },
    })
    agvInfo: AgvInfo
  ): Promise<void> {
    await this.agvInfoRepository.updateById(id, agvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/agv-infos/{id}')
  @response(204, {
    description: 'AgvInfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() agvInfo: AgvInfo
  ): Promise<void> {
    await this.agvInfoRepository.replaceById(id, agvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/agv-infos/{id}')
  @response(204, {
    description: 'AgvInfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agvInfoRepository.deleteById(id);
  }
}
