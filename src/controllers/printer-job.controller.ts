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
  PrinterInfo,
  PrinterJob,
  UserInfo,
} from '../models';
import { PrinterJobRepository } from '../repositories';

export class PrinterJobController {
  constructor(
    @repository(PrinterJobRepository)
    public printerJobRepository: PrinterJobRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/printer-job', {
    responses: {
      '200': {
        description: 'PrinterJob model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(PrinterJob) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterJob, {
            exclude: ['id'],
          }),
        },
      },
    })
    printerJob: Omit<PrinterJob, 'id'>
  ): Promise<PrinterJob> {
    /*
    const foundItem = await this.printerJobRepository.findOne({
      where: {
        userId: printerJob.userId,
        collectionWorkflowId: printerJob.collectionWorkflowId,
      },
    });

    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.PRINTER_JOB.EXISTS);
    }
    // */
    return this.printerJobRepository.create(printerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job/count', {
    responses: {
      '200': {
        description: 'PrinterJob model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(PrinterJob) where?: Where<PrinterJob>
  ): Promise<Count> {
    return this.printerJobRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job', {
    responses: {
      '200': {
        description: 'Array of PrinterJob model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PrinterJob, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PrinterJob) filter?: Filter<PrinterJob>
  ): Promise<PrinterJob[]> {
    return this.printerJobRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printer-job', {
    responses: {
      '200': {
        description: 'PrinterJob PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterJob, { partial: true }),
        },
      },
    })
    printerJob: PrinterJob,
    @param.where(PrinterJob) where?: Where<PrinterJob>
  ): Promise<Count> {
    return this.printerJobRepository.updateAll(printerJob, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job/{id}', {
    responses: {
      '200': {
        description: 'PrinterJob model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PrinterJob, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PrinterJob, { exclude: 'where' })
    filter?: FilterExcludingWhere<PrinterJob>
  ): Promise<PrinterJob> {
    return this.printerJobRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printer-job/{id}', {
    responses: {
      '204': {
        description: 'PrinterJob PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterJob, { partial: true }),
        },
      },
    })
    printerJob: Partial<PrinterJob>
  ): Promise<void> {
    await this.printerJobRepository.updateById(id, printerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/printer-job/{id}', {
    responses: {
      '204': {
        description: 'PrinterJob PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() printerJob: PrinterJob
  ): Promise<void> {
    await this.printerJobRepository.replaceById(id, printerJob);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/printer-job/{id}', {
    responses: {
      '204': {
        description: 'PrinterJob DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.printerJobRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job/{id}/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow belonging to PrinterJob',
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
    @param.path.number('id') id: typeof PrinterJob.prototype.id
  ): Promise<CollectionWorkflow> {
    return this.printerJobRepository.collectionWorkflow(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job/{id}/printer-info', {
    responses: {
      '200': {
        description: 'PrinterInfo belonging to PrinterJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PrinterInfo) },
          },
        },
      },
    },
  })
  async getPrinterInfo(
    @param.path.number('id') id: typeof PrinterJob.prototype.id
  ): Promise<PrinterInfo> {
    return this.printerJobRepository.printer(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-job/{id}/user', {
    responses: {
      '200': {
        description: 'UserInfo belonging to PrinterJob',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserInfo) },
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof PrinterJob.prototype.id
  ): Promise<UserInfo> {
    return this.printerJobRepository.user(id);
  }
}
