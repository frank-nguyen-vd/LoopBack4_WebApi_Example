import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { TvInfoController } from '../../controllers';
import { TvInfo } from '../../models';
import { TvInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('TV Info Controller', () => {
  let tvInfoController: TvInfoController;
  let tvInfoRepository: TvInfoRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    tvInfoRepository = new TvInfoRepository(datasource);
    tvInfoController = new TvInfoController(tvInfoRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new TvInfo(Helpers.newTvInfo());
      const createdObject = await tvInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new TvInfo(Helpers.newTvInfo());
      await expect(tvInfoController.create(newObject)).to.be.fulfilled();
      await expect(tvInfoController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new TvInfo(Helpers.newTvInfo());
      const createdObject = await tvInfoController.create(newObject);
      const foundObject = await tvInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(tvInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new TvInfo(Helpers.newTvInfo());
      const modifiedObject = await tvInfoController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        tvInfoController.updateById(modifiedObject.id ?? -1, { status: 'DONE' })
      ).to.be.fulfilled();
      const foundObject = await tvInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        tvInfoController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new TvInfo(Helpers.newTvInfo());
      const createdObject = await tvInfoController.create(newObject);
      await expect(
        tvInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        tvInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(tvInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
