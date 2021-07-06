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
import { CollectionWorkflow, LockerInfo, LockerJob, UserInfo } from '../models';
import { LockerJobRepository } from '../repositories';

export class LockerJobController {
  constructor(
    @repository(LockerJobRepository)
    public lockerJobRepository: LockerJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/locker-job', {
    responses: {
      '200': {
        description: 'LockerJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(LockerJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    lockerJob: Omit<LockerJob, 'id'>
  ): Promise<LockerJob> {
    return this.lockerJobRepository.create(lockerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-job/count', {
    responses: {
      '200': {
        description: 'LockerJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(LockerJob) where?: Where<LockerJob>
  ): Promise<Count> {
    return this.lockerJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-job', {
    responses: {
      '200': {
        description: 'Array of LockerJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LockerJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(LockerJob) filter?: Filter<LockerJob>
  ): Promise<LockerJob[]> {
    return this.lockerJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/locker-job', {
    responses: {
      '200': {
        description: 'LockerJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerJob, { partial: true }),
        },
      },
    })
    lockerJob: LockerJob,
    @param.where(LockerJob) where?: Where<LockerJob>
  ): Promise<Count> {
    return this.lockerJobRepository.updateAll(lockerJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-job/{id}', {
    responses: {
      '200': {
        description: 'LockerJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LockerJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LockerJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<LockerJob>
  ): Promise<LockerJob> {
    return this.lockerJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/locker-job/{id}', {
    responses: {
      '204': {
        description: 'LockerJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerJob, { partial: true }),
        },
      },
    })
    lockerJob: Partial<LockerJob>
  ): Promise<void> {
    await this.lockerJobRepository.updateById(id, lockerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/locker-job/{id}', {
    responses: {
      '204': {
        description: 'LockerJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lockerJob: LockerJob
  ): Promise<void> {
    await this.lockerJobRepository.replaceById(id, lockerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/locker-job/{id}', {
    responses: {
      '204': {
        description: 'LockerJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lockerJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-job/{id}/locker-info', {
    responses: {
      '200': {
        description: 'LockerInfo belonging to LockerJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(LockerInfo) },
          },
        },
      },
    },
  })
  async getLockerInfo(
    @param.path.number('id') id: typeof LockerJob.prototype.id
  ): Promise<LockerInfo> {
    return this.lockerJobRepository.locker(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to LockerJob',
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
    @param.path.number('id') id: typeof LockerJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.lockerJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-jobs/{id}/user-info', {
    responses: {
      '200': {
        description: 'UserInfo belonging to LockerJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserInfo) },
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof LockerJob.prototype.id
  ): Promise<UserInfo> {
    return this.lockerJobRepository.user(id);
  }
}
