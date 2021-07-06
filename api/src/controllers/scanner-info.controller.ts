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
import { ScannerInfo } from '../models';
import { ScannerInfoRepository } from '../repositories';

export class ScannerInfoController {
  constructor(
    @repository(ScannerInfoRepository)
    public scannerInfoRepository: ScannerInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/scanner-info', {
    responses: {
      '200': {
        description: 'ScannerInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ScannerInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    scannerInfo: Omit<ScannerInfo, 'id'>
  ): Promise<ScannerInfo> {
    const foundItem = await this.scannerInfoRepository.findOne({
      where: { location: scannerInfo.location },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.SCANNER.EXISTS);
    }
    return this.scannerInfoRepository.create(scannerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-info/count', {
    responses: {
      '200': {
        description: 'ScannerInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ScannerInfo) where?: Where<ScannerInfo>
  ): Promise<Count> {
    return this.scannerInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-info', {
    responses: {
      '200': {
        description: 'Array of ScannerInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ScannerInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ScannerInfo) filter?: Filter<ScannerInfo>
  ): Promise<ScannerInfo[]> {
    return this.scannerInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/scanner-info', {
    responses: {
      '200': {
        description: 'ScannerInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerInfo, { partial: true }),
        },
      },
    })
    scannerInfo: ScannerInfo,
    @param.where(ScannerInfo) where?: Where<ScannerInfo>
  ): Promise<Count> {
    return this.scannerInfoRepository.updateAll(scannerInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/scanner-info/{id}', {
    responses: {
      '200': {
        description: 'ScannerInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ScannerInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ScannerInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<ScannerInfo>
  ): Promise<ScannerInfo> {
    return this.scannerInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/scanner-info/{id}', {
    responses: {
      '204': {
        description: 'ScannerInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ScannerInfo, { partial: true }),
        },
      },
    })
    scannerInfo: Partial<ScannerInfo>
  ): Promise<void> {
    await this.scannerInfoRepository.updateById(id, scannerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/scanner-info/{id}', {
    responses: {
      '204': {
        description: 'ScannerInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() scannerInfo: ScannerInfo
  ): Promise<void> {
    await this.scannerInfoRepository.replaceById(id, scannerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/scanner-info/{id}', {
    responses: {
      '204': {
        description: 'ScannerInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.scannerInfoRepository.deleteById(id);
  }
}
