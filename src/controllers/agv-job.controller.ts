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
import {
  AgvInfo,
  AgvJob,
  CollectionWorkflow,
  CremationWorkflow,
} from '../models';
import { AgvJobRepository } from '../repositories';

export class AgvJobController {
  constructor(
    @repository(AgvJobRepository)
    public agvJobRepository: AgvJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/agv-job', {
    responses: {
      '200': {
        description: 'AgvJob model instance',
        content: { 'application/json': { schema: getModelSchemaRef(AgvJob) } },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJob, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    agvJob: Omit<AgvJob, 'id'>
  ): Promise<AgvJob> {
    return this.agvJobRepository.create(agvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-job/count', {
    responses: {
      '200': {
        description: 'AgvJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(AgvJob) where?: Where<AgvJob>): Promise<Count> {
    return this.agvJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-job', {
    responses: {
      '200': {
        description: 'Array of AgvJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AgvJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(@param.filter(AgvJob) filter?: Filter<AgvJob>): Promise<AgvJob[]> {
    return this.agvJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-job/{id}', {
    responses: {
      '200': {
        description: 'AgvJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AgvJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AgvJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<AgvJob>
  ): Promise<AgvJob> {
    return this.agvJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/agv-job/{id}', {
    responses: {
      '204': {
        description: 'AgvJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJob, {
            //
            partial: true,
            exclude: ['id'],
          }),
        },
      },
    })
    agvJob: Partial<AgvJob>
  ): Promise<void> {
    await this.agvJobRepository.updateById(id, agvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/agv-job/{id}', {
    responses: {
      '204': {
        description: 'AgvJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJob, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    agvJob: Omit<AgvJob, 'id'>
  ): Promise<void> {
    await this.agvJobRepository.replaceById(id, agvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/agv-job/{id}', {
    responses: {
      '204': {
        description: 'AgvJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agvJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to AgvJob',
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
    @param.path.number('id') id: typeof AgvJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.agvJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-job/{id}/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow belonging to AgvJob',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CremationWorkflow),
            },
          },
        },
      },
    },
  })
  async getCremationWorkflow(
    @param.path.number('id') id: typeof AgvJob.prototype.id
  ): Promise<CremationWorkflow> {
    return this.agvJobRepository.cremationWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-jobs/{id}/agv-info', {
    responses: {
      '200': {
        description: 'AgvInfo belonging to AgvJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AgvInfo) },
          },
        },
      },
    },
  })
  async getAgvInfo(
    @param.path.number('id') id: typeof AgvJob.prototype.id
  ): Promise<AgvInfo> {
    return this.agvJobRepository.agv(id);
  }
}
