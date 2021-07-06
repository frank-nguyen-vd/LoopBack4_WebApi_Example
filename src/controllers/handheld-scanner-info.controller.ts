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
import { HandheldScannerInfo } from '../models';
import { HandheldScannerInfoRepository } from '../repositories';

export class HandheldScannerInfoController {
  constructor(
    @repository(HandheldScannerInfoRepository)
    public handheldScannerInfoRepository: HandheldScannerInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/handheld-scanner', {
    responses: {
      '200': {
        description: 'HandheldScannerInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HandheldScannerInfo),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HandheldScannerInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    handheldScannerInfo: Omit<HandheldScannerInfo, 'id'>
  ): Promise<HandheldScannerInfo> {
    return this.handheldScannerInfoRepository.create(handheldScannerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/handheld-scanner/count', {
    responses: {
      '200': {
        description: 'HandheldScannerInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(HandheldScannerInfo) where?: Where<HandheldScannerInfo>
  ): Promise<Count> {
    return this.handheldScannerInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/handheld-scanner', {
    responses: {
      '200': {
        description: 'Array of HandheldScannerInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(HandheldScannerInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(HandheldScannerInfo) filter?: Filter<HandheldScannerInfo>
  ): Promise<HandheldScannerInfo[]> {
    return this.handheldScannerInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/handheld-scanner', {
    responses: {
      '200': {
        description: 'HandheldScannerInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HandheldScannerInfo, { partial: true }),
        },
      },
    })
    handheldScannerInfo: HandheldScannerInfo,
    @param.where(HandheldScannerInfo) where?: Where<HandheldScannerInfo>
  ): Promise<Count> {
    return this.handheldScannerInfoRepository.updateAll(
      handheldScannerInfo,
      where
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/handheld-scanner/{id}', {
    responses: {
      '200': {
        description: 'HandheldScannerInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HandheldScannerInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HandheldScannerInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<HandheldScannerInfo>
  ): Promise<HandheldScannerInfo> {
    return this.handheldScannerInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/handheld-scanner/{id}', {
    responses: {
      '204': {
        description: 'HandheldScannerInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HandheldScannerInfo, { partial: true }),
        },
      },
    })
    handheldScannerInfo: HandheldScannerInfo
  ): Promise<void> {
    await this.handheldScannerInfoRepository.updateById(
      id,
      handheldScannerInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/handheld-scanner/{id}', {
    responses: {
      '204': {
        description: 'HandheldScannerInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() handheldScannerInfo: HandheldScannerInfo
  ): Promise<void> {
    await this.handheldScannerInfoRepository.replaceById(
      id,
      handheldScannerInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/handheld-scanner/{id}', {
    responses: {
      '204': {
        description: 'HandheldScannerInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.handheldScannerInfoRepository.deleteById(id);
  }
}
