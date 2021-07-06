import { Getter } from '@loopback/core';
import { createStubInstance, expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { RoomInfoController } from '../../controllers';
import { RoomInfo } from '../../models';
import { HearthInfoRepository, RoomInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Room Info Controller', () => {
  let roomInfoController: RoomInfoController;
  let roomInfoRepository: RoomInfoRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    roomInfoRepository = new RoomInfoRepository(
      datasource,
      Getter.fromValue(createStubInstance(HearthInfoRepository))
    );
    roomInfoController = new RoomInfoController(roomInfoRepository);
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new RoomInfo(Helpers.newRoomInfo());
      const createdObject = await roomInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new RoomInfo(Helpers.newRoomInfo());
      await expect(roomInfoController.create(newObject)).to.be.fulfilled();
      await expect(roomInfoController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RoomInfo(Helpers.newRoomInfo());
      const createdObject = await roomInfoController.create(newObject);
      const foundObject = await roomInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(roomInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RoomInfo(Helpers.newRoomInfo());
      const modifiedObject = await roomInfoController.create(newObject);
      modifiedObject.status = 'DONE';
      await expect(
        roomInfoController.updateById(modifiedObject.id ?? -1, {
          status: 'DONE',
        })
      ).to.be.fulfilled();
      const foundObject = await roomInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        roomInfoController.updateById(-1, { status: 'DONE' })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RoomInfo(Helpers.newRoomInfo());
      const createdObject = await roomInfoController.create(newObject);
      await expect(
        roomInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        roomInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(roomInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
