// import { expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { LockerInfoController } from '../../controllers';
// import { LockerInfo } from '../../models';
// import { LockerInfoRepository } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Locker Info Controller', () => {
//   let lockerInfoController: LockerInfoController;
//   let lockerInfoRepository: LockerInfoRepository;
//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     lockerInfoRepository = new LockerInfoRepository(datasource);
//     lockerInfoController = new LockerInfoController(lockerInfoRepository);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if item does not exist', async () => {
//       const newObject = new LockerInfo(Helpers.newLockerInfo());
//       const createdObject = await lockerInfoController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if item exists', async () => {
//       const newObject = new LockerInfo(Helpers.newLockerInfo());
//       await expect(lockerInfoController.create(newObject)).to.be.fulfilled();
//       await expect(lockerInfoController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new LockerInfo(Helpers.newLockerInfo());
//       const createdObject = await lockerInfoController.create(newObject);
//       const foundObject = await lockerInfoController.findById(
//         createdObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(lockerInfoController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new LockerInfo(Helpers.newLockerInfo());
//       const modifiedObject = await lockerInfoController.create(newObject);
//       modifiedObject.status = 'DONE';
//       await expect(
//         lockerInfoController.updateById(modifiedObject.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await lockerInfoController.findById(
//         modifiedObject.id ?? -1
//       );
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(
//         lockerInfoController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful if item exists', async () => {
//       const newObject = new LockerInfo(Helpers.newLockerInfo());
//       const createdObject = await lockerInfoController.create(newObject);
//       await expect(
//         lockerInfoController.deleteById(createdObject.id ?? -1)
//       ).to.be.fulfilled();
//       await expect(
//         lockerInfoController.findById(createdObject.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(lockerInfoController.deleteById(-1)).to.be.rejected();
//     });
//   });
// });
