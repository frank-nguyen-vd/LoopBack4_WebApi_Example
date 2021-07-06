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
import { PrinterInfo, PrinterJob, PrintingHistory, UserInfo } from '../models';
import { PrintingHistoryRepository } from '../repositories';

export class PrintingHistoryController {
  constructor(
    @repository(PrintingHistoryRepository)
    public printingHistoryRepository: PrintingHistoryRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/printing-history', {
    responses: {
      '200': {
        description: 'PrintingHistory model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(PrintingHistory) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingHistory, {
            exclude: ['id'],
          }),
        },
      },
    })
    printingHistory: Omit<PrintingHistory, 'id'>
  ): Promise<PrintingHistory> {
    return this.printingHistoryRepository.create(printingHistory);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-history/count', {
    responses: {
      '200': {
        description: 'PrintingHistory model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(PrintingHistory) where?: Where<PrintingHistory>
  ): Promise<Count> {
    return this.printingHistoryRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-history', {
    responses: {
      '200': {
        description: 'Array of PrintingHistory model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PrintingHistory, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PrintingHistory) filter?: Filter<PrintingHistory>
  ): Promise<PrintingHistory[]> {
    return this.printingHistoryRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printing-history', {
    responses: {
      '200': {
        description: 'PrintingHistory PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingHistory, { partial: true }),
        },
      },
    })
    printingHistory: PrintingHistory,
    @param.where(PrintingHistory) where?: Where<PrintingHistory>
  ): Promise<Count> {
    return this.printingHistoryRepository.updateAll(printingHistory, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-history/{id}', {
    responses: {
      '200': {
        description: 'PrintingHistory model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PrintingHistory, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PrintingHistory, { exclude: 'where' })
    filter?: FilterExcludingWhere<PrintingHistory>
  ): Promise<PrintingHistory> {
    return this.printingHistoryRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printing-history/{id}', {
    responses: {
      '204': {
        description: 'PrintingHistory PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrintingHistory, { partial: true }),
        },
      },
    })
    printingHistory: Partial<PrintingHistory>
  ): Promise<void> {
    await this.printingHistoryRepository.updateById(id, printingHistory);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/printing-history/{id}', {
    responses: {
      '204': {
        description: 'PrintingHistory PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() printingHistory: PrintingHistory
  ): Promise<void> {
    await this.printingHistoryRepository.replaceById(id, printingHistory);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/printing-history/{id}', {
    responses: {
      '204': {
        description: 'PrintingHistory DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.printingHistoryRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-history/{id}/printer-job', {
    responses: {
      '200': {
        description: 'PrinterJob belonging to PrintingHistory',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PrinterJob) },
          },
        },
      },
    },
  })
  async getPrinterJob(
    @param.path.number('id') id: typeof PrintingHistory.prototype.id
  ): Promise<PrinterJob> {
    return this.printingHistoryRepository.printerJob(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-history/{id}/printer-info', {
    responses: {
      '200': {
        description: 'PrinterInfo belonging to PrintingHistory',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(PrinterInfo) },
          },
        },
      },
    },
  })
  async getPrinterInfo(
    @param.path.number('id') id: typeof PrintingHistory.prototype.id
  ): Promise<PrinterInfo> {
    return this.printingHistoryRepository.printer(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printing-histories/{id}/user-info', {
    responses: {
      '200': {
        description: 'UserInfo belonging to PrintingHistory',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(UserInfo) },
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof PrintingHistory.prototype.id
  ): Promise<UserInfo> {
    return this.printingHistoryRepository.user(id);
  }
}
