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
import { HearthInfo, RoomInfo } from '../models';
import { RoomInfoRepository } from '../repositories';

export class RoomInfoController {
  constructor(
    @repository(RoomInfoRepository)
    public roomInfoRepository: RoomInfoRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/room-info', {
    responses: {
      '200': {
        description: 'RoomInfo model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(RoomInfo) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomInfo, {
            exclude: ['id'],
          }),
        },
      },
    })
    roomInfo: Omit<RoomInfo, 'id'>
  ): Promise<RoomInfo> {
    const foundItem = await this.roomInfoRepository.findOne({
      where: { roomNumber: roomInfo.roomNumber },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.ROOM.EXISTS);
    }
    return this.roomInfoRepository.create(roomInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-info/count', {
    responses: {
      '200': {
        description: 'RoomInfo model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(@param.where(RoomInfo) where?: Where<RoomInfo>): Promise<Count> {
    return this.roomInfoRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-info', {
    responses: {
      '200': {
        description: 'Array of RoomInfo model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(RoomInfo, { includeRelations: true }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(RoomInfo) filter?: Filter<RoomInfo>
  ): Promise<RoomInfo[]> {
    return this.roomInfoRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-info/{id}', {
    responses: {
      '200': {
        description: 'RoomInfo model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(RoomInfo, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(RoomInfo, { exclude: 'where' })
    filter?: FilterExcludingWhere<RoomInfo>
  ): Promise<RoomInfo> {
    return this.roomInfoRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/room-info/{id}', {
    responses: {
      '204': {
        description: 'RoomInfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomInfo, {
            partial: true,
            exclude: ['id'],
          }),
        },
      },
    })
    roomInfo: Partial<RoomInfo>
  ): Promise<void> {
    await this.roomInfoRepository.updateById(id, roomInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/room-info/{id}', {
    responses: {
      '204': {
        description: 'RoomInfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(RoomInfo, { exclude: ['id'] }),
        },
      },
    })
    roomInfo: Omit<RoomInfo, 'id'>
  ): Promise<void> {
    await this.roomInfoRepository.replaceById(id, roomInfo);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/room-info/{id}', {
    responses: {
      '204': {
        description: 'RoomInfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.roomInfoRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/room-info/{id}/hearth', {
    responses: {
      '200': {
        description: 'HearthInfo belonging to RoomInfo',
        content: {
          'application/json': {
            schema: { type: 'array', items: getModelSchemaRef(HearthInfo) },
          },
        },
      },
    },
  })
  async getHearthInfo(
    @param.path.number('id') id: typeof RoomInfo.prototype.id
  ): Promise<HearthInfo> {
    return this.roomInfoRepository.hearth(id);
  }
}
