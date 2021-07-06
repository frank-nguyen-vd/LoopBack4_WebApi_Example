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
import { DeceasedInfo, HearthInfo } from '../models';
import { HearthInfoRepository } from '../repositories';

export class HearthInfoController {
  constructor(
    @repository(HearthInfoRepository)
    public hearthInfoRepository: HearthInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(HearthInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    hearthInfo: Omit<HearthInfo, 'id'>
  ): Promise<HearthInfo> {
    const foundItem = await this.hearthInfoRepository.findOne({
      where: { location: hearthInfo.location },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.HEARTH.EXISTS);
    }
    return this.hearthInfoRepository.create(hearthInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-info/count', {
    responses: {
      '200': {
        description: 'HearthInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(HearthInfo) where?: Where<HearthInfo>
  ): Promise<Count> {
    return this.hearthInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-info', {
    responses: {
      '200': {
        description: 'Array of HearthInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(HearthInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(HearthInfo) filter?: Filter<HearthInfo>
  ): Promise<HearthInfo[]> {
    return this.hearthInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthInfo, { partial: true }),
        },
      },
    })
    hearthInfo: HearthInfo,
    @param.where(HearthInfo) where?: Where<HearthInfo>
  ): Promise<Count> {
    return this.hearthInfoRepository.updateAll(hearthInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-info/{id}', {
    responses: {
      '200': {
        description: 'HearthInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HearthInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HearthInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<HearthInfo>
  ): Promise<HearthInfo> {
    return this.hearthInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/hearth-info/{id}', {
    responses: {
      '204': {
        description: 'HearthInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthInfo, { partial: true }),
        },
      },
    })
    hearthInfo: Partial<HearthInfo>
  ): Promise<void> {
    await this.hearthInfoRepository.updateById(id, hearthInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/hearth-info/{id}', {
    responses: {
      '204': {
        description: 'HearthInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hearthInfo: HearthInfo
  ): Promise<void> {
    await this.hearthInfoRepository.replaceById(id, hearthInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/hearth-info/{id}', {
    responses: {
      '204': {
        description: 'HearthInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hearthInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-info/{id}/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo belonging to HearthInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DeceasedInfo) },
          },
        },
      },
    },
  })
  async getDeceasedInfo(
    @param.path.number('id') id: typeof HearthInfo.prototype.id
  ): Promise<DeceasedInfo> {
    return this.hearthInfoRepository.deceased(id);
  }
}
