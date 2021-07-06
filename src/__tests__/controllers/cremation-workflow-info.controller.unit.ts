// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe } from 'mocha';
// import sinon from 'sinon';
// import { CremationWorkflowInfoController } from '../../controllers';
// import { CremationWorkflowInfo } from '../../models';
// import {
//   CremationWorkflowInfoRepository,
//   DeceasedInfoRepository,
//   HearthInfoRepository,
//   OneIlsToPcmsRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Cremation Workflow Info Controller', () => {
//   let cremationWorkflowInfoController: CremationWorkflowInfoController;
//   let cremationWorkflowInfoRepository: CremationWorkflowInfoRepository;
//   let deceasedInfoRepository: DeceasedInfoRepository;
//   let hearthInfoRepository: HearthInfoRepository;
//   let oneIlsRepository: OneIlsToPcmsRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     deceasedInfoRepository = new DeceasedInfoRepository(
//       datasource,
//       Getter.fromValue(oneIlsRepository)
//     );
//     hearthInfoRepository = new HearthInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(DeceasedInfoRepository))
//     );
//     oneIlsRepository = new OneIlsToPcmsRepository(datasource);
//     cremationWorkflowInfoRepository = new CremationWorkflowInfoRepository(
//       datasource,
//       Getter.fromValue(deceasedInfoRepository),
//       Getter.fromValue(hearthInfoRepository),
//       Getter.fromValue(oneIlsRepository)
//     );
//     cremationWorkflowInfoController = new CremationWorkflowInfoController(
//       cremationWorkflowInfoRepository
//     );
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if the item does not exist', async () => {
//       const newItem = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const repoCreate = sinon.spy(cremationWorkflowInfoRepository, 'create');
//       const createdItem = await cremationWorkflowInfoController.create(newItem);
//       expect(repoCreate.calledOnceWith(newItem)).to.be.true();
//       newItem.id = createdItem.id;
//       expect(createdItem).to.deepEqual(newItem);
//     });

//     it('should throw error if the item exists', async () => {
//       const request = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const repoCreate = sinon.spy(cremationWorkflowInfoRepository, 'create');
//       await expect(
//         cremationWorkflowInfoController.create(request)
//       ).to.be.fulfilled();
//       await expect(
//         cremationWorkflowInfoController.create(request)
//       ).to.be.rejected();
//       expect(repoCreate.calledOnce).to.be.true();
//     });
//   });

//   describe('read/find an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const newItem = await cremationWorkflowInfoController.create(request);
//       const repoFindById = sinon.spy(
//         cremationWorkflowInfoRepository,
//         'findById'
//       );
//       const foundItems = await cremationWorkflowInfoController.findById(
//         newItem.id ?? -1
//       );
//       expect(repoFindById.calledOnceWith(newItem.id)).to.be.true();
//       expect(foundItems).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       const repoFindById = sinon.spy(
//         cremationWorkflowInfoRepository,
//         'findById'
//       );
//       await expect(
//         cremationWorkflowInfoController.findById(-1)
//       ).to.be.rejected();
//       expect(repoFindById.calledOnceWith(-1)).to.be.true();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const request = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const newItem = await cremationWorkflowInfoController.create(request);
//       const repoUpdateById = sinon.spy(
//         cremationWorkflowInfoRepository,
//         'updateById'
//       );
//       await expect(
//         cremationWorkflowInfoController.updateById(newItem.id ?? -1, {
//           qrCode: 'NEW QR CODE',
//         })
//       ).to.be.fulfilled();
//       expect(
//         repoUpdateById.calledOnceWith(newItem.id, { qrCode: 'NEW QR CODE' })
//       ).to.be.true();
//       const foundItem = await cremationWorkflowInfoController.findById(
//         newItem.id ?? -1
//       );
//       newItem.qrCode = 'NEW QR CODE';
//       expect(foundItem).to.deepEqual(newItem);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         cremationWorkflowInfoController.updateById(-1, {
//           qrCode: 'NEW QR CODE',
//         })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const request = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const newItem = await cremationWorkflowInfoController.create(request);
//       const repoDeleteById = sinon.spy(
//         cremationWorkflowInfoRepository,
//         'deleteById'
//       );
//       await expect(
//         cremationWorkflowInfoController.deleteById(newItem.id ?? -1)
//       ).to.be.fulfilled();
//       expect(repoDeleteById.calledOnceWith(newItem.id)).to.be.true();
//       await expect(
//         cremationWorkflowInfoController.findById(newItem.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         cremationWorkflowInfoController.deleteById(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its deceased info', () => {
//     it('should be successful if item exists', async () => {
//       const newCremationWorkflowInfo = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const createdCremationWorkflowInfo = await cremationWorkflowInfoController.create(
//         newCremationWorkflowInfo
//       );
//       const createdDeceasedInfo = await deceasedInfoRepository.create(
//         Helpers.newDeceasedInfo()
//       );
//       const foundDeceasedInfo = await cremationWorkflowInfoController.getDeceasedInfo(
//         createdCremationWorkflowInfo.deceasedId
//       );
//       expect(foundDeceasedInfo).to.deepEqual(createdDeceasedInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         cremationWorkflowInfoController.getDeceasedInfo(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its hearth info', () => {
//     it('should be successful if item exists', async () => {
//       const newCremationWorkflowInfo = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const createdCremationWorkflowInfo = await cremationWorkflowInfoController.create(
//         newCremationWorkflowInfo
//       );
//       const createdHearthInfo = await hearthInfoRepository.create(
//         Helpers.newHearthInfo()
//       );
//       const foundHearthInfo = await cremationWorkflowInfoController.getHearthInfo(
//         createdCremationWorkflowInfo.hearthCremainId
//       );
//       expect(foundHearthInfo).to.deepEqual(createdHearthInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         cremationWorkflowInfoController.getHearthInfo(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its OneILS info', () => {
//     it('should be successful if item exists', async () => {
//       const newCremationWorkflowInfo = new CremationWorkflowInfo(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const createdCremationWorkflowInfo = await cremationWorkflowInfoController.create(
//         newCremationWorkflowInfo
//       );
//       const createdOneIls = await oneIlsRepository.create(
//         Helpers.newOneIlsToPcms()
//       );
//       const foundOneIls = await cremationWorkflowInfoController.getOneIlsToPcms(
//         createdCremationWorkflowInfo.oneIlsToPcmsId
//       );
//       expect(foundOneIls).to.deepEqual(createdOneIls);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         cremationWorkflowInfoController.getOneIlsToPcms(-1)
//       ).to.be.rejected();
//     });
//   });
// });
