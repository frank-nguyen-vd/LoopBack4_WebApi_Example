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
import { CollectionWorkflow, CollectionWorkflowInfo } from '../models';
import { CollectionWorkflowRepository } from '../repositories';

export class CollectionWorkflowController {
  constructor(
    @repository(CollectionWorkflowRepository)
    public collectionWorkflowRepository: CollectionWorkflowRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(CollectionWorkflow) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflow, {
            exclude: ['id'],
          }),
        },
      },
    })
    collectionWorkflow: Omit<CollectionWorkflow, 'id'>
  ): Promise<CollectionWorkflow> {
    return this.collectionWorkflowRepository.create(collectionWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow/count', {
    responses: {
      '200': {
        description: 'CollectionWorkflow model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CollectionWorkflow) where?: Where<CollectionWorkflow>
  ): Promise<Count> {
    return this.collectionWorkflowRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow', {
    responses: {
      '200': {
        description: 'Array of CollectionWorkflow model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CollectionWorkflow, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CollectionWorkflow) filter?: Filter<CollectionWorkflow>
  ): Promise<CollectionWorkflow[]> {
    return this.collectionWorkflowRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/collection-workflow', {
    responses: {
      '200': {
        description: 'CollectionWorkflow PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflow, { partial: true }),
        },
      },
    })
    collectionWorkflow: CollectionWorkflow,
    @param.where(CollectionWorkflow) where?: Where<CollectionWorkflow>
  ): Promise<Count> {
    return this.collectionWorkflowRepository.updateAll(
      collectionWorkflow,
      where
    );
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow/{id}', {
    responses: {
      '200': {
        description: 'CollectionWorkflow model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CollectionWorkflow, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CollectionWorkflow, { exclude: 'where' })
    filter?: FilterExcludingWhere<CollectionWorkflow>
  ): Promise<CollectionWorkflow> {
    return this.collectionWorkflowRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/collection-workflow/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflow PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CollectionWorkflow, { partial: true }),
        },
      },
    })
    collectionWorkflow: Partial<CollectionWorkflow>
  ): Promise<void> {
    await this.collectionWorkflowRepository.updateById(id, collectionWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/collection-workflow/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflow PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() collectionWorkflow: CollectionWorkflow
  ): Promise<void> {
    await this.collectionWorkflowRepository.replaceById(id, collectionWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/collection-workflow/{id}', {
    responses: {
      '204': {
        description: 'CollectionWorkflow DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.collectionWorkflowRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/collection-workflow/{id}/collection-workflow-info', {
    responses: {
      '200': {
        description: 'CollectionWorkflowInfo belonging to CollectionWorkflow',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CollectionWorkflowInfo),
            },
          },
        },
      },
    },
  })
  async getCollectionWorkflowInfo(
    @param.path.number('id') id: typeof CollectionWorkflow.prototype.id
  ): Promise<CollectionWorkflowInfo> {
    return this.collectionWorkflowRepository.workflowInfo(id);
  }
}
