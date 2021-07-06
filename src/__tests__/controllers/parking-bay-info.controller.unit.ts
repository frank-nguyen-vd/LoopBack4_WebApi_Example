import { Getter } from '@loopback/core';
import { createStubInstance, expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { ParkingBayInfoController } from '../../controllers';
import { ParkingBayInfo } from '../../models';
import {
  DeceasedInfoRepository,
  HearthInfoRepository,
  ParkingBayInfoRepository,
} from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Parking Bay Info Controller', () => {
  let parkingBayController: ParkingBayInfoController;
  let hearthRepository: HearthInfoRepository;
  let parkingBayRepository: ParkingBayInfoRepository;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    hearthRepository = new HearthInfoRepository(
      datasource,
      Getter.fromValue(createStubInstance(DeceasedInfoRepository))
    );
    parkingBayRepository = new ParkingBayInfoRepository(
      datasource,
      Getter.fromValue(hearthRepository)
    );
    parkingBayController = new ParkingBayInfoController(parkingBayRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new ParkingBayInfo(Helpers.newParkingBayInfo());
      const createdObject = await parkingBayController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new ParkingBayInfo(Helpers.newParkingBayInfo());
      await expect(parkingBayController.create(newObject)).to.be.fulfilled();
      await expect(parkingBayController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new ParkingBayInfo(Helpers.newParkingBayInfo());
      const createdObject = await parkingBayController.create(newObject);
      const foundObject = await parkingBayController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if id does not exist', async () => {
      await expect(parkingBayController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new ParkingBayInfo(Helpers.newParkingBayInfo());
      const modifiedObject = await parkingBayController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        parkingBayController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await parkingBayController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if id does not exist', async () => {
      await expect(
        parkingBayController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful given correct id', async () => {
      const newObject = new ParkingBayInfo(Helpers.newParkingBayInfo());
      const createdObject = await parkingBayController.create(newObject);
      await expect(
        parkingBayController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        parkingBayController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if id does not exist', async () => {
      await expect(parkingBayController.deleteById(-1)).to.be.rejected();
    });
  });

  describe('retrieve its hearth info', () => {
    it('should be successful if item exists', async () => {
      const createdHearth = await hearthRepository.create(
        Helpers.newHearthInfo()
      );
      const createdParkingBay = await parkingBayRepository.create(
        Helpers.newParkingBayInfo()
      );
      const foundHearth = await parkingBayController.getHearthInfo(
        createdParkingBay.id
      );
      expect(foundHearth).to.deepEqual(createdHearth);
    });

    it('should throw error if item does not exist', async () => {
      await expect(parkingBayController.getHearthInfo(-1)).to.be.rejected();
    });
  });
});
