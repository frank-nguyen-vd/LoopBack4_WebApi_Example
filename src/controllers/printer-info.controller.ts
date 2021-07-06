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
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import { MESSAGE } from '../keys';
import { log, LOG_LEVEL } from '../logger';
import { PrinterInfo } from '../models';
import { PrinterInfoRepository } from '../repositories';

export class PrinterInfoController {
  constructor(
    @repository(PrinterInfoRepository)
    public printerInfoRepository: PrinterInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/printer-info', {
    responses: {
      '200': {
        description: 'PrinterInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(PrinterInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    printerInfo: Omit<PrinterInfo, 'id'>
  ): Promise<PrinterInfo> {
    const foundItem = await this.printerInfoRepository.findOne({
      where: { location: printerInfo.location },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.PRINTER.EXISTS);
    }
    return this.printerInfoRepository.create(printerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-info/count', {
    responses: {
      '200': {
        description: 'PrinterInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(PrinterInfo) where?: Where<PrinterInfo>
  ): Promise<Count> {
    return this.printerInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-info', {
    responses: {
      '200': {
        description: 'Array of PrinterInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(PrinterInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(PrinterInfo) filter?: Filter<PrinterInfo>
  ): Promise<PrinterInfo[]> {
    return this.printerInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printer-info', {
    responses: {
      '200': {
        description: 'PrinterInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterInfo, { partial: true }),
        },
      },
    })
    printerInfo: PrinterInfo,
    @param.where(PrinterInfo) where?: Where<PrinterInfo>
  ): Promise<Count> {
    return this.printerInfoRepository.updateAll(printerInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/printer-info/{id}', {
    responses: {
      '200': {
        description: 'PrinterInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(PrinterInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(PrinterInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<PrinterInfo>
  ): Promise<PrinterInfo> {
    return this.printerInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/printer-info/{id}', {
    responses: {
      '204': {
        description: 'PrinterInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PrinterInfo, { partial: true }),
        },
      },
    })
    printerInfo: Partial<PrinterInfo>
  ): Promise<void> {
    await this.printerInfoRepository.updateById(id, printerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/printer-info/{id}', {
    responses: {
      '204': {
        description: 'PrinterInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() printerInfo: PrinterInfo
  ): Promise<void> {
    await this.printerInfoRepository.replaceById(id, printerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/printer-info/{id}', {
    responses: {
      '204': {
        description: 'PrinterInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.printerInfoRepository.deleteById(id);
  }
}
