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
  ScannerInfo,
  ScannerJob,
  UserInfo,
} from '../models';
import { ScannerJobRepository } from '../repositories';

export class ScannerJobController {
  constructor(
    @repository(ScannerJobRepository)
    public scannerJobRepository: ScannerJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/scanner-job', {
    responses: {
      '200': {
        description: 'ScannerJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ScannerJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    scannerJob: Omit<ScannerJob, 'id'>
  ): Promise<ScannerJob> {
    /*
    const foundItem = await this.scannerJobRepository.findOne({
      where: {
        scannerId: scannerJob.scannerId,
        cremationWorkflowId: scannerJob.cremationWorkflowId,
        collectionWorkflowId: scannerJob.collectionWorkflowId,
      },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.SCANNER_JOB.EXISTS);
    }
    // */
    return this.scannerJobRepository.create(scannerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job/count', {
    responses: {
      '200': {
        description: 'ScannerJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ScannerJob) where?: Where<ScannerJob>
  ): Promise<Count> {
    return this.scannerJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job', {
    responses: {
      '200': {
        description: 'Array of ScannerJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ScannerJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ScannerJob) filter?: Filter<ScannerJob>
  ): Promise<ScannerJob[]> {
    return this.scannerJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/scanner-job', {
    responses: {
      '200': {
        description: 'ScannerJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerJob, { partial: true }),
        },
      },
    })
    scannerJob: ScannerJob,
    @param.where(ScannerJob) where?: Where<ScannerJob>
  ): Promise<Count> {
    return this.scannerJobRepository.updateAll(scannerJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job/{id}', {
    responses: {
      '200': {
        description: 'ScannerJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ScannerJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ScannerJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<ScannerJob>
  ): Promise<ScannerJob> {
    return this.scannerJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/scanner-job/{id}', {
    responses: {
      '204': {
        description: 'ScannerJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerJob, { partial: true }),
        },
      },
    })
    scannerJob: Partial<ScannerJob>
  ): Promise<void> {
    await this.scannerJobRepository.updateById(id, scannerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/scanner-job/{id}', {
    responses: {
      '204': {
        description: 'ScannerJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() scannerJob: ScannerJob
  ): Promise<void> {
    await this.scannerJobRepository.replaceById(id, scannerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/scanner-job/{id}', {
    responses: {
      '204': {
        description: 'ScannerJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scannerJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to ScannerJob',
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
    @param.path.number('id') id: typeof ScannerJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.scannerJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job/{id}/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow belonging to ScannerJob',
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
    @param.path.number('id') id: typeof ScannerJob.prototype.id
  ): Promise<CremationWorkflow> {
    return this.scannerJobRepository.cremationWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-job/{id}/scanner-info', {
    responses: {
      '200': {
        description: 'ScannerInfo belonging to ScannerJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(ScannerInfo) },
          },
        },
      },
    },
  })
  async getScannerInfo(
    @param.path.number('id') id: typeof ScannerJob.prototype.id
  ): Promise<ScannerInfo> {
    return this.scannerJobRepository.scanner(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-jobs/{id}/user-info', {
    responses: {
      '200': {
        description: 'UserInfo belonging to ScannerJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserInfo) },
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof ScannerJob.prototype.id
  ): Promise<UserInfo> {
    return this.scannerJobRepository.user(id);
  }
}
