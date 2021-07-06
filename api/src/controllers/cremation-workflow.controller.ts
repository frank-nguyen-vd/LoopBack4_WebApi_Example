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
import { CremationWorkflow, CremationWorkflowInfo } from '../models';
import { CremationWorkflowRepository } from '../repositories';

export class CremationWorkflowController {
  constructor(
    @repository(CremationWorkflowRepository)
    public cremationWorkflowRepository: CremationWorkflowRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(CremationWorkflow) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflow, {
            exclude: ['id'],
          }),
        },
      },
    })
    cremationWorkflow: Omit<Partial<CremationWorkflow>, 'id'>
  ): Promise<CremationWorkflow> {
    const foundItem = await this.cremationWorkflowRepository.findOne({
      where: { workflowInfoId: cremationWorkflow.workflowInfoId },
    });
    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.CREMATION_WORKFLOW.EXISTS);
    }
    return this.cremationWorkflowRepository.create(cremationWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow/count', {
    responses: {
      '200': {
        description: 'CremationWorkflow model count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async count(
    @param.where(CremationWorkflow) where?: Where<CremationWorkflow>
  ): Promise<Count> {
    return this.cremationWorkflowRepository.count(where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow', {
    responses: {
      '200': {
        description: 'Array of CremationWorkflow model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CremationWorkflow, {
                includeRelations: true,
              }),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(CremationWorkflow) filter?: Filter<CremationWorkflow>
  ): Promise<CremationWorkflow[]> {
    return this.cremationWorkflowRepository.find(filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremation-workflow', {
    responses: {
      '200': {
        description: 'CremationWorkflow PATCH success count',
        content: { 'application/json': { schema: CountSchema } },
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflow, { partial: true }),
        },
      },
    })
    cremationWorkflow: CremationWorkflow,
    @param.where(CremationWorkflow) where?: Where<CremationWorkflow>
  ): Promise<Count> {
    return this.cremationWorkflowRepository.updateAll(cremationWorkflow, where);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow/{id}', {
    responses: {
      '200': {
        description: 'CremationWorkflow model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(CremationWorkflow, {
              includeRelations: true,
            }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(CremationWorkflow, { exclude: 'where' })
    filter?: FilterExcludingWhere<CremationWorkflow>
  ): Promise<CremationWorkflow> {
    return this.cremationWorkflowRepository.findById(id, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @patch('/api/cremation-workflow/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflow PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CremationWorkflow, { partial: true }),
        },
      },
    })
    cremationWorkflow: Partial<CremationWorkflow>
  ): Promise<void> {
    await this.cremationWorkflowRepository.updateById(id, cremationWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @put('/api/cremation-workflow/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflow PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cremationWorkflow: CremationWorkflow
  ): Promise<void> {
    await this.cremationWorkflowRepository.replaceById(id, cremationWorkflow);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/cremation-workflow/{id}', {
    responses: {
      '204': {
        description: 'CremationWorkflow DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cremationWorkflowRepository.deleteById(id);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/cremation-workflow/{id}/cremation-workflow-info', {
    responses: {
      '200': {
        description: 'CremationWorkflowInfo belonging to CremationWorkflow',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(CremationWorkflowInfo),
            },
          },
        },
      },
    },
  })
  async getCremationWorkflowInfo(
    @param.path.number('id') id: typeof CremationWorkflow.prototype.id
  ): Promise<CremationWorkflowInfo> {
    return this.cremationWorkflowRepository.workflowInfo(id);
  }
}
