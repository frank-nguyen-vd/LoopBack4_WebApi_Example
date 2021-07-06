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
import { CollectionWorkflow, LockerInfo, RoomInfo, RoomJob } from '../models';
import { RoomJobRepository } from '../repositories';

export class RoomJobController {
  constructor(
    @repository(RoomJobRepository)
    public roomJobRepository: RoomJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/room-job', {
    responses: {
      '200': {
        description: 'RoomJob model instance',
        content: { 'application/json': { schema: getModelSchemaRef(RoomJob) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    roomJob: Omit<RoomJob, 'id'>
  ): Promise<RoomJob> {
    return this.roomJobRepository.create(roomJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-job/count', {
    responses: {
      '200': {
        description: 'RoomJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(RoomJob) where?: Where<RoomJob>): Promise<Count> {
    return this.roomJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-job', {
    responses: {
      '200': {
        description: 'Array of RoomJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RoomJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(RoomJob) filter?: Filter<RoomJob>
  ): Promise<RoomJob[]> {
    return this.roomJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/room-job', {
    responses: {
      '200': {
        description: 'RoomJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomJob, { partial: true }),
        },
      },
    })
    roomJob: RoomJob,
    @param.where(RoomJob) where?: Where<RoomJob>
  ): Promise<Count> {
    return this.roomJobRepository.updateAll(roomJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-job/{id}', {
    responses: {
      '200': {
        description: 'RoomJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RoomJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RoomJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<RoomJob>
  ): Promise<RoomJob> {
    return this.roomJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/room-job/{id}', {
    responses: {
      '204': {
        description: 'RoomJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomJob, { partial: true }),
        },
      },
    })
    roomJob: Partial<RoomJob>
  ): Promise<void> {
    await this.roomJobRepository.updateById(id, roomJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/room-job/{id}', {
    responses: {
      '204': {
        description: 'RoomJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() roomJob: RoomJob
  ): Promise<void> {
    await this.roomJobRepository.replaceById(id, roomJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/room-job/{id}', {
    responses: {
      '204': {
        description: 'RoomJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roomJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-job/{id}/room-info', {
    responses: {
      '200': {
        description: 'RoomInfo belonging to RoomJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(RoomInfo) },
          },
        },
      },
    },
  })
  async getRoomInfo(
    @param.path.number('id') id: typeof RoomJob.prototype.id
  ): Promise<RoomInfo> {
    return this.roomJobRepository.room(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to RoomJob',
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
    @param.path.number('id') id: typeof RoomJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.roomJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-jobs/{id}/locker-info', {
    responses: {
      '200': {
        description: 'LockerInfo belonging to RoomJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(LockerInfo) },
          },
        },
      },
    },
  })
  async getLockerInfo(
    @param.path.number('id') id: typeof RoomJob.prototype.id
  ): Promise<LockerInfo> {
    return this.roomJobRepository.lockerInfo(id);
  }
}
