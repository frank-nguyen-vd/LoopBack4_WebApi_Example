import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { ButtonInfoController } from '../../controllers';
import { ButtonInfo } from '../../models';
import { ButtonInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Button Info Controller', () => {
  let buttonInfoController: ButtonInfoController;
  let buttonInfoRepository: ButtonInfoRepository;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    buttonInfoRepository = new ButtonInfoRepository(datasource);
    buttonInfoController = new ButtonInfoController(buttonInfoRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new ButtonInfo(Helpers.newButtonInfo());
      const createdObject = await buttonInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonInfo(Helpers.newButtonInfo());
      const createdObject = await buttonInfoController.create(newObject);
      const foundObject = await buttonInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(buttonInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonInfo(Helpers.newButtonInfo());
      const modifiedObject = await buttonInfoController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        buttonInfoController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await buttonInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        buttonInfoController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new ButtonInfo(Helpers.newButtonInfo());
      const createdObject = await buttonInfoController.create(newObject);
      await expect(
        buttonInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        buttonInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(buttonInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
