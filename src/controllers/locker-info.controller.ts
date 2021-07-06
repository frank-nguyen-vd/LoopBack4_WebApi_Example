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
import { DeceasedInfo, LockerInfo } from '../models';
import { LockerInfoRepository } from '../repositories';

export class LockerInfoController {
  constructor(
    @repository(LockerInfoRepository)
    public lockerInfoRepository: LockerInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/locker-info', {
    responses: {
      '200': {
        description: 'LockerInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(LockerInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    lockerInfo: Omit<LockerInfo, 'id'>
  ): Promise<LockerInfo> {
    const foundItem = await this.lockerInfoRepository.findOne({
      where: { lockerNumber: lockerInfo.lockerNumber },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.LOCKER.EXISTS);
    }
    return this.lockerInfoRepository.create(lockerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-info/count', {
    responses: {
      '200': {
        description: 'LockerInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(LockerInfo) where?: Where<LockerInfo>
  ): Promise<Count> {
    return this.lockerInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-info', {
    responses: {
      '200': {
        description: 'Array of LockerInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(LockerInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(LockerInfo) filter?: Filter<LockerInfo>
  ): Promise<LockerInfo[]> {
    return this.lockerInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/locker-info', {
    responses: {
      '200': {
        description: 'LockerInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerInfo, { partial: true }),
        },
      },
    })
    lockerInfo: LockerInfo,
    @param.where(LockerInfo) where?: Where<LockerInfo>
  ): Promise<Count> {
    return this.lockerInfoRepository.updateAll(lockerInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-info/{id}', {
    responses: {
      '200': {
        description: 'LockerInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(LockerInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(LockerInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<LockerInfo>
  ): Promise<LockerInfo> {
    return this.lockerInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/locker-info/{id}', {
    responses: {
      '204': {
        description: 'LockerInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(LockerInfo, { partial: true }),
        },
      },
    })
    lockerInfo: Partial<LockerInfo>
  ): Promise<void> {
    await this.lockerInfoRepository.updateById(id, lockerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/locker-info/{id}', {
    responses: {
      '204': {
        description: 'LockerInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() lockerInfo: LockerInfo
  ): Promise<void> {
    await this.lockerInfoRepository.replaceById(id, lockerInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/locker-info/{id}', {
    responses: {
      '204': {
        description: 'LockerInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.lockerInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/locker-info/{id}/deceased', {
    responses: {
      '200': {
        description: 'DeceasedInfo belonging to LockerInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(DeceasedInfo) },
          },
        },
      },
    },
  })
  async getDeceasedInfo(
    @param.path.number('id') id: typeof LockerInfo.prototype.id
  ): Promise<DeceasedInfo> {
    return this.lockerInfoRepository.deceased(id);
  }
}
