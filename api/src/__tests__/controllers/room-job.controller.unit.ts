// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { RoomJobController } from '../../controllers';
// import { RoomJob } from '../../models';
// import {
//   CollectionWorkflowInfoRepository,
//   CollectionWorkflowRepository,
//   HearthInfoRepository,
//   RoomInfoRepository,
//   RoomJobRepository
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Room Job Controller', () => {
//   let roomJobController: RoomJobController;
//   let roomJobRepository: RoomJobRepository;
//   let collectionWorkflowRepository: CollectionWorkflowRepository;
//   let roomRepository: RoomInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     collectionWorkflowRepository = new CollectionWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
//     );
//     roomRepository = new RoomInfoRepository(datasource, Getter.fromValue(createStubInstance(HearthInfoRepository)));
//     roomJobRepository = new RoomJobRepository(
//       datasource,
//       Getter.fromValue(collectionWorkflowRepository),
//       Getter.fromValue(roomRepository)
//     );
//     roomJobController = new RoomJobController(roomJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new RoomJob(Helpers.newRoomJob());
//       const createdObject = await roomJobController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new RoomJob(Helpers.newRoomJob());
//       const createdObject = await roomJobController.create(newObject);
//       const foundObject = await roomJobController.findById(createdObject.id ?? -1);
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(roomJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new RoomJob(Helpers.newRoomJob());
//       const modifiedObject = await roomJobController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         roomJobController.updateById(modifiedObject.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await roomJobController.findById(modifiedObject.id ?? -1);
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(roomJobController.updateById(-1, { status: 'DONE' })).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new RoomJob(Helpers.newRoomJob());
//       const createdObject = await roomJobController.create(newObject);
//       await expect(roomJobController.deleteById(createdObject.id ?? -1)).to.be.fulfilled();
//       await expect(roomJobController.findById(createdObject.id ?? -1)).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(roomJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its room info', () => {
//     it('should be successful if item exists', async () => {
//       const createdRoomInfo = await roomRepository.create(Helpers.newRoomInfo());
//       const createdRoomJob = await roomJobRepository.create(Helpers.newRoomJob());
//       const foundRoomInfo = await roomJobController.getRoomInfo(createdRoomJob.id);
//       expect(foundRoomInfo).to.deepEqual(createdRoomInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(roomJobController.getRoomInfo(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its collection workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdCollectionWorkflow = await collectionWorkflowRepository.create(Helpers.newCollectionWorkflow());
//       const createdRoomJob = await roomJobRepository.create(Helpers.newRoomJob());
//       const foundCollectionWorkflow = await roomJobController.getCollectionWorkflow(createdRoomJob.id);
//       expect(foundCollectionWorkflow).to.deepEqual(createdCollectionWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(roomJobController.getCollectionWorkflow(-1)).to.be.rejected();
//     });
//   });
// });
