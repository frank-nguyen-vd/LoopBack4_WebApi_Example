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
import { RecipientInfo } from '../models';
import { RecipientInfoRepository } from '../repositories';

export class RecipientInfoController {
  constructor(
    @repository(RecipientInfoRepository)
    public recipientInfoRepository: RecipientInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/recipient-info', {
    responses: {
      '200': {
        description: 'RecipientInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(RecipientInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecipientInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    recipientInfo: Omit<RecipientInfo, 'id'>
  ): Promise<RecipientInfo> {
    /*
    const foundItem = await this.recipientInfoRepository.findOne({
      where: { idNumber: recipientInfo.idNumber },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.RECIPIENT.EXISTS);
    }
    // */
    return this.recipientInfoRepository.create(recipientInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/recipient-info/count', {
    responses: {
      '200': {
        description: 'RecipientInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(RecipientInfo) where?: Where<RecipientInfo>
  ): Promise<Count> {
    return this.recipientInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/recipient-info', {
    responses: {
      '200': {
        description: 'Array of RecipientInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RecipientInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(RecipientInfo) filter?: Filter<RecipientInfo>
  ): Promise<RecipientInfo[]> {
    return this.recipientInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/recipient-info', {
    responses: {
      '200': {
        description: 'RecipientInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecipientInfo, { partial: true }),
        },
      },
    })
    recipientInfo: RecipientInfo,
    @param.where(RecipientInfo) where?: Where<RecipientInfo>
  ): Promise<Count> {
    return this.recipientInfoRepository.updateAll(recipientInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/recipient-info/{id}', {
    responses: {
      '200': {
        description: 'RecipientInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RecipientInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RecipientInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<RecipientInfo>
  ): Promise<RecipientInfo> {
    return this.recipientInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/recipient-info/{id}', {
    responses: {
      '204': {
        description: 'RecipientInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RecipientInfo, { partial: true }),
        },
      },
    })
    recipientInfo: Partial<RecipientInfo>
  ): Promise<void> {
    await this.recipientInfoRepository.updateById(id, recipientInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/recipient-info/{id}', {
    responses: {
      '204': {
        description: 'RecipientInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() recipientInfo: RecipientInfo
  ): Promise<void> {
    await this.recipientInfoRepository.replaceById(id, recipientInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/recipient-info/{id}', {
    responses: {
      '204': {
        description: 'RecipientInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.recipientInfoRepository.deleteById(id);
  }
}
