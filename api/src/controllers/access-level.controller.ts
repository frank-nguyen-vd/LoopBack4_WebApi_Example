import { authenticate } from '@loopback/authentication';
import { FilterExcludingWhere, repository } from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import { Enforcer, newEnforcer } from 'casbin';
import { SequelizeAdapter } from 'casbin-sequelize-adapter';
import { MESSAGE } from '../keys';
import { log, LOG_LEVEL } from '../logger';
import { AccessLevel, AccessLevelRelation, RbacPolicy } from '../models';
import { RbacAction, RbacObject } from '../rbac/keys';
import { AccessLevelRepository } from '../repositories';

require('dotenv').config();

export class AccessLevelController {
  constructor(
    @repository(AccessLevelRepository)
    public accessLevelRepository: AccessLevelRepository
  ) {}

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/access-level', {
    responses: {
      '200': {
        description: 'AccessLevel model instance',
        content: {
          'application/json': { schema: getModelSchemaRef(AccessLevel) },
        },
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(AccessLevel, {}),
        },
      },
    })
    request: AccessLevel
  ): Promise<AccessLevel> {
    const foundItem = await this.accessLevelRepository.findOne({
      where: { or: [{ name: request.name }, { alias: request.alias }] },
    });

    if (foundItem) {
      throw new HttpErrors.BadRequest(MESSAGE.RBAC.ACCESS_LEVEL_EXISTS);
    }

    await this.createPolicy(
      new RbacPolicy({
        subject: request.alias,
        object: RbacObject.None,
        action: RbacAction.None,
      })
    );
    const createdAccessLevel = await this.accessLevelRepository.create(request);
    return createdAccessLevel;
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level', {
    responses: {
      '200': {
        description:
          'List all access-level in the format of ["level-name-1", "level-name-2", ...]',
      },
    },
  })
  async listAllAccessLevel(): Promise<AccessLevel[]> {
    return this.accessLevelRepository.find();
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level/{alias}', {
    responses: {
      '200': {
        description: 'AccessLevel model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AccessLevel, { includeRelations: true }),
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('alias') alias: string,
    @param.filter(AccessLevel, { exclude: 'where' })
    filter?: FilterExcludingWhere<AccessLevel>
  ): Promise<AccessLevel> {
    return this.accessLevelRepository.findById(alias, filter);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/access-level/{alias}', {
    responses: {
      '204': {
        description: 'AccessLevel DELETE success',
      },
    },
  })
  async deleteById(@param.path.string('alias') alias: string): Promise<void> {
    await this.accessLevelRepository.deleteById(alias);
    const enforcer = await this.getEnforcer();
    await enforcer.deleteUser(alias);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level/{alias}/unique-policies', {
    responses: {
      '200': {
        description:
          'List of permissions that only belongs to a access-level, in the format [ ["subject1", "object1", "action1"], ["subject2", "object2", "action2"], ... ]',
      },
    },
  })
  async listUniquePoliciesBelongsToAccessLevel(
    @param.path.string('alias') alias: string
  ): Promise<string[][]> {
    const enforcer = await this.getEnforcer();
    return enforcer.getPermissionsForUser(alias);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level/{alias}/lower-level', {
    responses: {
      '200': {
        description:
          'List of the immediate lower access level in the format [ "access-level alias" ]',
      },
    },
  })
  async getLowerAccessLevel(
    @param.path.string('alias') alias: string
  ): Promise<string[]> {
    const enforcer = await this.getEnforcer();
    return enforcer.getRolesForUser(alias);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/access-level/promote', {
    responses: {
      '200': {
        description:
          'Return an instance of access-level assignment policy if successful',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AccessLevelRelation),
          },
        },
      },
    },
  })
  async promoteAccessLevel(
    @requestBody({
      description: 'Place an access-level on top of another',
      content: {
        'application/json': { schema: getModelSchemaRef(AccessLevelRelation) },
      },
    })
    request: AccessLevelRelation
  ): Promise<AccessLevelRelation> {
    const { upperLevel, lowerLevel } = request;
    const enforcer = await this.getEnforcer();
    const found = await enforcer.hasRoleForUser(upperLevel, lowerLevel);

    if (found) {
      throw new HttpErrors.BadRequest(MESSAGE.RBAC.POLICY_EXISTS);
    }

    if (await enforcer.addRoleForUser(upperLevel, lowerLevel)) {
      return new AccessLevelRelation({ upperLevel, lowerLevel });
    }

    throw new HttpErrors.BadRequest(MESSAGE.RBAC.FAILS_TO_ADD_POLICY);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @post('/api/access-level/policy', {
    responses: {
      '200': {
        description: 'Return an instance of policy if successful',
        content: {
          'application/json': { schema: getModelSchemaRef(RbacPolicy) },
        },
      },
    },
  })
  async createPolicy(
    @requestBody({
      description:
        'Assign a policy to a access-level. The subject is access-level alias. The object is resource name.',
      content: {
        'application/json': { schema: getModelSchemaRef(RbacPolicy) },
      },
    })
    request: RbacPolicy
  ): Promise<RbacPolicy> {
    const { subject, object, action } = request;
    const newPolicy = [subject, object, action];
    const enforcer = await this.getEnforcer();
    const foundPolicy = await enforcer.hasPolicy(...newPolicy);

    if (foundPolicy) {
      throw new HttpErrors.BadRequest(MESSAGE.RBAC.POLICY_EXISTS);
    }

    if (enforcer.addPolicy(...newPolicy)) {
      return request;
    }

    throw new HttpErrors.BadRequest(MESSAGE.RBAC.FAILS_TO_ADD_POLICY);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level/policy', {
    responses: {
      '200': {
        description:
          'List of all policies in the database, in the format [ ["subject1", "object1", "action1"], ["subject2", "object2", "action2"], ... ]',
      },
    },
  })
  async listAllPolicies(): Promise<string[][]> {
    const enforcer = await this.getEnforcer();
    return enforcer.getPolicy();
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @get('/api/access-level/{alias}/all-policies', {
    responses: {
      '200': {
        description:
          'List of permissions that a access-level has, in the format [ ["subject1", "object1", "action1"], ["subject2", "object2", "action2"], ... ]',
      },
    },
  })
  async listAllPoliciesByAccessLevel(
    @param.path.string('alias') alias: string
  ): Promise<string[][]> {
    const foundAccessLevel = await this.accessLevelRepository.findOne({
      where: { alias },
    });
    if (!foundAccessLevel) {
      throw new HttpErrors.BadRequest(MESSAGE.RBAC.ACCESS_LEVEL_NOT_EXISTS);
    }
    const enforcer = await this.getEnforcer();
    return enforcer.getImplicitPermissionsForUser(alias);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/access-level/{alias}/lower-level', {
    responses: {
      '204': {
        description: 'Access-level DELETE success',
      },
    },
  })
  async deleteLowerAccessLevel(
    @requestBody({
      description: 'Remove the immediate lower access-level',
      content: {
        'application/json': { schema: getModelSchemaRef(AccessLevelRelation) },
      },
    })
    request: AccessLevelRelation
  ): Promise<void> {
    const enforcer = await this.getEnforcer();
    const { upperLevel, lowerLevel } = request;

    if (await enforcer.deleteRoleForUser(upperLevel, lowerLevel)) return;

    throw new HttpErrors.BadRequest(MESSAGE.RBAC.FAILS_TO_REMOVE_LOWER_LEVEL);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/access-level/policy', {
    responses: {
      '204': {
        description: 'Rbac Policy DELETE success',
      },
    },
  })
  async removePolicy(
    @requestBody({
      description: 'Delete a policy',
      content: {
        'application/json': { schema: getModelSchemaRef(RbacPolicy) },
      },
    })
    request: RbacPolicy
  ): Promise<void> {
    const { subject, object, action } = request;
    const enforcer = await this.getEnforcer();
    const foundPolicy = await enforcer.hasPolicy(subject, object, action);

    if (!foundPolicy) {
      throw new HttpErrors.BadRequest(MESSAGE.RBAC.POLICY_NOT_EXISTS);
    }

    if (await enforcer.removePolicy(subject, object, action)) return;

    throw new HttpErrors.BadRequest(MESSAGE.RBAC.FAILS_TO_REMOVE_POLICY);
  }

  @log(LOG_LEVEL.DEBUG)
  @authenticate('jwt')
  @del('/api/access-level/{alias}', {
    responses: {
      '204': {
        description: 'Access-level DELETE success',
      },
    },
  })
  async deleteAccessLevel(
    @param.path.string('alias') alias: string
  ): Promise<void> {
    const enforcer = await this.getEnforcer();
    await this.accessLevelRepository.deleteById(alias);
    if (await enforcer.deleteUser(alias)) return;
    throw new HttpErrors.BadRequest(MESSAGE.RBAC.FAILS_TO_REMOVE_ACCESS_LEVEL);
  }

  async getEnforcer(): Promise<Enforcer> {
    const adapter = await SequelizeAdapter.newAdapter({
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT ?? '1433'),
      dialect: 'mssql',
    });

    return newEnforcer('rbac_policies/rbac_model.conf', adapter);
  }
}
