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
import { ButtonInfo, ButtonJob, CollectionWorkflow } from '../models';
import { ButtonJobRepository } from '../repositories';

export class ButtonJobController {
  constructor(
    @repository(ButtonJobRepository)
    public buttonJobRepository: ButtonJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/button-job', {
    responses: {
      '200': {
        description: 'ButtonJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ButtonJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    buttonJob: Omit<ButtonJob, 'id'>
  ): Promise<ButtonJob> {
    return this.buttonJobRepository.create(buttonJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-job/count', {
    responses: {
      '200': {
        description: 'ButtonJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ButtonJob) where?: Where<ButtonJob>
  ): Promise<Count> {
    return this.buttonJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-job', {
    responses: {
      '200': {
        description: 'Array of ButtonJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ButtonJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ButtonJob) filter?: Filter<ButtonJob>
  ): Promise<ButtonJob[]> {
    return this.buttonJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-job/{id}', {
    responses: {
      '200': {
        description: 'ButtonJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ButtonJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ButtonJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<ButtonJob>
  ): Promise<ButtonJob> {
    return this.buttonJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/button-job/{id}', {
    responses: {
      '204': {
        description: 'ButtonJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonJob, { partial: true }),
        },
      },
    })
    buttonJob: Partial<ButtonJob>
  ): Promise<void> {
    await this.buttonJobRepository.updateById(id, buttonJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/button-job/{id}', {
    responses: {
      '204': {
        description: 'ButtonJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ButtonJob),
        },
      },
    })
    buttonJob: ButtonJob
  ): Promise<void> {
    await this.buttonJobRepository.replaceById(id, buttonJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/button-job/{id}', {
    responses: {
      '204': {
        description: 'ButtonJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.buttonJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to ButtonJob',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CollectionWorkflow),
            },
          },
        },
      },
    },
  })
  async getCollectionWorkflow(
    @param.path.number('id') id: typeof ButtonJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.buttonJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/button-job/{id}/button-info', {
    responses: {
      '200': {
        description: 'ButtonInfo belonging to ButtonJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ButtonInfo) },
          },
        },
      },
    },
  })
  async getButtonInfo(
    @param.path.number('id') id: typeof ButtonJob.prototype.id
  ): Promise<ButtonInfo> {
    return this.buttonJobRepository.button(id);
  }
}
