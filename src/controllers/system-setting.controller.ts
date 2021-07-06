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
import { SystemSetting } from '../models';
import { SystemSettingRepository } from '../repositories';

export class SystemSettingController {
  constructor(
    @repository(SystemSettingRepository)
    public systemSettingRepository: SystemSettingRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/system-setting', {
    responses: {
      '200': {
        description: 'SystemSetting model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(SystemSetting) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SystemSetting, {
            exclude: ['id'],
          }),
        },
      },
    })
    systemSetting: Omit<SystemSetting, 'id'>
  ): Promise<SystemSetting> {
    return this.systemSettingRepository.create(systemSetting);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/system-setting/count', {
    responses: {
      '200': {
        description: 'SystemSetting model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(SystemSetting) where?: Where<SystemSetting>
  ): Promise<Count> {
    return this.systemSettingRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/system-setting', {
    responses: {
      '200': {
        description: 'Array of SystemSetting model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(SystemSetting, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(SystemSetting) filter?: Filter<SystemSetting>
  ): Promise<SystemSetting[]> {
    return this.systemSettingRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/system-setting', {
    responses: {
      '200': {
        description: 'SystemSetting PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SystemSetting, { partial: true }),
        },
      },
    })
    systemSetting: SystemSetting,
    @param.where(SystemSetting) where?: Where<SystemSetting>
  ): Promise<Count> {
    return this.systemSettingRepository.updateAll(systemSetting, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/system-setting/{id}', {
    responses: {
      '200': {
        description: 'SystemSetting model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(SystemSetting, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(SystemSetting, { exclude: 'where' })
    filter?: FilterExcludingWhere<SystemSetting>
  ): Promise<SystemSetting> {
    return this.systemSettingRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/system-setting/{id}', {
    responses: {
      '204': {
        description: 'SystemSetting PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SystemSetting, { partial: true }),
        },
      },
    })
    systemSetting: Partial<SystemSetting>
  ): Promise<void> {
    await this.systemSettingRepository.updateById(id, systemSetting);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/system-setting/{id}', {
    responses: {
      '204': {
        description: 'SystemSetting PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() systemSetting: SystemSetting
  ): Promise<void> {
    await this.systemSettingRepository.replaceById(id, systemSetting);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/system-setting/{id}', {
    responses: {
      '204': {
        description: 'SystemSetting DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.systemSettingRepository.deleteById(id);
  }
}
