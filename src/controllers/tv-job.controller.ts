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
import {
  CollectionWorkflow,
  CremationWorkflow,
  TvInfo,
  TvJob,
} from '../models';
import { TvJobRepository } from '../repositories';

export class TvJobController {
  constructor(
    @repository(TvJobRepository)
    public tvJobRepository: TvJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/tv-jobs')
  @response(200, {
    description: 'TvJob model instance',
    content: { 'application/json': { schema: getModelSchemaRef(TvJob) } },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    tvJob: Omit<TvJob, 'id'>
  ): Promise<TvJob> {
    return this.tvJobRepository.create(tvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs/count')
  @response(200, {
    description: 'TvJob model count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async count(@param.where(TvJob) where?: Where<TvJob>): Promise<Count> {
    return this.tvJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs')
  @response(200, {
    description: 'Array of TvJob model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(TvJob, { includeRelations: true }),
        },
      },
    },
  })
  async find(@param.filter(TvJob) filter?: Filter<TvJob>): Promise<TvJob[]> {
    return this.tvJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/tv-jobs')
  @response(200, {
    description: 'TvJob PATCH success count',
    content: { 'application/json': { schema: CountSchema } },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvJob, { partial: true }),
        },
      },
    })
    tvJob: TvJob,
    @param.where(TvJob) where?: Where<TvJob>
  ): Promise<Count> {
    return this.tvJobRepository.updateAll(tvJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs/{id}')
  @response(200, {
    description: 'TvJob model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(TvJob, { includeRelations: true }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(TvJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<TvJob>
  ): Promise<TvJob> {
    return this.tvJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/tv-jobs/{id}')
  @response(204, {
    description: 'TvJob PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TvJob, { partial: true }),
        },
      },
    })
    tvJob: TvJob
  ): Promise<void> {
    await this.tvJobRepository.updateById(id, tvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/tv-jobs/{id}')
  @response(204, {
    description: 'TvJob PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() tvJob: TvJob
  ): Promise<void> {
    await this.tvJobRepository.replaceById(id, tvJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/tv-jobs/{id}')
  @response(204, {
    description: 'TvJob DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.tvJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs/{id}/tv-info', {
    responses: {
      '200': {
        description: 'TvInfo belonging to TvJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(TvInfo) },
          },
        },
      },
    },
  })
  async getTvInfo(
    @param.path.number('id') id: typeof TvJob.prototype.id
  ): Promise<TvInfo> {
    return this.tvJobRepository.tv(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to TvJob',
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
    @param.path.number('id') id: typeof TvJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.tvJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/tv-jobs/{id}/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow belonging to TvJob',
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
    @param.path.number('id') id: typeof TvJob.prototype.id
  ): Promise<CremationWorkflow> {
    return this.tvJobRepository.cremationWorkflow(id);
  }
}
