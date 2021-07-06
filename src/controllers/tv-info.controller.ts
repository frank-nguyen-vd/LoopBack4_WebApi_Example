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
import { TvInfo } from '../models';
import { TvInfoRepository } from '../repositories';

export class TvInfoController {
  constructor(
    @repository(TvInfoRepository)
    public tvInfoRepository: TvInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/tv-info', {
    responses: {
      '200': {
        description: 'TvInfo model instance',
        content: { 'application/json': { schema: getModelSchemaRef(TvInfo) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    tvInfo: Omit<TvInfo, 'id'>
  ): Promise<TvInfo> {
    const foundItem = await this.tvInfoRepository.findOne({
      where: { location: tvInfo.location },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.TV_INFO.EXISTS);
    }
    return this.tvInfoRepository.create(tvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-info/count', {
    responses: {
      '200': {
        description: 'TvInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(TvInfo) where?: Where<TvInfo>): Promise<Count> {
    return this.tvInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-info', {
    responses: {
      '200': {
        description: 'Array of TvInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(TvInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(TvInfo) filter?: Filter<TvInfo>): Promise<TvInfo[]> {
    return this.tvInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/tv-info', {
    responses: {
      '200': {
        description: 'TvInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvInfo, { partial: true }),
        },
      },
    })
    tvInfo: TvInfo,
    @param.where(TvInfo) where?: Where<TvInfo>
  ): Promise<Count> {
    return this.tvInfoRepository.updateAll(tvInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-info/{id}', {
    responses: {
      '200': {
        description: 'TvInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TvInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TvInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<TvInfo>
  ): Promise<TvInfo> {
    return this.tvInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/tv-info/{id}', {
    responses: {
      '204': {
        description: 'TvInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvInfo, { partial: true }),
        },
      },
    })
    tvInfo: Partial<TvInfo>
  ): Promise<void> {
    await this.tvInfoRepository.updateById(id, tvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/tv-info/{id}', {
    responses: {
      '204': {
        description: 'TvInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tvInfo: TvInfo
  ): Promise<void> {
    await this.tvInfoRepository.replaceById(id, tvInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/tv-info/{id}', {
    responses: {
      '204': {
        description: 'TvInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tvInfoRepository.deleteById(id);
  }
}
