import { Getter } from '@loopback/core';
import { createStubInstance, expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { EPaperJobController } from '../../controllers';
import { EPaperInfo, EPaperJob } from '../../models';
import {
  CollectionWorkflowInfoRepository,
  CollectionWorkflowRepository,
  CremationWorkflowInfoRepository,
  CremationWorkflowRepository,
  EPaperInfoRepository,
  EPaperJobRepository,
} from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('EPaperJob Controller', () => {
  let ePaperJobController: EPaperJobController;
  let ePaperInfoRepository: EPaperInfoRepository;
  let cremationWorkflowRepository: CremationWorkflowRepository;
  let collectionWorkflowRepository: CollectionWorkflowRepository;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    ePaperInfoRepository = new EPaperInfoRepository(datasource);
    cremationWorkflowRepository = new CremationWorkflowRepository(
      datasource,
      Getter.fromValue(createStubInstance(CremationWorkflowInfoRepository))
    );
    collectionWorkflowRepository = new CollectionWorkflowRepository(
      datasource,
      Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
    );
    const ePaperRepository = new EPaperJobRepository(
      datasource,
      Getter.fromValue(ePaperInfoRepository),
      Getter.fromValue(cremationWorkflowRepository),
      Getter.fromValue(collectionWorkflowRepository)
    );
    ePaperJobController = new EPaperJobController(ePaperRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new EPaperJob(Helpers.newEPaperJob());
      const createdObject = await ePaperJobController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new EPaperJob(Helpers.newEPaperJob());
      await expect(ePaperJobController.create(newObject)).to.be.fulfilled();
      await expect(ePaperJobController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperJob(Helpers.newEPaperJob());
      const createdObject = await ePaperJobController.create(newObject);
      const foundObject = await ePaperJobController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(ePaperJobController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperJob(Helpers.newEPaperJob());
      const modifiedObject = await ePaperJobController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        ePaperJobController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await ePaperJobController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        ePaperJobController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperJob(Helpers.newEPaperJob());
      const createdObject = await ePaperJobController.create(newObject);
      await expect(
        ePaperJobController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        ePaperJobController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(ePaperJobController.deleteById(-1)).to.be.rejected();
    });
  });

  describe('retrieve e-paper info', () => {
    it('should be successful if item exists', async () => {
      const createdEPaperJob = await ePaperJobController.create(
        new EPaperJob(Helpers.newEPaperJob())
      );
      const createdEPaperInfo = await ePaperInfoRepository.create(
        new EPaperInfo(Helpers.newEPaper())
      );
      const foundEPaperInfo = await ePaperJobController.getEPaperInfo(
        createdEPaperJob.id
      );
      expect(createdEPaperInfo).to.deepEqual(foundEPaperInfo);
    });

    it('should throw error if item does not exist', async () => {
      await expect(ePaperJobController.getEPaperInfo(-1)).to.be.rejected();
    });
  });

  describe('retrieve cremation workflow', () => {
    it('should be successful if item exists', async () => {
      const createdEPaperJob = await ePaperJobController.create(
        new EPaperJob(Helpers.newEPaperJob())
      );
      const createdCremationWorkflow = await cremationWorkflowRepository.create(
        Helpers.newCremationWorkflow()
      );
      const foundCremationWorkflow = await ePaperJobController.getCremationWorkflow(
        createdEPaperJob.id
      );
      expect(foundCremationWorkflow).to.deepEqual(createdCremationWorkflow);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        ePaperJobController.getCremationWorkflow(-1)
      ).to.be.rejected();
    });
  });
});
