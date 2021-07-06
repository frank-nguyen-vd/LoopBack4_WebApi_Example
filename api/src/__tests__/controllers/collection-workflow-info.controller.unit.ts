// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe } from 'mocha';
// import sinon from 'sinon';
// import { CollectionWorkflowInfoController } from '../../controllers';
// import { CollectionWorkflowInfo } from '../../models';
// import {
//   CollectionWorkflowInfoRepository,
//   DeceasedInfoRepository,
//   HearthInfoRepository,
//   LockerInfoRepository,
//   OneIlsToPcmsRepository,
//   RecipientInfoRepository,
//   RoomInfoRepository
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Collection Workflow Info Controller', () => {
//   let collectionWorkflowInfoController: CollectionWorkflowInfoController;
//   let collectionWorkflowInfoRepository: CollectionWorkflowInfoRepository;
//   let deceasedInfoRepository: DeceasedInfoRepository;
//   let hearthInfoRepository: HearthInfoRepository;
//   let oneIlsRepository: OneIlsToPcmsRepository;
//   let roomRepository: RoomInfoRepository;
//   let lockerRepository: LockerInfoRepository;
//   let recipientRepository: RecipientInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();

//     hearthInfoRepository = new HearthInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(DeceasedInfoRepository))
//     );
//     oneIlsRepository = new OneIlsToPcmsRepository(datasource);
//     deceasedInfoRepository = new DeceasedInfoRepository(
//       datasource,
//       Getter.fromValue(oneIlsRepository)
//     );
//     roomRepository = new RoomInfoRepository(datasource, Getter.fromValue(createStubInstance(HearthInfoRepository)));
//     lockerRepository = new LockerInfoRepository(datasource);
//     recipientRepository = new RecipientInfoRepository(datasource);

//     collectionWorkflowInfoRepository = new CollectionWorkflowInfoRepository(
//       datasource,
//       Getter.fromValue(hearthInfoRepository),
//       Getter.fromValue(deceasedInfoRepository),
//       Getter.fromValue(oneIlsRepository),
//       Getter.fromValue(roomRepository),
//       Getter.fromValue(lockerRepository),
//       Getter.fromValue(recipientRepository)
//     );
//     collectionWorkflowInfoController = new CollectionWorkflowInfoController(
//       collectionWorkflowInfoRepository
//     );
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if the item does not exist', async () => {
//       const newItem = new CollectionWorkflowInfo(
//         Helpers.newCollectionWorkflowInfo()
//       );
//       const repoCreate = sinon.spy(collectionWorkflowInfoRepository, 'create');
//       const createdItem = await collectionWorkflowInfoController.create(
//         newItem
//       );
//       expect(repoCreate.calledOnceWith(newItem)).to.be.true();
//       newItem.id = createdItem.id;
//       expect(createdItem).to.deepEqual(newItem);
//     });
//   });

//   describe('read/find an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = new CollectionWorkflowInfo(
//         Helpers.newCollectionWorkflowInfo()
//       );
//       const newItem = await collectionWorkflowInfoController.create(request);
//       const repoFindById = sinon.spy(
//         collectionWorkflowInfoRepository,
//         'findById'
//       );
//       const foundItems = await collectionWorkflowInfoController.findById(
//         newItem.id ?? -1
//       );
//       expect(repoFindById.calledOnceWith(newItem.id)).to.be.true();
//       expect(foundItems).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       const repoFindById = sinon.spy(
//         collectionWorkflowInfoRepository,
//         'findById'
//       );
//       await expect(
//         collectionWorkflowInfoController.findById(-1)
//       ).to.be.rejected();
//       expect(repoFindById.calledOnceWith(-1)).to.be.true();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const request = new CollectionWorkflowInfo(
//         Helpers.newCollectionWorkflowInfo()
//       );
//       const newItem = await collectionWorkflowInfoController.create(request);
//       const repoUpdateById = sinon.spy(
//         collectionWorkflowInfoRepository,
//         'updateById'
//       );
//       await expect(
//         collectionWorkflowInfoController.updateById(newItem.id ?? -1, {
//           qrCode: 'NEW QR CODE',
//         })
//       ).to.be.fulfilled();
//       expect(
//         repoUpdateById.calledOnceWith(newItem.id, { qrCode: 'NEW QR CODE' })
//       ).to.be.true();
//       const foundItem = await collectionWorkflowInfoController.findById(
//         newItem.id ?? -1
//       );
//       newItem.qrCode = 'NEW QR CODE';
//       expect(foundItem).to.deepEqual(newItem);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.updateById(-1, {
//           qrCode: 'NEW QR CODE',
//         })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const request = new CollectionWorkflowInfo(
//         Helpers.newCollectionWorkflowInfo()
//       );
//       const newItem = await collectionWorkflowInfoController.create(request);
//       const repoDeleteById = sinon.spy(
//         collectionWorkflowInfoRepository,
//         'deleteById'
//       );
//       await expect(
//         collectionWorkflowInfoController.deleteById(newItem.id ?? -1)
//       ).to.be.fulfilled();
//       expect(repoDeleteById.calledOnceWith(newItem.id)).to.be.true();
//       await expect(
//         collectionWorkflowInfoController.findById(newItem.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.deleteById(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its deceased info', () => {
//     it('should be successful if item exists', async () => {
//       const newCollectionWorkflowInfo = new CollectionWorkflowInfo(
//         Helpers.newCollectionWorkflowInfo()
//       );
//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoController.create(
//         newCollectionWorkflowInfo
//       );
//       const createdDeceasedInfo = await deceasedInfoRepository.create(
//         Helpers.newDeceasedInfo()
//       );
//       const foundDeceasedInfo = await collectionWorkflowInfoController.getDeceasedInfo(
//         createdCollectionWorkflowInfo.deceasedId
//       );
//       expect(foundDeceasedInfo).to.deepEqual(createdDeceasedInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getDeceasedInfo(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its hearth info', () => {
//     it('should be successful if item exists', async () => {
//       const createdHearthCremain = await hearthInfoRepository.create(
//         Helpers.newHearthInfo({ location: 'Cremain' })
//       );
//       const createdHearthEmpty1 = await hearthInfoRepository.create(
//         Helpers.newHearthInfo({ location: 'Empty1' })
//       );
//       const createdHearthEmpty2 = await hearthInfoRepository.create(
//         Helpers.newHearthInfo({ location: 'Empty2' })
//       );

//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoRepository.create(
//         Helpers.newCollectionWorkflowInfo({
//           hearthCremainId: createdHearthCremain.id,
//           hearthEmpty1Id: createdHearthEmpty1.id,
//           hearthEmpty2Id: createdHearthEmpty2.id,
//         })
//       );

//       const foundHearthCrematin = await collectionWorkflowInfoController.getHearthCremain(
//         createdCollectionWorkflowInfo.id
//       );
//       const foundHearthEmpty1 = await collectionWorkflowInfoController.getHearthEmpty1(
//         createdCollectionWorkflowInfo.id
//       );
//       const foundHearthEmpty2 = await collectionWorkflowInfoController.getHearthEmpty2(
//         createdCollectionWorkflowInfo.id
//       );

//       expect(foundHearthCrematin).to.deepEqual(createdHearthCremain);
//       expect(foundHearthEmpty1).to.deepEqual(createdHearthEmpty1);
//       expect(foundHearthEmpty2).to.deepEqual(createdHearthEmpty2);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getHearthCremain(-1)
//       ).to.be.rejected();
//       await expect(
//         collectionWorkflowInfoController.getHearthEmpty1(-1)
//       ).to.be.rejected();
//       await expect(
//         collectionWorkflowInfoController.getHearthEmpty2(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its OneILS info', () => {
//     it('should be successful if item exists', async () => {
//       const createdOneIls = await oneIlsRepository.create(
//         Helpers.newOneIlsToPcms()
//       );
//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoRepository.create(
//         Helpers.newCollectionWorkflowInfo({
//           oneIlsToPcmsId: createdOneIls.id,
//         })
//       );
//       const foundOneIls = await collectionWorkflowInfoController.getOneIlsToPcms(
//         createdCollectionWorkflowInfo.id
//       );
//       expect(foundOneIls).to.deepEqual(createdOneIls);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getOneIlsToPcms(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its room info', () => {
//     it('should be successful if item exists', async () => {
//       const createdRoomInfo = await roomRepository.create(
//         Helpers.newRoomInfo()
//       );
//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoRepository.create(
//         Helpers.newCollectionWorkflowInfo({
//           roomId: createdRoomInfo.id,
//         })
//       );
//       const foundRoomInfo = await collectionWorkflowInfoController.getRoomInfo(
//         createdCollectionWorkflowInfo.id
//       );
//       expect(foundRoomInfo).to.deepEqual(createdRoomInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getRoomInfo(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its locker info', () => {
//     it('should be successful if item exists', async () => {
//       const createdLockerInfo = await lockerRepository.create(
//         Helpers.newLockerInfo()
//       );
//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoRepository.create(
//         Helpers.newCollectionWorkflowInfo({
//           lockerId: createdLockerInfo.id,
//         })
//       );
//       const foundLockerInfo = await collectionWorkflowInfoController.getLockerInfo(
//         createdCollectionWorkflowInfo.id
//       );
//       expect(foundLockerInfo).to.deepEqual(createdLockerInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getLockerInfo(-1)
//       ).to.be.rejected();
//     });
//   });

//   describe('retrieve its recipient info', () => {
//     it('should be successful if item exists', async () => {
//       const createdRecipientInfo = await recipientRepository.create(
//         Helpers.newRecipientInfo()
//       );
//       const createdCollectionWorkflowInfo = await collectionWorkflowInfoRepository.create(
//         Helpers.newCollectionWorkflowInfo({
//           recipientId: createdRecipientInfo.id,
//         })
//       );
//       const foundRecipientInfo = await collectionWorkflowInfoController.getRecipientInfo(
//         createdCollectionWorkflowInfo.id
//       );
//       expect(foundRecipientInfo).to.deepEqual(createdRecipientInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         collectionWorkflowInfoController.getRecipientInfo(-1)
//       ).to.be.rejected();
//     });
//   });
// });
