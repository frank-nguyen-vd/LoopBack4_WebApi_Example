import { authenticate } from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import { log, LOG_LEVEL } from '../logger';
import { ReportInfo, UserInfo } from '../models';
import { ReportInfoRepository } from '../repositories';

export class ReportInfoController {
  constructor(
    @repository(ReportInfoRepository)
    public reportInfoRepository : ReportInfoRepository,
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/report-infos')
  @response(200, {
    description: 'ReportInfo model instance',
    content: {'application/json': {schema: getModelSchemaRef(ReportInfo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReportInfo, {
            title: 'NewReportInfo',
            exclude: ['id'],
          }),
        },
      },
    })
    reportInfo: Omit<ReportInfo, 'id'>,
  ): Promise<ReportInfo> {
    return this.reportInfoRepository.create(reportInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/report-infos/count')
  @response(200, {
    description: 'ReportInfo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ReportInfo) where?: Where<ReportInfo>,
  ): Promise<Count> {
    return this.reportInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/report-infos')
  @response(200, {
    description: 'Array of ReportInfo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ReportInfo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ReportInfo) filter?: Filter<ReportInfo>,
  ): Promise<ReportInfo[]> {
    return this.reportInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/report-infos')
  @response(200, {
    description: 'ReportInfo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReportInfo, {partial: true}),
        },
      },
    })
    reportInfo: ReportInfo,
    @param.where(ReportInfo) where?: Where<ReportInfo>,
  ): Promise<Count> {
    return this.reportInfoRepository.updateAll(reportInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/report-infos/{id}')
  @response(200, {
    description: 'ReportInfo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ReportInfo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ReportInfo, {exclude: 'where'}) filter?: FilterExcludingWhere<ReportInfo>
  ): Promise<ReportInfo> {
    return this.reportInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/report-infos/{id}')
  @response(204, {
    description: 'ReportInfo PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ReportInfo, {partial: true}),
        },
      },
    })
    reportInfo: ReportInfo,
  ): Promise<void> {
    await this.reportInfoRepository.updateById(id, reportInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/report-infos/{id}')
  @response(204, {
    description: 'ReportInfo PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() reportInfo: ReportInfo,
  ): Promise<void> {
    await this.reportInfoRepository.replaceById(id, reportInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/report-infos/{id}')
  @response(204, {
    description: 'ReportInfo DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.reportInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/report-infos/{id}/user-info', {
    responses: {
      '200': {
        description: 'UserInfo belonging to ReportInfo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(UserInfo)},
          },
        },
      },
    },
  })
  async getUserInfo(
    @param.path.number('id') id: typeof ReportInfo.prototype.id,
  ): Promise<UserInfo> {
    return this.reportInfoRepository.user(id);
  }
}
