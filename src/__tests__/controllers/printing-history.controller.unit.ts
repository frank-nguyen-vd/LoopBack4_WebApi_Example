// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { PrintingHistoryController } from '../../controllers';
// import { PrintingHistory } from '../../models';
// import {
//   CollectionWorkflowRepository,
//   PrinterInfoRepository,
//   PrinterJobRepository,
//   PrintingHistoryRepository,
//   UserInfoRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Printing History Controller', () => {
//   let printingHistoryController: PrintingHistoryController;
//   let printingHistoryRepository: PrintingHistoryRepository;
//   let printerJobRepository: PrinterJobRepository;
//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     printerJobRepository = new PrinterJobRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(UserInfoRepository)),
//       Getter.fromValue(createStubInstance(PrinterInfoRepository)),
//       Getter.fromValue(createStubInstance(CollectionWorkflowRepository))
//     );
//     printingHistoryRepository = new PrintingHistoryRepository(
//       datasource,
//       Getter.fromValue(printerJobRepository)
//     );
//     printingHistoryController = new PrintingHistoryController(
//       printingHistoryRepository
//     );
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new PrintingHistory(Helpers.newPrintingHistory());
//       const createdObject = await printingHistoryController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrintingHistory(Helpers.newPrintingHistory());
//       const createdObject = await printingHistoryController.create(newObject);
//       const foundObject = await printingHistoryController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printingHistoryController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrintingHistory(Helpers.newPrintingHistory());
//       const modifiedObject = await printingHistoryController.create(newObject);
//       modifiedObject.remarks = 'DONE';
//       await expect(
//         printingHistoryController.updateById(modifiedObject.id ?? -1, {
//           remarks: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await printingHistoryController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         printingHistoryController.updateById(-1, { remarks: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new PrintingHistory(Helpers.newPrintingHistory());
//       const createdObject = await printingHistoryController.create(newObject);
//       await expect(
//         printingHistoryController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         printingHistoryController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(printingHistoryController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its printer job', () => {
//     it('should be successful if item exists', async () => {
//       const createdPrinterJob = await printerJobRepository.create(
//         Helpers.newPrinterJob()
//       );
//       const createdPrintingHistory = await printingHistoryRepository.create(
//         Helpers.newPrintingHistory()
//       );
//       const foundPrinterJob = await printingHistoryController.getPrinterJob(
//         createdPrintingHistory.id
//       );
//       expect(foundPrinterJob).to.deepEqual(createdPrinterJob);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         printingHistoryController.getPrinterJob(-1)
//       ).to.be.rejected();
//     });
//   });
// });
