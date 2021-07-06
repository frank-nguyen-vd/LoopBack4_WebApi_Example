import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { SystemSettingController } from '../../controllers';
import { SystemSetting } from '../../models';
import { SystemSettingRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('System Setting Controller', () => {
  let systemSettingController: SystemSettingController;
  let systemSettingRepository: SystemSettingRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    systemSettingRepository = new SystemSettingRepository(datasource);
    systemSettingController = new SystemSettingController(
      systemSettingRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new SystemSetting(Helpers.newSystemSetting());
      const createdObject = await systemSettingController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new SystemSetting(Helpers.newSystemSetting());
      const createdObject = await systemSettingController.create(newObject);
      const foundObject = await systemSettingController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(systemSettingController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new SystemSetting(Helpers.newSystemSetting());
      const modifiedObject = await systemSettingController.create(newObject);
      modifiedObject.printerTimeout = 0;
      await expect(
        systemSettingController.updateById(modifiedObject.id ?? -1, {
          printerTimeout: 0,
        })
      ).to.be.fulfilled();
      const foundObject = await systemSettingController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        systemSettingController.updateById(-1, { printerTimeout: 0 })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new SystemSetting(Helpers.newSystemSetting());
      const createdObject = await systemSettingController.create(newObject);
      await expect(
        systemSettingController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        systemSettingController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(systemSettingController.deleteById(-1)).to.be.rejected();
    });
  });
});
