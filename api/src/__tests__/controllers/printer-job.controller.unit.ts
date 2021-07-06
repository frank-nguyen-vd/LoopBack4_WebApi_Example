// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { PrinterJobController } from '../../controllers';
// import { PrinterJob } from '../../models';
// import {
//   AccessLevelRepository,
//   CollectionWorkflowInfoRepository,
//   CollectionWorkflowRepository,
//   GroupInfoRepository,
//   PrinterInfoRepository,
//   PrinterJobRepository,

//   UserCredentialRepository,
//   UserInfoRepository
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Printer Job Controller', () => {
//   let printerJobController: PrinterJobController;
//   let printerJobRepository: PrinterJobRepository;
//   let printerInfoRepository: PrinterInfoRepository;
//   let userInfoRepository: UserInfoRepository;
//   let collectionWorkflowRepository: CollectionWorkflowRepository;
//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     printerInfoRepository = new PrinterInfoRepository(datasource);
//     collectionWorkflowRepository = new CollectionWorkflowRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(CollectionWorkflowInfoRepository))
//     );
//     userInfoRepository = new UserInfoRepository(
//       datasource,
//       Getter.fromValue(new UserCredentialRepository(datasource)),
//       Getter.fromValue(new GroupInfoRepository(datasource, Getter.fromValue(new AccessLevelRepository(datasource))))
//     );
//     printerJobRepository = new PrinterJobRepository(
//       datasource,
//       Getter.fromValue(userInfoRepository),
//       Getter.fromValue(printerInfoRepository),
//       Getter.fromValue(collectionWorkflowRepository)
//     );
//     printerJobController = new PrinterJobController(printerJobRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new PrinterJob(Helpers.newPrinterJob());
//       const createdObject = await printerJobController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if item exists', async () => {
//       const newObject = new PrinterJob(Helpers.newPrinterJob());
//       await expect(printerJobController.create(newObject)).to.be.fulfilled();
//       await expect(printerJobController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrinterJob(Helpers.newPrinterJob());
//       const createdObject = await printerJobController.create(newObject);
//       const foundObject = await printerJobController.findById(createdObject.id ?? -1);
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrinterJob(Helpers.newPrinterJob());
//       const modifiedObject = await printerJobController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         printerJobController.updateById(modifiedObject.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await printerJobController.findById(modifiedObject.id ?? -1);
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.updateById(-1, { status: 'DONE' })).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrinterJob(Helpers.newPrinterJob());
//       const createdObject = await printerJobController.create(newObject);
//       await expect(printerJobController.deleteById(createdObject.id ?? -1)).to.be.fulfilled();
//       await expect(printerJobController.findById(createdObject.id ?? -1)).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its printer info', () => {
//     it('should be successful if item exists', async () => {
//       const createdPrinter = await printerInfoRepository.create(Helpers.newPrinterInfo());
//       const createdPrinterJob = await printerJobRepository.create(Helpers.newPrinterJob());
//       const foundPrinter = await printerJobController.getPrinterInfo(createdPrinterJob.id);
//       expect(foundPrinter).to.deepEqual(createdPrinter);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.getPrinterInfo(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its user info', () => {
//     it('should be successful if item exists', async () => {
//       const createdUser = await userInfoRepository.create(Helpers.newUserInfo());
//       const createdPrinterJob = await printerJobRepository.create(Helpers.newPrinterJob());
//       const foundUser = await printerJobController.getUserInfo(createdPrinterJob.id);
//       expect(foundUser).to.deepEqual(createdUser);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.getUserInfo(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its collection workflow', () => {
//     it('should be successful if item exists', async () => {
//       const createdWorkflow = await collectionWorkflowRepository.create(Helpers.newCollectionWorkflow());
//       const createdPrinterJob = await printerJobRepository.create(Helpers.newPrinterJob());
//       const foundWorkflow = await printerJobController.getCollectionWorkflow(createdPrinterJob.id);
//       expect(foundWorkflow).to.deepEqual(createdWorkflow);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printerJobController.getCollectionWorkflow(-1)).to.be.rejected();
//     });
//   });
// });
