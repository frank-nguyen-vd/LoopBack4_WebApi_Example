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
  AgvStation,
  CremationWorkflowInfo,
  CrematorInfo,
  DeceasedInfo,
  HearthInfo,
  MultipleCasketInfo,
  OneIlsToPcms,
  ServiceHallInfo,
} from '../models';
import { CremationWorkflowInfoRepository } from '../repositories';

export class CremationWorkflowInfoController {
  constructor(
    @repository(CremationWorkflowInfoRepository)
    public cremationWorkflowInfoRepository: CremationWorkflowInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/cremation-workflow-info', {
    responses: {
      '200': {
        description: 'CremationWorkflowInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CremationWorkflowInfo),
          },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflowInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    cremationWorkflowInfo: Omit<CremationWorkflowInfo, 'id'>
  ): Promise<CremationWorkflowInfo> {
    return this.cremationWorkflowInfoRepository.create(cremationWorkflowInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/count', {
    responses: {
      '200': {
        description: 'CremationWorkflowInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CremationWorkflowInfo) where?: Where<CremationWorkflowInfo>
  ): Promise<Count> {
    return this.cremationWorkflowInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info', {
    responses: {
      '200': {
        description: 'Array of CremationWorkflowInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CremationWorkflowInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CremationWorkflowInfo) filter?: Filter<CremationWorkflowInfo>
  ): Promise<CremationWorkflowInfo[]> {
    return this.cremationWorkflowInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremation-workflow-info', {
    responses: {
      '200': {
        description: 'CremationWorkflowInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflowInfo, { partial: true }),
        },
      },
    })
    cremationWorkflowInfo: CremationWorkflowInfo,
    @param.where(CremationWorkflowInfo) where?: Where<CremationWorkflowInfo>
  ): Promise<Count> {
    return this.cremationWorkflowInfoRepository.updateAll(
      cremationWorkflowInfo,
      where
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}', {
    responses: {
      '200': {
        description: 'CremationWorkflowInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CremationWorkflowInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CremationWorkflowInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<CremationWorkflowInfo>
  ): Promise<CremationWorkflowInfo> {
    return this.cremationWorkflowInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremation-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflowInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflowInfo, { partial: true }),
        },
      },
    })
    cremationWorkflowInfo: Partial<CremationWorkflowInfo>
  ): Promise<void> {
    await this.cremationWorkflowInfoRepository.updateById(
      id,
      cremationWorkflowInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/cremation-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflowInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cremationWorkflowInfo: CremationWorkflowInfo
  ): Promise<void> {
    await this.cremationWorkflowInfoRepository.replaceById(
      id,
      cremationWorkflowInfo
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/cremation-workflow-info/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflowInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cremationWorkflowInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DeceasedInfo) },
          },
        },
      },
    },
  })
  async getDeceasedInfo(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<DeceasedInfo> {
    return this.cremationWorkflowInfoRepository.deceased(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthInfo(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.cremationWorkflowInfoRepository.hearth(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/one-ils-to-pcms', {
    responses: {
      '200': {
        description: 'OneIlsToPcms belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(OneIlsToPcms) },
          },
        },
      },
    },
  })
  async getOneIlsToPcms(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<OneIlsToPcms> {
    return this.cremationWorkflowInfoRepository.oneIlsToPcms(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/service-hall-info', {
    responses: {
      '200': {
        description: 'ServiceHallInfo belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ServiceHallInfo),
            },
          },
        },
      },
    },
  })
  async getServiceHallInfo(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<ServiceHallInfo> {
    return this.cremationWorkflowInfoRepository.serviceHall(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/agv-service-hall-station', {
    responses: {
      '200': {
        description: 'AgvStation belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AgvStation) },
          },
        },
      },
    },
  })
  async getAgvServiceHallStation(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<AgvStation> {
    return this.cremationWorkflowInfoRepository.agvServiceHall(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/agv-transfer-hall-station', {
    responses: {
      '200': {
        description: 'AgvStation belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AgvStation) },
          },
        },
      },
    },
  })
  async getAgvTransferHallStation(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<AgvStation> {
    return this.cremationWorkflowInfoRepository.agvTransferHall(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/agv-insertion-chamber-station', {
    responses: {
      '200': {
        description: 'AgvStation belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AgvStation) },
          },
        },
      },
    },
  })
  async getAgvInsertionChamberStation(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<AgvStation> {
    return this.cremationWorkflowInfoRepository.agvInsertionChamber(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/cremator-info', {
    responses: {
      '200': {
        description: 'CrematorInfo belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(CrematorInfo) },
          },
        },
      },
    },
  })
  async getCrematorInfo(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<CrematorInfo> {
    return this.cremationWorkflowInfoRepository.cremator(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow-info/{id}/multiple-casket-info', {
    responses: {
      '200': {
        description: 'MultipleCasketInfo belonging to CremationWorkflowInfo',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MultipleCasketInfo),
            },
          },
        },
      },
    },
  })
  async getMultipleCasketInfo(
    @param.path.number('id') id: typeof CremationWorkflowInfo.prototype.id
  ): Promise<MultipleCasketInfo> {
    return this.cremationWorkflowInfoRepository.multipleCasketInfo(id);
  }
}
