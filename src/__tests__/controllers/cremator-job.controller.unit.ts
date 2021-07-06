// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe } from 'mocha';
// import sinon from 'sinon';
// import { CrematorJobController } from '../../controllers';
// import { CrematorJob } from '../../models';
// import {
//   CremationWorkflowInfoRepository,
//   CremationWorkflowRepository,
//   CrematorInfoRepository,
//   CrematorJobRepository,
//   HearthInfoRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Cremator Job Controller', () => {
//   let crematorJobRepository: CrematorJobRepository;
//   let cremationWorkflowRepository: CremationWorkflowRepository;
//   let crematorJobController: CrematorJobController;
//   let crematorInfoRepository: CrematorInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     const cremationWorkflowInfoRepository = createStubInstance(
//       CremationWorkflowInfoRepository
//     );
//     crematorInfoRepository = new CrematorInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(HearthInfoRepository))
//     );
//     cremationWorkflowRepository = new CremationWorkflowRepository(
//       datasource,
//       Getter.fromValue(cremationWorkflowInfoRepository)
//     );
//     crematorJobRepository = new CrematorJobRepository(
//       datasource,
//       Getter.fromValue(cremationWorkflowRepository),
//       Getter.fromValue(crematorInfoRepository)
//     );
//     crematorJobController = new CrematorJobController(crematorJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const request = new CrematorJob(Helpers.newCrematorJob());
//       const newItem = await crematorJobController.create(request);
//       request.id = newItem.id;
//       expect(newItem).to.deepEqual(request);
//     });
//   });

//   describe('read/find an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorJob();
//       const newItem = await crematorJobRepository.create(request);
//       const foundItems = await crematorJobController.findById(newItem.id ?? -1);
//       expect(foundItems).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       await expect(crematorJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorJob();
//       const newItem = await crematorJobRepository.create(request);
//       await crematorJobController.updateById(newItem.id ?? -1, {
//         status: 'DONE',
//       });
//       const foundItems = await crematorJobController.findById(newItem.id ?? -1);
//       newItem.status = 'DONE';
//       expect(foundItems).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       await expect(
//         crematorJobController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorJob();
//       const newItem = await crematorJobRepository.create(request);
//       await crematorJobController.deleteById(newItem.id ?? -1);
//       const foundItems = await crematorJobController.find();
//       expect(foundItems).to.deepEqual([]);
//     });

//     it('should throw error if the item does not exist', async () => {
//       await expect(crematorJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its cremator info', () => {
//     it('should be successful if cremator info exists', async () => {
//       const newCrematorJob = await crematorJobRepository.create(
//         Helpers.newCrematorJob()
//       );
//       const newCrematorInfo = await crematorInfoRepository.create(
//         Helpers.newCrematorInfo()
//       );
//       const foundCrematorInfo = await crematorJobController.getCrematorInfo(
//         newCrematorJob.id
//       );
//       expect(foundCrematorInfo).to.deepEqual(newCrematorInfo);
//     });

//     it('should throw error if cremator info does not exist', async () => {
//       const newCrematorJob = await crematorJobRepository.create(
//         Helpers.newCrematorJob()
//       );
//       await expect(
//         crematorJobController.getCrematorInfo(newCrematorJob.id)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its cremation workflow', () => {
//     it('should be successful if cremation workflow exists', async () => {
//       const newCrematorJob = await crematorJobRepository.create(
//         Helpers.newCrematorJob()
//       );
//       const newCrematorWorkflow = await cremationWorkflowRepository.create(
//         Helpers.newCremationWorkflow()
//       );
//       const foundCrematorWorkflow = await crematorJobController.getCremationWorkflow(
//         newCrematorJob.id
//       );
//       expect(foundCrematorWorkflow).to.deepEqual(newCrematorWorkflow);
//     });

//     it('should throw error if cremation workflow does not exist', async () => {
//       const newCrematorJob = await crematorJobRepository.create(
//         Helpers.newCrematorJob()
//       );
//       await expect(
//         crematorJobController.getCremationWorkflow(newCrematorJob.id)
//       ).to.be.rejected();
//     });
//   });
// });
