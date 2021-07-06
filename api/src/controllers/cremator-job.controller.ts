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
import { CremationWorkflow, CrematorInfo, CrematorJob } from '../models';
import { CrematorJobRepository } from '../repositories';

export class CrematorJobController {
  constructor(
    @repository(CrematorJobRepository)
    public crematorJobRepository: CrematorJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/cremator-job', {
    responses: {
      '200': {
        description: 'CrematorJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(CrematorJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    crematorJob: Omit<CrematorJob, 'id'>
  ): Promise<CrematorJob> {
    return this.crematorJobRepository.create(crematorJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-job/count', {
    responses: {
      '200': {
        description: 'CrematorJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CrematorJob) where?: Where<CrematorJob>
  ): Promise<Count> {
    return this.crematorJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-job', {
    responses: {
      '200': {
        description: 'Array of CrematorJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CrematorJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CrematorJob) filter?: Filter<CrematorJob>
  ): Promise<CrematorJob[]> {
    return this.crematorJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremator-job', {
    responses: {
      '200': {
        description: 'CrematorJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorJob, { partial: true }),
        },
      },
    })
    crematorJob: CrematorJob,
    @param.where(CrematorJob) where?: Where<CrematorJob>
  ): Promise<Count> {
    return this.crematorJobRepository.updateAll(crematorJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-job/{id}', {
    responses: {
      '200': {
        description: 'CrematorJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CrematorJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CrematorJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<CrematorJob>
  ): Promise<CrematorJob> {
    return this.crematorJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremator-job/{id}', {
    responses: {
      '204': {
        description: 'CrematorJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CrematorJob, { partial: true }),
        },
      },
    })
    crematorJob: Partial<CrematorJob>
  ): Promise<void> {
    await this.crematorJobRepository.updateById(id, crematorJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/cremator-job/{id}', {
    responses: {
      '204': {
        description: 'CrematorJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() crematorJob: CrematorJob
  ): Promise<void> {
    await this.crematorJobRepository.replaceById(id, crematorJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/cremator-job/{id}', {
    responses: {
      '204': {
        description: 'CrematorJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.crematorJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-job/{id}/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow belonging to CrematorJob',
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
    @param.path.number('id') id: typeof CrematorJob.prototype.id
  ): Promise<CremationWorkflow | undefined> {
    return this.crematorJobRepository.cremationWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremator-job/{id}/cremator-info', {
    responses: {
      '200': {
        description: 'CrematorInfo belonging to CrematorJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(CrematorInfo) },
          },
        },
      },
    },
  })
  async getCrematorInfo(
    @param.path.number('id') id: typeof CrematorJob.prototype.id
  ): Promise<CrematorInfo> {
    return this.crematorJobRepository.crematorInfo(id);
  }
}
