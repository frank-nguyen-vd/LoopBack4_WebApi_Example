import { Getter } from '@loopback/core';
import { createStubInstance, expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { ButtonJobController } from '../../controllers';
import { ButtonJob } from '../../models';
import {
  ButtonInfoRepository,
  ButtonJobRepository,
  CollectionWorkflowInfoRepository,
  CollectionWorkflowRepository,
} from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Button Job Controller', () => {
  let buttonJobController: ButtonJobController;
  let buttonJobRepository: ButtonJobRepository;
  let buttonRepository: ButtonInfoRepository;
  let collectionWorkflowRepository: CollectionWorkflowRepository;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    buttonRepository = new ButtonInfoRepository(datasource);
    collectionWorkflowRepository = new CollectionWorkflowRepository(
      datasource,
      Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
    );
    buttonJobRepository = new ButtonJobRepository(
      datasource,
      Getter.fromValue(buttonRepository),
      Getter.fromValue(collectionWorkflowRepository)
    );
    buttonJobController = new ButtonJobController(buttonJobRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new ButtonJob(Helpers.newButtonJob());
      const createdObject = await buttonJobController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonJob(Helpers.newButtonJob());
      const createdObject = await buttonJobController.create(newObject);
      const foundObject = await buttonJobController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(buttonJobController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonJob(Helpers.newButtonJob());
      const modifiedObject = await buttonJobController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        buttonJobController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await buttonJobController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        buttonJobController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonJob(Helpers.newButtonJob());
      const createdObject = await buttonJobController.create(newObject);
      await expect(
        buttonJobController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        buttonJobController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(buttonJobController.deleteById(-1)).to.be.rejected();
    });
  });

  describe('retrieve its button info', () => {
    it('should be successful if item exists', async () => {
      const createdButtonInfo = await buttonRepository.create(
        Helpers.newButtonInfo()
      );
      const createdButtonJob = await buttonJobRepository.create(
        Helpers.newButtonJob()
      );
      const foundButtonInfo = await buttonJobController.buttonJobRepository.button(
        createdButtonJob.id
      );
      expect(foundButtonInfo).to.deepEqual(createdButtonInfo);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        buttonJobController.buttonJobRepository.button(-1)
      ).to.be.rejected();
    });
  });

  describe('retrieve its collection workflow', () => {
    it('should be successful if item exists', async () => {
      const createdCollectionWorkflow = await collectionWorkflowRepository.create(
        Helpers.newCollectionWorkflow()
      );
      const createdButtonJob = await buttonJobRepository.create(
        Helpers.newButtonJob()
      );
      const foundCollectionWorkflow = await buttonJobController.buttonJobRepository.collectionWorkflow(
        createdButtonJob.id
      );
      expect(foundCollectionWorkflow).to.deepEqual(createdCollectionWorkflow);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        buttonJobController.buttonJobRepository.collectionWorkflow(-1)
      ).to.be.rejected();
    });
  });
});
