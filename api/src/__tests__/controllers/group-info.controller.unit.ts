// import { Getter } from '@loopback/core';
// import { expect } from '@loopback/testlab';
// import { describe, it } from 'mocha';
// import sinon from 'sinon';
// import { GroupInfoController } from '../../controllers';
// import { GroupInfo } from '../../models';
// import { AccessLevelRepository, GroupInfoRepository } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Group Controller', () => {
//   let groupController: GroupInfoController;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     const groupRepository = new GroupInfoRepository(datasource, Getter.fromValue(new AccessLevelRepository(datasource)));
//     groupController = new GroupInfoController(groupRepository);
//   });

//   afterEach(() => sinon.restore());

//   describe('create a new user group', () => {
//     it('should be successful if group name does not exist', async () => {
//       const newObject = new GroupInfo(Helpers.newUserGroup());
//       const createdObject = await groupController.create(newObject);
//       newObject.id = createdObject.id;
//       expect(createdObject.id).to.deepEqual(1);
//       expect(createdObject).to.deepEqual(newObject);
//     });

//     it('should throw error if group name exists', async () => {
//       const newObject = new GroupInfo(Helpers.newUserGroup());
//       await expect(groupController.create(newObject)).to.be.fulfilled();
//       await expect(groupController.create(newObject)).to.be.rejected();
//     });
//   });

//   describe('retrieve an existing user group', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new GroupInfo(Helpers.newUserGroup());
//       const createdObject = await groupController.create(newObject);
//       const foundObject = await groupController.findById(createdObject.id ?? -1);
//       expect(foundObject).to.deepEqual(createdObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(groupController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing user group', () => {
//     it('should be successful given correct id', async () => {
//       const newObject = new GroupInfo(Helpers.newUserGroup());
//       const modifiedObject = await groupController.create(newObject);
//       modifiedObject.name = 'New Name';
//       await expect(
//         groupController.updateById(modifiedObject.id ?? -1, {
//           name: 'New Name',
//         })
//       ).to.be.fulfilled();
//       const foundObject = await groupController.findById(modifiedObject.id ?? -1);
//       expect(foundObject).to.deepEqual(modifiedObject);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(groupController.updateById(-1, { name: 'New Name' })).to.be.rejected();
//     });
//   });

//   describe('delete an existing user group', () => {
//     it('should be successful given correct id', async () => {
//       const createdObject = await groupController.create(new GroupInfo(Helpers.newUserGroup()));
//       await expect(groupController.deleteById(createdObject.id ?? -1)).to.be.fulfilled();
//       await expect(groupController.findById(createdObject.id ?? -1)).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(groupController.deleteById(-1)).to.be.rejected();
//     });
//   });
// });
