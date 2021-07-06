// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { ScannerJobController } from '../../controllers';
// import { ScannerJob } from '../../models';
// import {
//   CollectionWorkflowInfoRepository,
//   CollectionWorkflowRepository,
//   CremationWorkflowInfoRepository,
//   CremationWorkflowRepository,
//   ScannerInfoRepository,
//   ScannerJobRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Scanner Job Controller', () => {
//   let scannerJobController: ScannerJobController;
//   let scannerJobRepository: ScannerJobRepository;
//   let cremationWorkflowRepository: CremationWorkflowRepository;
//   let collectionWorkflowRepository: CollectionWorkflowRepository;
//   let scannerInfoRepository: ScannerInfoRepository;
//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     cremationWorkflowRepository = new CremationWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CremationWorkflowInfoRepository))
//     );
//     collectionWorkflowRepository = new CollectionWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
//     );
//     scannerInfoRepository = new ScannerInfoRepository(datasource);
//     scannerJobRepository = new ScannerJobRepository(
//       datasource,
//       Getter.fromValue(cremationWorkflowRepository),
//       Getter.fromValue(collectionWorkflowRepository),
//       Getter.fromValue(scannerInfoRepository)
//     );
//     scannerJobController = new ScannerJobController(scannerJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new ScannerJob(Helpers.newScannerJob());
//       const createdObject = await scannerJobController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if item exists', async () => {
//       const newObject = new ScannerJob(Helpers.newScannerJob());
//       await expect(scannerJobController.create(newObject)).to.be.fulfilled();
//       await expect(scannerJobController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new ScannerJob(Helpers.newScannerJob());
//       const createdObject = await scannerJobController.create(newObject);
//       const foundObject = await scannerJobController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(scannerJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new ScannerJob(Helpers.newScannerJob());
//       const modifiedObject = await scannerJobController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         scannerJobController.updateById(modifiedObject.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await scannerJobController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         scannerJobController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new ScannerJob(Helpers.newScannerJob());
//       const createdObject = await scannerJobController.create(newObject);
//       await expect(
//         scannerJobController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         scannerJobController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(scannerJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its cremation workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdWorkflow = await cremationWorkflowRepository.create(
//         Helpers.newCremationWorkflow()
//       );
//       const createdScannerJob = await scannerJobRepository.create(
//         Helpers.newScannerJob()
//       );
//       const foundWorkflow = await scannerJobController.scannerJobRepository.cremationWorkflow(
//         createdScannerJob.id
//       );
//       expect(foundWorkflow).to.deepEqual(createdWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         scannerJobController.scannerJobRepository.cremationWorkflow(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its collection workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdWorkflow = await collectionWorkflowRepository.create(
//         Helpers.newCollectionWorkflow()
//       );
//       const createdScannerJob = await scannerJobRepository.create(
//         Helpers.newScannerJob()
//       );
//       const foundWorkflow = await scannerJobController.scannerJobRepository.collectionWorkflow(
//         createdScannerJob.id
//       );
//       expect(foundWorkflow).to.deepEqual(createdWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         scannerJobController.scannerJobRepository.collectionWorkflow(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its scanner info', () => {
//     it('should be successful if item exists', async () => {
//       const createdScanner = await scannerInfoRepository.create(
//         Helpers.newScannerInfo()
//       );
//       const createdScannerJob = await scannerJobRepository.create(
//         Helpers.newScannerJob()
//       );
//       const foundScanner = await scannerJobController.getScannerInfo(
//         createdScannerJob.id
//       );
//       expect(foundScanner).to.deepEqual(createdScanner);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(scannerJobController.getScannerInfo(-1)).to.be.rejected();
//     });
//   });
// });
