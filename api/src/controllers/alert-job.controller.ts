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
import { AlertJob } from '../models';
import { AlertJobRepository } from '../repositories';

export class AlertJobController {
  constructor(
    @repository(AlertJobRepository)
    public alertJobRepository: AlertJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/alert-jobs')
  @response(200, {
    description: 'AlertJob model instance',
    content: { 'application/json': { schema: getModelSchemaRef(AlertJob) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlertJob, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    alertJob: Omit<AlertJob, 'id'>
  ): Promise<AlertJob> {
    return this.alertJobRepository.create(alertJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/alert-jobs/count')
  @response(200, {
    description: 'AlertJob model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(AlertJob) where?: Where<AlertJob>): Promise<Count> {
    return this.alertJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/alert-jobs')
  @response(200, {
    description: 'Array of AlertJob model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AlertJob, { includeRelations: true }),
        },
      },
    },
  })
  async find(
    @param.filter(AlertJob) filter?: Filter<AlertJob>
  ): Promise<AlertJob[]> {
    return this.alertJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/alert-jobs')
  @response(200, {
    description: 'AlertJob PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlertJob, { partial: true }),
        },
      },
    })
    alertJob: AlertJob,
    @param.where(AlertJob) where?: Where<AlertJob>
  ): Promise<Count> {
    return this.alertJobRepository.updateAll(alertJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/alert-jobs/{id}')
  @response(200, {
    description: 'AlertJob model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AlertJob, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AlertJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<AlertJob>
  ): Promise<AlertJob> {
    return this.alertJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/alert-jobs/{id}')
  @response(204, {
    description: 'AlertJob PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AlertJob, { partial: true }),
        },
      },
    })
    alertJob: AlertJob
  ): Promise<void> {
    await this.alertJobRepository.updateById(id, alertJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/alert-jobs/{id}')
  @response(204, {
    description: 'AlertJob PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() alertJob: AlertJob
  ): Promise<void> {
    await this.alertJobRepository.replaceById(id, alertJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/alert-jobs/{id}')
  @response(204, {
    description: 'AlertJob DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.alertJobRepository.deleteById(id);
  }
}
