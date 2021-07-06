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
  CollectionWorkflow,
  CremationWorkflow,
  EPaperInfo,
  EPaperJob,
} from '../models';
import { EPaperJobRepository } from '../repositories';

export class EPaperJobController {
  constructor(
    @repository(EPaperJobRepository)
    public ePaperJobRepository: EPaperJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/e-paper-jobs', {
    responses: {
      '200': {
        description: 'EPaperJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(EPaperJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    ePaperJob: Omit<EPaperJob, 'id'>
  ): Promise<EPaperJob> {
    /*
    const foundItem = await this.ePaperJobRepository.findOne({
      where: {
        ePaperId: ePaperJob.ePaperId,
        cremationWorkflowId: ePaperJob.cremationWorkflowId,
      },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.EPAPER_JOB.EXISTS);
    }
    // */
    return this.ePaperJobRepository.create(ePaperJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs/count', {
    responses: {
      '200': {
        description: 'EPaperJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(EPaperJob) where?: Where<EPaperJob>
  ): Promise<Count> {
    return this.ePaperJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs', {
    responses: {
      '200': {
        description: 'Array of EPaperJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EPaperJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EPaperJob) filter?: Filter<EPaperJob>
  ): Promise<EPaperJob[]> {
    return this.ePaperJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/e-paper-jobs', {
    responses: {
      '200': {
        description: 'EPaperJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperJob, { partial: true }),
        },
      },
    })
    ePaperJob: EPaperJob,
    @param.where(EPaperJob) where?: Where<EPaperJob>
  ): Promise<Count> {
    return this.ePaperJobRepository.updateAll(ePaperJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs/{id}', {
    responses: {
      '200': {
        description: 'EPaperJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EPaperJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EPaperJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<EPaperJob>
  ): Promise<EPaperJob> {
    return this.ePaperJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/e-paper-jobs/{id}', {
    responses: {
      '204': {
        description: 'EPaperJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperJob, { partial: true }),
        },
      },
    })
    ePaperJob: Partial<EPaperJob>
  ): Promise<void> {
    await this.ePaperJobRepository.updateById(id, ePaperJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/e-paper-jobs/{id}', {
    responses: {
      '204': {
        description: 'EPaperJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ePaperJob: EPaperJob
  ): Promise<void> {
    await this.ePaperJobRepository.replaceById(id, ePaperJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/e-paper-jobs/{id}', {
    responses: {
      '204': {
        description: 'EPaperJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ePaperJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs/{id}/e-paper-info', {
    responses: {
      '200': {
        description: 'EPaperInfo belonging to EPaperJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(EPaperInfo) },
          },
        },
      },
    },
  })
  async getEPaperInfo(
    @param.path.number('id') id: typeof EPaperJob.prototype.id
  ): Promise<EPaperInfo> {
    return this.ePaperJobRepository.ePaper(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs/{id}/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow belonging to EPaperJob',
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
    @param.path.number('id') id: typeof EPaperJob.prototype.id
  ): Promise<CremationWorkflow> {
    return this.ePaperJobRepository.cremationWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-jobs/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to EPaperJob',
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
    @param.path.number('id') id: typeof EPaperJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.ePaperJobRepository.collectionWorkflow(id);
  }
}
