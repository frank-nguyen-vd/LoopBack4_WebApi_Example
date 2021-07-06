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
import { AgvStation } from '../models';
import { AgvStationRepository } from '../repositories';

export class AgvStationController {
  constructor(
    @repository(AgvStationRepository)
    public agvStationRepository: AgvStationRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/agv-station', {
    responses: {
      '200': {
        description: 'AgvStation model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(AgvStation) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvStation, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    agvStation: Omit<AgvStation, 'id'>
  ): Promise<AgvStation> {
    const foundItem = await this.agvStationRepository.findOne({
      where: {
        location: agvStation.location,
        stationNumber: agvStation.stationNumber,
      },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.AGV_STATION.EXISTS);
    }
    return this.agvStationRepository.create(agvStation);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-station/count', {
    responses: {
      '200': {
        description: 'AgvStation model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(AgvStation) where?: Where<AgvStation>
  ): Promise<Count> {
    return this.agvStationRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-station', {
    responses: {
      '200': {
        description: 'Array of AgvStation model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(AgvStation, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(AgvStation) filter?: Filter<AgvStation>
  ): Promise<AgvStation[]> {
    return this.agvStationRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/agv-station/{id}', {
    responses: {
      '200': {
        description: 'AgvStation model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AgvStation, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(AgvStation, { exclude: 'where' })
    filter?: FilterExcludingWhere<AgvStation>
  ): Promise<AgvStation> {
    return this.agvStationRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/agv-station/{id}', {
    responses: {
      '204': {
        description: 'AgvStation PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvStation, {
            //
            partial: true,
            exclude: ['id'],
          }),
        },
      },
    })
    agvStation: Partial<AgvStation>
  ): Promise<void> {
    await this.agvStationRepository.updateById(id, agvStation);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/agv-station/{id}', {
    responses: {
      '204': {
        description: 'AgvStation PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AgvStation, {
            //
            exclude: ['id'],
          }),
        },
      },
    })
    agvStation: Omit<AgvStation, 'id'>
  ): Promise<void> {
    await this.agvStationRepository.replaceById(id, agvStation);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/agv-station/{id}', {
    responses: {
      '204': {
        description: 'AgvStation DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.agvStationRepository.deleteById(id);
  }
}
