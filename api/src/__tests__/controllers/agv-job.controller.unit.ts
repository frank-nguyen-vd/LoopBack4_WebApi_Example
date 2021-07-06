// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { AgvJobController } from '../../controllers';
// import { AgvJob } from '../../models';
// import {
//   AgvJobRepository,
//   CollectionWorkflowInfoRepository,
//   CollectionWorkflowRepository,
//   CremationWorkflowInfoRepository,
//   CremationWorkflowRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Agv Job Controller', () => {
//   let agvJobController: AgvJobController;
//   let agvJobRepository: AgvJobRepository;
//   let cremationWorkflowRepository: CremationWorkflowRepository;
//   let collectionWorkflowRepository: CollectionWorkflowRepository;
//   let collectionWorkflowInfoRepository: CollectionWorkflowInfoRepository;
//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     cremationWorkflowRepository = new CremationWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CremationWorkflowInfoRepository))
//     );
//     collectionWorkflowRepository = new CollectionWorkflowRepository(
//       datasource,
//       Getter.fromValue(collectionWorkflowInfoRepository)
//     );
//     agvJobRepository = new AgvJobRepository(
//       datasource,
//       Getter.fromValue(cremationWorkflowRepository),
//       Getter.fromValue(collectionWorkflowRepository)
//     );
//     agvJobController = new AgvJobController(agvJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new AgvJob(Helpers.newAgvJob());
//       const createdObject = await agvJobController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new AgvJob(Helpers.newAgvJob());
//       const createdObject = await agvJobController.create(newObject);
//       const foundObject = await agvJobController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(agvJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new AgvJob(Helpers.newAgvJob());
//       const modifiedObject = await agvJobController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         agvJobController.updateById(modifiedObject.id ?? -1, { status: 'DONE' })
//       ).to.be.fulfilled();
//       const foundObject = await agvJobController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         agvJobController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new AgvJob(Helpers.newAgvJob());
//       const createdObject = await agvJobController.create(newObject);
//       await expect(
//         agvJobController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         agvJobController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(agvJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its cremation workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdAgvJob = await agvJobController.create(
//         new AgvJob(Helpers.newAgvJob())
//       );
//       const createdCremationWorkflow = await cremationWorkflowRepository.create(
//         Helpers.newCremationWorkflow()
//       );
//       const retrievedCremationWorkflow = await agvJobController.getCremationWorkflow(
//         createdAgvJob.id
//       );
//       expect(retrievedCremationWorkflow).to.deepEqual(createdCremationWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       const createdAgvJob = await agvJobController.create(
//         new AgvJob(Helpers.newAgvJob())
//       );
//       await expect(
//         agvJobController.getCremationWorkflow(createdAgvJob.id)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its collection workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdAgvJob = await agvJobController.create(
//         new AgvJob(Helpers.newAgvJob())
//       );
//       const createdCollectionWorkflow = await collectionWorkflowRepository.create(
//         Helpers.newCollectionWorkflow()
//       );
//       const retrievedCollectionWorkflow = await agvJobController.getCollectionWorkflow(
//         createdAgvJob.id
//       );
//       expect(retrievedCollectionWorkflow).to.deepEqual(
//         createdCollectionWorkflow
//       );
//     });

//     it('should throw error if item does not exist', async () => {
//       const createdAgvJob = await agvJobController.create(
//         new AgvJob(Helpers.newAgvJob())
//       );
//       await expect(
//         agvJobController.getCollectionWorkflow(createdAgvJob.id)
//       ).to.be.rejected();
//     });
//   });
// });
