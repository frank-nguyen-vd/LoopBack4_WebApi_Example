// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { HearthInfoController } from '../../controllers';
// import { HearthInfo } from '../../models';
// import {
//   DeceasedInfoRepository,
//   HearthInfoRepository,
//   OneIlsToPcmsRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Hearth Info Controller', () => {
//   let hearthController: HearthInfoController;
//   let hearthRepository: HearthInfoRepository;
//   let deceasedRepository: DeceasedInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     deceasedRepository = new DeceasedInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(OneIlsToPcmsRepository))
//     );
//     hearthRepository = new HearthInfoRepository(
//       datasource,
//       Getter.fromValue(deceasedRepository)
//     );
//     hearthController = new HearthInfoController(hearthRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new HearthInfo(Helpers.newHearthInfo());
//       const createdObject = await hearthController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if item exists', async () => {
//       const newObject = new HearthInfo(Helpers.newHearthInfo());
//       await expect(hearthController.create(newObject)).to.be.fulfilled();
//       await expect(hearthController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new HearthInfo(Helpers.newHearthInfo());
//       const createdObject = await hearthController.create(newObject);
//       const foundObject = await hearthController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(hearthController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new HearthInfo(Helpers.newHearthInfo());
//       const modifiedObject = await hearthController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         hearthController.updateById(modifiedObject.id ?? -1, { status: 'DONE' })
//       ).to.be.fulfilled();
//       const foundObject = await hearthController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(
//         hearthController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new HearthInfo(Helpers.newHearthInfo());
//       const createdObject = await hearthController.create(newObject);
//       await expect(
//         hearthController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         hearthController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(hearthController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve deceased info', () => {
//     it('should be successful if item exists', async () => {
//       const createdDeceasedInfo = await deceasedRepository.create(
//         Helpers.newDeceasedInfo()
//       );
//       const createdHearthInfo = await hearthRepository.create(
//         Helpers.newHearthInfo({ deceasedId: createdDeceasedInfo.id })
//       );
//       const foundDeceasedInfo = await hearthController.getDeceasedInfo(
//         createdHearthInfo.id
//       );
//       expect(foundDeceasedInfo).to.deepEqual(createdDeceasedInfo);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(hearthController.getDeceasedInfo(-1)).to.be.rejected();
//     });
//   });
// });
