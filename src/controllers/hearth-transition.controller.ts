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
import { AgvJob, HearthInfo, HearthTransition } from '../models';
import { HearthTransitionRepository } from '../repositories';

export class HearthTransitionController {
  constructor(
    @repository(HearthTransitionRepository)
    public hearthTransitionRepository: HearthTransitionRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/hearth-transition', {
    responses: {
      '200': {
        description: 'HearthTransition model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(HearthTransition) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthTransition, {
            exclude: ['id'],
          }),
        },
      },
    })
    hearthTransition: Omit<HearthTransition, 'id'>
  ): Promise<HearthTransition> {
    return this.hearthTransitionRepository.create(hearthTransition);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-transition/count', {
    responses: {
      '200': {
        description: 'HearthTransition model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(HearthTransition) where?: Where<HearthTransition>
  ): Promise<Count> {
    return this.hearthTransitionRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-transition', {
    responses: {
      '200': {
        description: 'Array of HearthTransition model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(HearthTransition, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(HearthTransition) filter?: Filter<HearthTransition>
  ): Promise<HearthTransition[]> {
    return this.hearthTransitionRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/hearth-transition', {
    responses: {
      '200': {
        description: 'HearthTransition PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthTransition, { partial: true }),
        },
      },
    })
    hearthTransition: HearthTransition,
    @param.where(HearthTransition) where?: Where<HearthTransition>
  ): Promise<Count> {
    return this.hearthTransitionRepository.updateAll(hearthTransition, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-transition/{id}', {
    responses: {
      '200': {
        description: 'HearthTransition model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(HearthTransition, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(HearthTransition, { exclude: 'where' })
    filter?: FilterExcludingWhere<HearthTransition>
  ): Promise<HearthTransition> {
    return this.hearthTransitionRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/hearth-transition/{id}', {
    responses: {
      '204': {
        description: 'HearthTransition PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(HearthTransition, { partial: true }),
        },
      },
    })
    hearthTransition: HearthTransition
  ): Promise<void> {
    await this.hearthTransitionRepository.updateById(id, hearthTransition);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/hearth-transition/{id}', {
    responses: {
      '204': {
        description: 'HearthTransition PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() hearthTransition: HearthTransition
  ): Promise<void> {
    await this.hearthTransitionRepository.replaceById(id, hearthTransition);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/hearth-transition/{id}', {
    responses: {
      '204': {
        description: 'HearthTransition DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.hearthTransitionRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-transition/{id}/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to HearthTransition',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthInfo(
    @param.path.number('id') id: typeof HearthTransition.prototype.id
  ): Promise<HearthInfo> {
    return this.hearthTransitionRepository.hearth(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/hearth-transition/{id}/agv-job', {
    responses: {
      '200': {
        description: 'AgvJob belonging to HearthTransition',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(AgvJob) },
          },
        },
      },
    },
  })
  async getAgvJob(
    @param.path.number('id') id: typeof HearthTransition.prototype.id
  ): Promise<AgvJob> {
    return this.hearthTransitionRepository.agvJob(id);
  }
}
