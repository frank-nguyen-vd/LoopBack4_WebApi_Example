import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { OneIlsToPcmsController } from '../../controllers';
import { OneIlsToPcms } from '../../models';
import { OneIlsToPcmsRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('One ILS to PCMS Controller', () => {
  let oneIlsController: OneIlsToPcmsController;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    const oneIlsRepository = new OneIlsToPcmsRepository(datasource);
    oneIlsController = new OneIlsToPcmsController(oneIlsRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new OneIlsToPcms(Helpers.newIlsRecord());
      const createdObject = await oneIlsController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new OneIlsToPcms(Helpers.newIlsRecord());
      await expect(oneIlsController.create(newObject)).to.be.fulfilled();
      await expect(oneIlsController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new OneIlsToPcms(Helpers.newIlsRecord());
      const createdObject = await oneIlsController.create(newObject);
      const foundObject = await oneIlsController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if id does not exist', async () => {
      await expect(oneIlsController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new OneIlsToPcms(Helpers.newIlsRecord());
      const modifiedObject = await oneIlsController.create(newObject);
      modifiedObject.bookingStatus = 'DONE';
      await expect(
        oneIlsController.updateById(modifiedObject.id ?? -1, {
          bookingStatus: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await oneIlsController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if id does not exist', async () => {
      await expect(
        oneIlsController.updateById(-1, { bookingStatus: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new OneIlsToPcms(Helpers.newIlsRecord());
      const createdObject = await oneIlsController.create(newObject);
      await expect(
        oneIlsController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        oneIlsController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if id does not exist', async () => {
      await expect(oneIlsController.deleteById(-1)).to.be.rejected();
    });
  });
});
