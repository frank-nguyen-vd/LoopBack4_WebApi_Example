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
import { AgvJobResponse } from '../models';
import { AgvJobResponseRepository } from '../repositories';

export class AgvJobResponseController {
  constructor(
    @repository(AgvJobResponseRepository)
    public agvJobResponseRepository : AgvJobResponseRepository,
  ) {}

  @post('/api/agv-job-response')
  @response(200, {
    description: 'AgvJobResponse model instance',
    content: {'application/json': {schema: getModelSchemaRef(AgvJobResponse)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJobResponse, {
            title: 'NewAgvJobResponse',
            exclude: ['id'],
          }),
        },
      },
    })
    agvJobResponse: Omit<AgvJobResponse, 'id'>,
  ): Promise<AgvJobResponse> {
    return this.agvJobResponseRepository.create(agvJobResponse);
  }

  @get('/api/agv-job-response/count')
  @response(200, {
    description: 'AgvJobResponse model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(AgvJobResponse) where?: Where<AgvJobResponse>,
  ): Promise<Count> {
    return this.agvJobResponseRepository.count(where);
  }

  @get('/api/agv-job-response')
  @response(200, {
    description: 'Array of AgvJobResponse model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(AgvJobResponse, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(AgvJobResponse) filter?: Filter<AgvJobResponse>,
  ): Promise<AgvJobResponse[]> {
    return this.agvJobResponseRepository.find(filter);
  }

  @patch('/api/agv-job-response')
  @response(200, {
    description: 'AgvJobResponse PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJobResponse, {partial: true}),
        },
      },
    })
    agvJobResponse: AgvJobResponse,
    @param.where(AgvJobResponse) where?: Where<AgvJobResponse>,
  ): Promise<Count> {
    return this.agvJobResponseRepository.updateAll(agvJobResponse, where);
  }

  @get('/api/agv-job-response/{id}')
  @response(200, {
    description: 'AgvJobResponse model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(AgvJobResponse, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AgvJobResponse, {exclude: 'where'}) filter?: FilterExcludingWhere<AgvJobResponse>
  ): Promise<AgvJobResponse> {
    return this.agvJobResponseRepository.findById(id, filter);
  }

  @patch('/api/agv-job-response/{id}')
  @response(204, {
    description: 'AgvJobResponse PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvJobResponse, {partial: true}),
        },
      },
    })
    agvJobResponse: AgvJobResponse,
  ): Promise<void> {
    await this.agvJobResponseRepository.updateById(id, agvJobResponse);
  }

  @put('/api/agv-job-response/{id}')
  @response(204, {
    description: 'AgvJobResponse PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() agvJobResponse: AgvJobResponse,
  ): Promise<void> {
    await this.agvJobResponseRepository.replaceById(id, agvJobResponse);
  }

  @del('/api/agv-job-response/{id}')
  @response(204, {
    description: 'AgvJobResponse DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agvJobResponseRepository.deleteById(id);
  }
}
