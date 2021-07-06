import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { EPaperInfoController } from '../../controllers';
import { EPaperInfo } from '../../models';
import { EPaperInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('EPaperInfo Controller', () => {
  let ePaperController: EPaperInfoController;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    const ePaperRepository = new EPaperInfoRepository(datasource);
    ePaperController = new EPaperInfoController(ePaperRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new EPaperInfo(Helpers.newEPaper());
      const createdObject = await ePaperController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new EPaperInfo(Helpers.newEPaper());
      await expect(ePaperController.create(newObject)).to.be.fulfilled();
      await expect(ePaperController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperInfo(Helpers.newEPaper());
      const createdObject = await ePaperController.create(newObject);
      const foundObject = await ePaperController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(ePaperController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperInfo(Helpers.newEPaper());
      const modifiedObject = await ePaperController.create(newObject);
      modifiedObject.location = 'New Location';
      await expect(
        ePaperController.updateById(modifiedObject.id ?? -1, {
          location: 'New Location',
        })
      ).to.be.fulfilled();
      const foundObject = await ePaperController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        ePaperController.updateById(-1, { location: 'New Location' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new EPaperInfo(Helpers.newEPaper());
      const createdObject = await ePaperController.create(newObject);
      await expect(
        ePaperController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        ePaperController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(ePaperController.deleteById(-1)).to.be.rejected();
    });
  });
});
