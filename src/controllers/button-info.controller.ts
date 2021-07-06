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
import { ButtonInfo } from '../models';
import { ButtonInfoRepository } from '../repositories';

export class ButtonInfoController {
  constructor(
    @repository(ButtonInfoRepository)
    public buttonInfoRepository: ButtonInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/button-info', {
    responses: {
      '200': {
        description: 'ButtonInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ButtonInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonInfo, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    buttonInfo: Omit<ButtonInfo, 'id'>
  ): Promise<ButtonInfo> {
    return this.buttonInfoRepository.create(buttonInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-info/count', {
    responses: {
      '200': {
        description: 'ButtonInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ButtonInfo) where?: Where<ButtonInfo>
  ): Promise<Count> {
    return this.buttonInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-info', {
    responses: {
      '200': {
        description: 'Array of ButtonInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ButtonInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ButtonInfo) filter?: Filter<ButtonInfo>
  ): Promise<ButtonInfo[]> {
    return this.buttonInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-info/{id}', {
    responses: {
      '200': {
        description: 'ButtonInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ButtonInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ButtonInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<ButtonInfo>
  ): Promise<ButtonInfo> {
    return this.buttonInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/button-info/{id}', {
    responses: {
      '204': {
        description: 'ButtonInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonInfo, { partial: true }),
        },
      },
    })
    buttonInfo: Partial<ButtonInfo>
  ): Promise<void> {
    await this.buttonInfoRepository.updateById(id, buttonInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/button-info/{id}', {
    responses: {
      '204': {
        description: 'ButtonInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonInfo, { partial: true }),
        },
      },
    })
    buttonInfo: ButtonInfo
  ): Promise<void> {
    await this.buttonInfoRepository.replaceById(id, buttonInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/button-info/{id}', {
    responses: {
      '204': {
        description: 'ButtonInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.buttonInfoRepository.deleteById(id);
  }
}
