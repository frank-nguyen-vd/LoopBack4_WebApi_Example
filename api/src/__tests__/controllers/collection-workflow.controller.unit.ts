import { Getter } from '@loopback/core';
import { createStubInstance, expect } from '@loopback/testlab';
import { describe } from 'mocha';
import sinon from 'sinon';
import { CollectionWorkflowController } from '../../controllers';
import { CollectionWorkflow } from '../../models';
import {
  CollectionWorkflowInfoRepository,
  CollectionWorkflowRepository,
  DeceasedInfoRepository,
  HearthInfoRepository,
  LockerInfoRepository,
  OneIlsToPcmsRepository,
  RecipientInfoRepository,
  RoomInfoRepository,
} from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Collection Workflow Controller', () => {
  let collectionWorkflowController: CollectionWorkflowController;
  let collectionWorkflowRepository: CollectionWorkflowRepository;
  let collectionWorkflowInfoRepository: CollectionWorkflowInfoRepository;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    collectionWorkflowInfoRepository = new CollectionWorkflowInfoRepository(
      datasource,
      Getter.fromValue(createStubInstance(HearthInfoRepository)),
      Getter.fromValue(createStubInstance(DeceasedInfoRepository)),
      Getter.fromValue(createStubInstance(OneIlsToPcmsRepository)),
      Getter.fromValue(createStubInstance(RoomInfoRepository)),
      Getter.fromValue(createStubInstance(LockerInfoRepository)),
      Getter.fromValue(createStubInstance(RecipientInfoRepository))
    );
    collectionWorkflowRepository = new CollectionWorkflowRepository(
      datasource,
      Getter.fromValue(collectionWorkflowInfoRepository)
    );
    collectionWorkflowController = new CollectionWorkflowController(
      collectionWorkflowRepository
    );
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if the item does not exist', async () => {
      const newItem = new CollectionWorkflow(Helpers.newCollectionWorkflow());
      const repoCreate = sinon.spy(collectionWorkflowRepository, 'create');
      const createdItem = await collectionWorkflowController.create(newItem);
      expect(repoCreate.calledOnceWith(newItem)).to.be.true();
      newItem.id = createdItem.id;
      expect(createdItem).to.deepEqual(newItem);
    });
  });

  describe('read/find an existing item', () => {
    it('should be successful if the item exists', async () => {
      const newItem = new CollectionWorkflow(Helpers.newCollectionWorkflow());
      const createdItem = await collectionWorkflowController.create(newItem);
      const repoFindById = sinon.spy(collectionWorkflowRepository, 'findById');
      const foundItems = await collectionWorkflowController.findById(
        createdItem.id ?? -1
      );
      expect(repoFindById.calledOnceWith(createdItem.id)).to.be.true();
      expect(foundItems).to.deepEqual(createdItem);
    });

    it('should throw error if the item does not exist', async () => {
      const repoFindById = sinon.spy(collectionWorkflowRepository, 'findById');
      await expect(collectionWorkflowController.findById(-1)).to.be.rejected();
      expect(repoFindById.calledOnceWith(-1)).to.be.true();
    });
  });

  describe('update an existing item', () => {
    it('should be successful given correct id', async () => {
      const newItem = new CollectionWorkflow(Helpers.newCollectionWorkflow());
      const createdItem = await collectionWorkflowController.create(newItem);
      const repoUpdateById = sinon.spy(
        collectionWorkflowRepository,
        'updateById'
      );
      await expect(
        collectionWorkflowController.updateById(createdItem.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      expect(
        repoUpdateById.calledOnceWith(createdItem.id, { status: 'DONE' })
      ).to.be.true();
      const foundItem = await collectionWorkflowController.findById(
        createdItem.id ?? -1
      );
      createdItem.status = 'DONE';
      expect(foundItem).to.deepEqual(createdItem);
    });

    it('should throw error if id does not exist', async () => {
      await expect(
        collectionWorkflowController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful given correct id', async () => {
      const newItem = new CollectionWorkflow(Helpers.newCollectionWorkflow());
      const createdItem = await collectionWorkflowController.create(newItem);
      const repoDeleteById = sinon.spy(
        collectionWorkflowRepository,
        'deleteById'
      );
      await expect(
        collectionWorkflowController.deleteById(createdItem.id ?? -1)
      ).to.be.fulfilled();
      expect(repoDeleteById.calledOnceWith(createdItem.id)).to.be.true();
      await expect(
        collectionWorkflowController.findById(createdItem.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if id does not exist', async () => {
      await expect(
        collectionWorkflowController.deleteById(-1)
      ).to.be.rejected();
    });
  });

  describe('retrieve collection workflow info', () => {
    it('should be successful given correct id', async () => {
      const createdWorkflow = await collectionWorkflowRepository.create(
        Helpers.newCollectionWorkflow()
      );
      const createdWorkflowInfo = await collectionWorkflowInfoRepository.create(
        Helpers.newCollectionWorkflowInfo()
      );
      const retrievedWorkflowInfo = await collectionWorkflowController.getCollectionWorkflowInfo(
        createdWorkflow.id
      );
      expect(retrievedWorkflowInfo).to.deepEqual(createdWorkflowInfo);
    });

    it('should throw error if id does not exist', async () => {
      await expect(
        collectionWorkflowController.getCollectionWorkflowInfo(-1)
      ).to.be.rejected();
    });
  });
});
