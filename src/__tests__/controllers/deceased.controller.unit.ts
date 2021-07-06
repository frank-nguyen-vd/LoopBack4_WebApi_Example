// import { Getter } from '@loopback/core';
// import { expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { DeceasedInfoController } from '../../controllers';
// import { DeceasedInfo } from '../../models';
// import {
//   DeceasedInfoRepository,
//   OneIlsToPcmsRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Deceased Info Controller', () => {
//   let deceasedController: DeceasedInfoController;
//   let oneIlsRepository: OneIlsToPcmsRepository;
//   let deceasedRepository: DeceasedInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     oneIlsRepository = new OneIlsToPcmsRepository(datasource);
//     deceasedRepository = new DeceasedInfoRepository(
//       datasource,
//       Getter.fromValue(oneIlsRepository)
//     );
//     deceasedController = new DeceasedInfoController(deceasedRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new DeceasedInfo(Helpers.newDeceasedInfo());
//       const createdObject = await deceasedController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if item exists', async () => {
//       const newObject = new DeceasedInfo(Helpers.newDeceasedInfo());
//       await expect(deceasedController.create(newObject)).to.be.fulfilled();
//       await expect(deceasedController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new DeceasedInfo(Helpers.newDeceasedInfo());
//       const createdObject = await deceasedController.create(newObject);
//       const foundObject = await deceasedController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(deceasedController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new DeceasedInfo(Helpers.newDeceasedInfo());
//       const modifiedObject = await deceasedController.create(newObject);
//       modifiedObject.causeOfDeath = 'MURDERED';
//       await expect(
//         deceasedController.updateById(modifiedObject.id ?? -1, {
//           causeOfDeath: 'MURDERED',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await deceasedController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(
//         deceasedController.updateById(-1, { causeOfDeath: 'MURDERED' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new DeceasedInfo(Helpers.newDeceasedInfo());
//       const createdObject = await deceasedController.create(newObject);
//       await expect(
//         deceasedController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         deceasedController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(deceasedController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve its OneIls', () => {
//     it('should be successful if item exists', async () => {
//       const createdOneIls = await oneIlsRepository.create(
//         Helpers.newOneIlsToPcms()
//       );
//       const createdDeceased = await deceasedRepository.create(
//         Helpers.newDeceasedInfo()
//       );
//       const foundOneIls = await deceasedController.getOneIlsToPcms(
//         createdDeceased.id
//       );
//       expect(foundOneIls).to.deepEqual(createdOneIls);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(deceasedController.getOneIlsToPcms(-1)).to.be.rejected();
//     });
//   });
// });
