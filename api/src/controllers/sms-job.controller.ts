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
import { CollectionWorkflow, RecipientInfo, SmsJob, UserInfo } from '../models';
import { SmsJobRepository } from '../repositories';

export class SmsJobController {
  constructor(
    @repository(SmsJobRepository)
    public smsJobRepository: SmsJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/sms-jobs')
  @response(200, {
    description: 'SmsJob model instance',
    content: { 'application/json': { schema: getModelSchemaRef(SmsJob) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SmsJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    smsJob: Omit<SmsJob, 'id'>
  ): Promise<SmsJob> {
    return this.smsJobRepository.create(smsJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs/count')
  @response(200, {
    description: 'SmsJob model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(SmsJob) where?: Where<SmsJob>): Promise<Count> {
    return this.smsJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs')
  @response(200, {
    description: 'Array of SmsJob model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SmsJob, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(SmsJob) filter?: Filter<SmsJob>): Promise<SmsJob[]> {
    return this.smsJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/sms-jobs')
  @response(200, {
    description: 'SmsJob PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SmsJob, { partial: true }),
        },
      },
    })
    smsJob: SmsJob,
    @param.where(SmsJob) where?: Where<SmsJob>
  ): Promise<Count> {
    return this.smsJobRepository.updateAll(smsJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs/{id}')
  @response(200, {
    description: 'SmsJob model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SmsJob, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SmsJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<SmsJob>
  ): Promise<SmsJob> {
    return this.smsJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/sms-jobs/{id}')
  @response(204, {
    description: 'SmsJob PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SmsJob, { partial: true }),
        },
      },
    })
    smsJob: SmsJob
  ): Promise<void> {
    await this.smsJobRepository.updateById(id, smsJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/sms-jobs/{id}')
  @response(204, {
    description: 'SmsJob PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() smsJob: SmsJob
  ): Promise<void> {
    await this.smsJobRepository.replaceById(id, smsJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/sms-jobs/{id}')
  @response(204, {
    description: 'SmsJob DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.smsJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs/{id}/user-info', {
    responses: {
      '200': {
        description: 'UserInfo belonging to SmsJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserInfo) },
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof SmsJob.prototype.id
  ): Promise<UserInfo> {
    return this.smsJobRepository.user(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs/{id}/recipient-info', {
    responses: {
      '200': {
        description: 'RecipientInfo belonging to SmsJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(RecipientInfo) },
          },
        },
      },
    },
  })
  async getRecipientInfo(
    @param.path.number('id') id: typeof SmsJob.prototype.id
  ): Promise<RecipientInfo> {
    return this.smsJobRepository.recipient(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/sms-jobs/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to SmsJob',
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
    @param.path.number('id') id: typeof SmsJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.smsJobRepository.collectionWorkflow(id);
  }
}
