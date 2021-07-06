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
import { MobileConsole } from '../models';
import { MobileConsoleRepository } from '../repositories';

export class MobileConsoleController {
  constructor(
    @repository(MobileConsoleRepository)
    public mobileConsoleRepository: MobileConsoleRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/mobile-console', {
    responses: {
      '200': {
        description: 'MobileConsole model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(MobileConsole) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileConsole, {
            exclude: ['id'],
          }),
        },
      },
    })
    mobileConsole: Omit<MobileConsole, 'id'>
  ): Promise<MobileConsole> {
    return this.mobileConsoleRepository.create(mobileConsole);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/mobile-console/count', {
    responses: {
      '200': {
        description: 'MobileConsole model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(MobileConsole) where?: Where<MobileConsole>
  ): Promise<Count> {
    return this.mobileConsoleRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/mobile-console', {
    responses: {
      '200': {
        description: 'Array of MobileConsole model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MobileConsole, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MobileConsole) filter?: Filter<MobileConsole>
  ): Promise<MobileConsole[]> {
    return this.mobileConsoleRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/mobile-console', {
    responses: {
      '200': {
        description: 'MobileConsole PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileConsole, { partial: true }),
        },
      },
    })
    mobileConsole: MobileConsole,
    @param.where(MobileConsole) where?: Where<MobileConsole>
  ): Promise<Count> {
    return this.mobileConsoleRepository.updateAll(mobileConsole, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/mobile-console/{id}', {
    responses: {
      '200': {
        description: 'MobileConsole model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MobileConsole, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MobileConsole, { exclude: 'where' })
    filter?: FilterExcludingWhere<MobileConsole>
  ): Promise<MobileConsole> {
    return this.mobileConsoleRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/mobile-console/{id}', {
    responses: {
      '204': {
        description: 'MobileConsole PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MobileConsole, { partial: true }),
        },
      },
    })
    mobileConsole: MobileConsole
  ): Promise<void> {
    await this.mobileConsoleRepository.updateById(id, mobileConsole);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/mobile-console/{id}', {
    responses: {
      '204': {
        description: 'MobileConsole PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() mobileConsole: MobileConsole
  ): Promise<void> {
    await this.mobileConsoleRepository.replaceById(id, mobileConsole);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/mobile-console/{id}', {
    responses: {
      '204': {
        description: 'MobileConsole DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.mobileConsoleRepository.deleteById(id);
  }
}
