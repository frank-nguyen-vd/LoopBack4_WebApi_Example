import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { AgvStationController } from '../../controllers';
import { AgvStation } from '../../models';
import { AgvStationRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Agv Station Controller', () => {
  let agvStationController: AgvStationController;
  let agvStationRepository: AgvStationRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    agvStationRepository = new AgvStationRepository(datasource);
    agvStationController = new AgvStationController(agvStationRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new AgvStation(Helpers.newAgvStation());
      const createdObject = await agvStationController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new AgvStation(Helpers.newAgvStation());
      await expect(agvStationController.create(newObject)).to.be.fulfilled();
      await expect(agvStationController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new AgvStation(Helpers.newAgvStation());
      const createdObject = await agvStationController.create(newObject);
      const foundObject = await agvStationController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(agvStationController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new AgvStation(Helpers.newAgvStation());
      const modifiedObject = await agvStationController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        agvStationController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await agvStationController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        agvStationController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new AgvStation(Helpers.newAgvStation());
      const createdObject = await agvStationController.create(newObject);
      await expect(
        agvStationController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        agvStationController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(agvStationController.deleteById(-1)).to.be.rejected();
    });
  });
});
