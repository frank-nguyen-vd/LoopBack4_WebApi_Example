import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { PrinterInfoController } from '../../controllers';
import { PrinterInfo } from '../../models';
import { PrinterInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Printer Info Controller', () => {
  let printerInfoController: PrinterInfoController;
  let printerInfoRepository: PrinterInfoRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    printerInfoRepository = new PrinterInfoRepository(datasource);
    printerInfoController = new PrinterInfoController(printerInfoRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new PrinterInfo(Helpers.newPrinterInfo());
      const createdObject = await printerInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new PrinterInfo(Helpers.newPrinterInfo());
      await expect(printerInfoController.create(newObject)).to.be.fulfilled();
      await expect(printerInfoController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new PrinterInfo(Helpers.newPrinterInfo());
      const createdObject = await printerInfoController.create(newObject);
      const foundObject = await printerInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(printerInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new PrinterInfo(Helpers.newPrinterInfo());
      const modifiedObject = await printerInfoController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        printerInfoController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await printerInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        printerInfoController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new PrinterInfo(Helpers.newPrinterInfo());
      const createdObject = await printerInfoController.create(newObject);
      await expect(
        printerInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        printerInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(printerInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
