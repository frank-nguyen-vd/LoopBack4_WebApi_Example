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
import { OneIlsToPcms } from '../models';
import { OneIlsToPcmsRepository } from '../repositories';

export class OneIlsToPcmsController {
  constructor(
    @repository(OneIlsToPcmsRepository)
    public oneIlsToPcmsRepository: OneIlsToPcmsRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'OneIlsToPcms model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(OneIlsToPcms) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OneIlsToPcms, {
            exclude: ['id'],
          }),
        },
      },
    })
    oneIlsToPcms: Omit<OneIlsToPcms, 'id'>
  ): Promise<OneIlsToPcms> {
    const foundItem = await this.oneIlsToPcmsRepository.findOne({
      where: { cremationPermitNumber: oneIlsToPcms.cremationPermitNumber },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.OneILS.EXISTS);
    }
    return this.oneIlsToPcmsRepository.create(oneIlsToPcms);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/one-ils-to-pcms/count', {
    responses: {
      '200': {
        description: 'OneIlsToPcms model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(OneIlsToPcms) where?: Where<OneIlsToPcms>
  ): Promise<Count> {
    return this.oneIlsToPcmsRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'Array of OneIlsToPcms model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(OneIlsToPcms, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(OneIlsToPcms) filter?: Filter<OneIlsToPcms>
  ): Promise<OneIlsToPcms[]> {
    return this.oneIlsToPcmsRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'OneIlsToPcms PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OneIlsToPcms, { partial: true }),
        },
      },
    })
    oneIlsToPcms: OneIlsToPcms,
    @param.where(OneIlsToPcms) where?: Where<OneIlsToPcms>
  ): Promise<Count> {
    return this.oneIlsToPcmsRepository.updateAll(oneIlsToPcms, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/one-ils-to-pcms/{id}', {
    responses: {
      '200': {
        description: 'OneIlsToPcms model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(OneIlsToPcms, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(OneIlsToPcms, { exclude: 'where' })
    filter?: FilterExcludingWhere<OneIlsToPcms>
  ): Promise<OneIlsToPcms> {
    return this.oneIlsToPcmsRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/one-ils-to-pcms/{id}', {
    responses: {
      '204': {
        description: 'OneIlsToPcms PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OneIlsToPcms, { partial: true }),
        },
      },
    })
    oneIlsToPcms: Partial<OneIlsToPcms>
  ): Promise<void> {
    await this.oneIlsToPcmsRepository.updateById(id, oneIlsToPcms);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/one-ils-to-pcms/{id}', {
    responses: {
      '204': {
        description: 'OneIlsToPcms PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() oneIlsToPcms: OneIlsToPcms
  ): Promise<void> {
    await this.oneIlsToPcmsRepository.replaceById(id, oneIlsToPcms);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/one-ils-to-pcms/{id}', {
    responses: {
      '204': {
        description: 'OneIlsToPcms DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.oneIlsToPcmsRepository.deleteById(id);
  }
}
