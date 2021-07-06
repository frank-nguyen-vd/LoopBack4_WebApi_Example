import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { ScannerInfoController } from '../../controllers';
import { ScannerInfo } from '../../models';
import { ScannerInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Scanner Info Controller', () => {
  let scannerInfoController: ScannerInfoController;
  let scannerInfoRepository: ScannerInfoRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    scannerInfoRepository = new ScannerInfoRepository(datasource);
    scannerInfoController = new ScannerInfoController(scannerInfoRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new ScannerInfo(Helpers.newScannerInfo());
      const createdObject = await scannerInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new ScannerInfo(Helpers.newScannerInfo());
      await expect(scannerInfoController.create(newObject)).to.be.fulfilled();
      await expect(scannerInfoController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ScannerInfo(Helpers.newScannerInfo());
      const createdObject = await scannerInfoController.create(newObject);
      const foundObject = await scannerInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(scannerInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ScannerInfo(Helpers.newScannerInfo());
      const modifiedObject = await scannerInfoController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        scannerInfoController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await scannerInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        scannerInfoController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ScannerInfo(Helpers.newScannerInfo());
      const createdObject = await scannerInfoController.create(newObject);
      await expect(
        scannerInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        scannerInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(scannerInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
