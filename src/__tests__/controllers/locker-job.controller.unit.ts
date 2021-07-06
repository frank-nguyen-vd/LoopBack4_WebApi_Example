// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { LockerJobController } from '../../controllers';
// import { LockerJob } from '../../models';
// import {
//   CollectionWorkflowInfoRepository,
//   CollectionWorkflowRepository,
//   LockerInfoRepository,
//   LockerJobRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Locker Job Controller', () => {
//   let lockerJobController: LockerJobController;
//   let collectionWorkflowRepository: CollectionWorkflowRepository;
//   let lockerJobRepository: LockerJobRepository;
//   let lockerRepository: LockerInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     collectionWorkflowRepository = new CollectionWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
//     );
//     lockerRepository = new LockerInfoRepository(datasource);
//     lockerJobRepository = new LockerJobRepository(
//       datasource,
//       Getter.fromValue(collectionWorkflowRepository),
//       Getter.fromValue(lockerRepository)
//     );
//     lockerJobController = new LockerJobController(lockerJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new LockerJob(Helpers.newLockerJob());
//       const createdObject = await lockerJobController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new LockerJob(Helpers.newLockerJob());
//       const createdObject = await lockerJobController.create(newObject);
//       const foundObject = await lockerJobController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(lockerJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new LockerJob(Helpers.newLockerJob());
//       const modifiedObject = await lockerJobController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         lockerJobController.updateById(modifiedObject.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await lockerJobController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(
//         lockerJobController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new LockerJob(Helpers.newLockerJob());
//       const createdObject = await lockerJobController.create(newObject);
//       await expect(
//         lockerJobController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         lockerJobController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(lockerJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its collection workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdWorkflow = await collectionWorkflowRepository.create(
//         Helpers.newCollectionWorkflow()
//       );
//       const createdLockerJob = await lockerJobRepository.create(
//         Helpers.newLockerJob()
//       );
//       const foundWorkflow = await lockerJobController.getCollectionWorkflow(
//         createdLockerJob.id
//       );
//       expect(foundWorkflow).to.deepEqual(createdWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         lockerJobController.getCollectionWorkflow(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its locker info', () => {
//     it('should be successful if item exists', async () => {
//       const createdLockerInfo = await lockerRepository.create(
//         Helpers.newLockerInfo()
//       );
//       const createdLockerJob = await lockerJobRepository.create(
//         Helpers.newLockerJob()
//       );
//       const foundLockerInfo = await lockerJobController.getLockerInfo(
//         createdLockerJob.id
//       );
//       expect(foundLockerInfo).to.deepEqual(createdLockerInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(lockerJobController.getLockerInfo(-1)).to.be.rejected();
//     });
//   });
// });
