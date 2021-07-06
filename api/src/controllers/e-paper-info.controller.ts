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
import { EPaperInfo } from '../models';
import { EPaperInfoRepository } from '../repositories';

export class EPaperInfoController {
  constructor(
    @repository(EPaperInfoRepository)
    public ePaperInfoRepository: EPaperInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/e-paper-info', {
    responses: {
      '200': {
        description: 'EPaperInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(EPaperInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    ePaperInfo: Omit<EPaperInfo, 'id'>
  ): Promise<EPaperInfo> {
    const foundEPaper = await this.ePaperInfoRepository.findOne({
      where: { location: ePaperInfo.location },
    });
    if (foundEPaper) {
      throw new HttpErrors.BadRequest(MESSAGE.EPAPER.EXISTS);
    }
    return this.ePaperInfoRepository.create(ePaperInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-info/count', {
    responses: {
      '200': {
        description: 'EPaperInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(EPaperInfo) where?: Where<EPaperInfo>
  ): Promise<Count> {
    return this.ePaperInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-info', {
    responses: {
      '200': {
        description: 'Array of EPaperInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(EPaperInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(EPaperInfo) filter?: Filter<EPaperInfo>
  ): Promise<EPaperInfo[]> {
    return this.ePaperInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/e-paper-info', {
    responses: {
      '200': {
        description: 'EPaperInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperInfo, { partial: true }),
        },
      },
    })
    ePaperInfo: EPaperInfo,
    @param.where(EPaperInfo) where?: Where<EPaperInfo>
  ): Promise<Count> {
    return this.ePaperInfoRepository.updateAll(ePaperInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/e-paper-info/{id}', {
    responses: {
      '200': {
        description: 'EPaperInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EPaperInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EPaperInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<EPaperInfo>
  ): Promise<EPaperInfo> {
    return this.ePaperInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/e-paper-info/{id}', {
    responses: {
      '204': {
        description: 'EPaperInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EPaperInfo, { partial: true }),
        },
      },
    })
    ePaperInfo: Partial<EPaperInfo>
  ): Promise<void> {
    await this.ePaperInfoRepository.updateById(id, ePaperInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/e-paper-info/{id}', {
    responses: {
      '204': {
        description: 'EPaperInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ePaperInfo: EPaperInfo
  ): Promise<void> {
    await this.ePaperInfoRepository.replaceById(id, ePaperInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/e-paper-info/{id}', {
    responses: {
      '204': {
        description: 'EPaperInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ePaperInfoRepository.deleteById(id);
  }
}
