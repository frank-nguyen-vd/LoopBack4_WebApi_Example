// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import _ from 'lodash';
// import { describe } from 'mocha';
// import sinon from 'sinon';
// import { CrematorInfoController } from '../../controllers';
// import { CrematorInfo } from '../../models';
// import {
//   CrematorInfoRepository,
//   DeceasedInfoRepository,
//   HearthInfoRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Cremator Info Controller', () => {
//   let crematorInfoController: CrematorInfoController;
//   let crematorInfoRepository: CrematorInfoRepository;
//   let hearthInfoRepository: HearthInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     hearthInfoRepository = new HearthInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(DeceasedInfoRepository))
//     );
//     crematorInfoRepository = new CrematorInfoRepository(
//       datasource,
//       Getter.fromValue(hearthInfoRepository)
//     );
//     crematorInfoController = new CrematorInfoController(crematorInfoRepository);
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if the item does not exist', async () => {
//       const request = Helpers.newCrematorInfo();
//       const repoCreate = sinon.spy(crematorInfoRepository, 'create');
//       const newItem = await crematorInfoController.create(request);
//       expect(repoCreate.calledOnceWith(request)).to.be.true();
//       expect(new CrematorInfo(_.omit(newItem, 'id'))).to.deepEqual(request);
//     });

//     it('should throw error if the item exists', async () => {
//       const request = Helpers.newCrematorInfo();
//       const repoCreate = sinon.spy(crematorInfoRepository, 'create');
//       await expect(crematorInfoController.create(request)).to.be.fulfilled();
//       await expect(crematorInfoController.create(request)).to.be.rejected();
//       expect(repoCreate.calledOnce).to.be.true();
//     });
//   });

//   describe('read/find an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorInfo();
//       const newItem = await crematorInfoController.create(request);
//       const repoFindById = sinon.spy(crematorInfoRepository, 'findById');
//       const foundItems = await crematorInfoController.findById(
//         newItem.id ?? -1
//       );
//       expect(repoFindById.calledOnceWith(newItem.id)).to.be.true();
//       expect(foundItems).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       const repoFindById = sinon.spy(crematorInfoRepository, 'findById');
//       await expect(crematorInfoController.findById(-1)).to.be.rejected();
//       expect(repoFindById.calledOnceWith(-1)).to.be.true();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorInfo();
//       const newItem = await crematorInfoController.create(request);
//       const repoUpdateById = sinon.spy(crematorInfoRepository, 'updateById');
//       await expect(
//         crematorInfoController.updateById(newItem.id ?? -1, { status: 'DONE' })
//       ).to.be.fulfilled();
//       expect(
//         repoUpdateById.calledOnceWith(newItem.id, { status: 'DONE' })
//       ).to.be.true();
//       const foundItem = await crematorInfoController.findById(newItem.id ?? -1);
//       newItem.status = 'DONE';
//       expect(foundItem).to.deepEqual(newItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       await expect(
//         crematorInfoController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const request = Helpers.newCrematorInfo();
//       const newItem = await crematorInfoController.create(request);
//       const repoDeleteById = sinon.spy(crematorInfoRepository, 'deleteById');
//       await expect(
//         crematorInfoController.deleteById(newItem.id ?? -1)
//       ).to.be.fulfilled();
//       expect(repoDeleteById.calledOnceWith(newItem.id)).to.be.true();
//       await expect(
//         crematorInfoController.findById(newItem.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if the item does not exist', async () => {
//       await expect(crematorInfoController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its hearth info', () => {
//     it('should be successful if hearth info exists', async () => {
//       const createdHearthInfo = await hearthInfoRepository.create(
//         Helpers.newHearthInfo()
//       );
//       const createdCrematorInfo = await crematorInfoRepository.create(
//         Helpers.newCrematorInfo()
//       );
//       const foundHearthInfo = await crematorInfoController.getHearthInfo(
//         createdCrematorInfo.id
//       );
//       expect(foundHearthInfo).to.deepEqual(createdHearthInfo);
//     });

//     it('should throw error if hearth info not exist', async () => {
//       await expect(crematorInfoController.getHearthInfo(-1)).to.be.rejected();
//     });
//   });
// });
