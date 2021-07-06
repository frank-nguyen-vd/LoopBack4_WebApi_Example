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
import { HearthInfo, ParkingBayInfo } from '../models';
import { ParkingBayInfoRepository } from '../repositories';

export class ParkingBayInfoController {
  constructor(
    @repository(ParkingBayInfoRepository)
    public parkingBayInfoRepository: ParkingBayInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/parking-bay-info', {
    responses: {
      '200': {
        description: 'ParkingBayInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(ParkingBayInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingBayInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    parkingBayInfo: Omit<ParkingBayInfo, 'id'>
  ): Promise<ParkingBayInfo> {
    const foundItem = await this.parkingBayInfoRepository.findOne({
      where: {
        level: parkingBayInfo.level,
        unitNumber: parkingBayInfo.unitNumber,
      },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.PARKING_BAY.EXISTS);
    }
    return this.parkingBayInfoRepository.create(parkingBayInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/parking-bay-info/count', {
    responses: {
      '200': {
        description: 'ParkingBayInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(ParkingBayInfo) where?: Where<ParkingBayInfo>
  ): Promise<Count> {
    return this.parkingBayInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/parking-bay-info', {
    responses: {
      '200': {
        description: 'Array of ParkingBayInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(ParkingBayInfo, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(ParkingBayInfo) filter?: Filter<ParkingBayInfo>
  ): Promise<ParkingBayInfo[]> {
    return this.parkingBayInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/parking-bay-info', {
    responses: {
      '200': {
        description: 'ParkingBayInfo PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingBayInfo, { partial: true }),
        },
      },
    })
    parkingBayInfo: ParkingBayInfo,
    @param.where(ParkingBayInfo) where?: Where<ParkingBayInfo>
  ): Promise<Count> {
    return this.parkingBayInfoRepository.updateAll(parkingBayInfo, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/parking-bay-info/{id}', {
    responses: {
      '200': {
        description: 'ParkingBayInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(ParkingBayInfo, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(ParkingBayInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<ParkingBayInfo>
  ): Promise<ParkingBayInfo> {
    return this.parkingBayInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/parking-bay-info/{id}', {
    responses: {
      '204': {
        description: 'ParkingBayInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ParkingBayInfo, { partial: true }),
        },
      },
    })
    parkingBayInfo: Partial<ParkingBayInfo>
  ): Promise<void> {
    await this.parkingBayInfoRepository.updateById(id, parkingBayInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/parking-bay-info/{id}', {
    responses: {
      '204': {
        description: 'ParkingBayInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() parkingBayInfo: ParkingBayInfo
  ): Promise<void> {
    await this.parkingBayInfoRepository.replaceById(id, parkingBayInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/parking-bay-info/{id}', {
    responses: {
      '204': {
        description: 'ParkingBayInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.parkingBayInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/parking-bay-info/{id}/hearth-info', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to ParkingBayInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthInfo(
    @param.path.number('id') id: typeof ParkingBayInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.parkingBayInfoRepository.hearth(id);
  }
}
