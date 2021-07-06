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
import { DeceasedInfo, OneIlsToPcms, RecipientInfo } from '../models';
import { DeceasedInfoRepository } from '../repositories';

export class DeceasedInfoController {
  constructor(
    @repository(DeceasedInfoRepository)
    public deceasedInfoRepository: DeceasedInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(DeceasedInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeceasedInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    deceasedInfo: Omit<DeceasedInfo, 'id'>
  ): Promise<DeceasedInfo> {
    return this.deceasedInfoRepository.create(deceasedInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/deceased/count', {
    responses: {
      '200': {
        description: 'DeceasedInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(DeceasedInfo) where?: Where<DeceasedInfo>
  ): Promise<Count> {
    return this.deceasedInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/deceased', {
    responses: {
      '200': {
        description: 'Array of DeceasedInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(DeceasedInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(DeceasedInfo) filter?: Filter<DeceasedInfo>
  ): Promise<DeceasedInfo[]> {
    return this.deceasedInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeceasedInfo, { partial: true }),
        },
      },
    })
    deceasedInfo: DeceasedInfo,
    @param.where(DeceasedInfo) where?: Where<DeceasedInfo>
  ): Promise<Count> {
    return this.deceasedInfoRepository.updateAll(deceasedInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/deceased/{id}', {
    responses: {
      '200': {
        description: 'DeceasedInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(DeceasedInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(DeceasedInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<DeceasedInfo>
  ): Promise<DeceasedInfo> {
    return this.deceasedInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/deceased/{id}', {
    responses: {
      '204': {
        description: 'DeceasedInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(DeceasedInfo, { partial: true }),
        },
      },
    })
    deceasedInfo: Partial<DeceasedInfo>
  ): Promise<void> {
    await this.deceasedInfoRepository.updateById(id, deceasedInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/deceased/{id}', {
    responses: {
      '204': {
        description: 'DeceasedInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() deceasedInfo: DeceasedInfo
  ): Promise<void> {
    await this.deceasedInfoRepository.replaceById(id, deceasedInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/deceased/{id}', {
    responses: {
      '204': {
        description: 'DeceasedInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.deceasedInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/deceased/{id}/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'OneIlsToPcms belonging to DeceasedInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(OneIlsToPcms) },
          },
        },
      },
    },
  })
  async getOneIlsToPcms(
    @param.path.number('id') id: typeof DeceasedInfo.prototype.id
  ): Promise<OneIlsToPcms> {
    return this.deceasedInfoRepository.oneIlsToPcms(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/deceased/{id}/recipient-info', {
    responses: {
      '200': {
        description: 'RecipientInfo belonging to DeceasedInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(RecipientInfo) },
          },
        },
      },
    },
  })
  async getRecipientInfo(
    @param.path.number('id') id: typeof DeceasedInfo.prototype.id
  ): Promise<RecipientInfo> {
    return this.deceasedInfoRepository.recipientInfo(id);
  }
}
