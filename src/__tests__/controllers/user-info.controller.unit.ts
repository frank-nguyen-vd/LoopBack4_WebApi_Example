// import { Getter } from '@loopback/core';
// import { createStubInstance, expect, sinon } from '@loopback/testlab';
// import _ from 'lodash';
// import { describe } from 'mocha';
// import { UserInfoController } from '../../controllers';
// import { UserInfo } from '../../models';
// import { MyUserService } from '../../rbac';
// import {
//   AccessLevelRepository,
//   GroupInfoRepository,
//   UserCredentialRepository,
//   UserInfoRepository
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';
// describe('UserInfo Controller', () => {
//   let userRepository: UserInfoRepository;
//   let userCredentialRepository: UserCredentialRepository;
//   let groupRepository: GroupInfoRepository;
//   let userController: UserInfoController;
//   let userService: any;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     userCredentialRepository = new UserCredentialRepository(datasource);
//     groupRepository = new GroupInfoRepository(datasource, Getter.fromValue(new AccessLevelRepository(datasource)));
//     userService = createStubInstance(MyUserService);
//     userRepository = new UserInfoRepository(
//       datasource,
//       Getter.fromValue(userCredentialRepository),
//       Getter.fromValue(groupRepository)
//     );
//     userController = new UserInfoController(userRepository, userCredentialRepository, userService);
//   });

//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new user profile', () => {
//     it('should be successful if the user profile does not exist', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();
//       const newUserInfo = new UserInfo(_.omit(newUserRequest, 'password'));
//       const newUserCredential = Helpers.newUserCredential();
//       const findOne = sinon.stub(userRepository, 'findOne');
//       findOne.resolves(undefined);
//       const createUserCredential = sinon.stub(userCredentialRepository, 'create');
//       createUserCredential.resolves(newUserCredential);
//       const createUserInfo = sinon.stub(userRepository, 'create');
//       createUserInfo.resolves(newUserInfo);

//       // Perform
//       const response = await userController.create(newUserRequest);

//       // Verify
//       sinon.assert.calledOnceWithExactly(userService.stubs.hashPassword, newUserRequest.password);
//       sinon.assert.calledOnceWithExactly(findOne, { where: { username: newUserRequest.username } });
//       sinon.assert.calledOnce(createUserCredential);
//       sinon.assert.calledOnce(createUserInfo);

//       newUserInfo.id = newUserCredential.id;
//       expect(response).to.deepEqual(newUserInfo);
//     });

//     it('should return error if the user profile exists', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();

//       // Perform and Verify
//       await expect(userController.create(newUserRequest)).to.be.fulfilled();
//       await expect(userController.create(newUserRequest)).to.be.rejected();
//     });
//   });

//   describe('find user details given an id', () => {
//     it('should return user info given correct id', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();

//       const createdUser = await userController.create(newUserRequest);
//       const foundUser = await userController.findById(createdUser.id ?? -1);
//       expect(foundUser).to.deepEqual(createdUser);
//     });

//     it('should throw error id does not exist', async () => {
//       await expect(userController.findById(-1)).to.be.rejected();
//     });
//   });

//   describe('list all existing users', () => {
//     it('should be successful', async () => {
//       const user1 = await userController.create(Helpers.newUserRequest({ staffId: '1' }));
//       const user2 = await userController.create(Helpers.newUserRequest({ staffId: '2' }));
//       const user3 = await userController.create(Helpers.newUserRequest({ staffId: '3' }));
//       const listOfUsers = await userController.listAll();
//       expect(listOfUsers).to.deepEqual([user1, user2, user3]);
//     });
//   });

//   describe('delete an existing user', () => {
//     it('should be successful given correct id', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();

//       const createdUser = await userController.create(newUserRequest);
//       await expect(userController.deleteById(createdUser.id ?? -1)).to.be.fulfilled();
//       await expect(userController.findById(createdUser.id ?? -1)).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(userController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('update an existing user', () => {
//     it('should be successful given correct id', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();

//       const createdUser = await userController.create(newUserRequest);
//       createdUser.firstName = 'New First Name';
//       await expect(userController.updateById(createdUser.id ?? -1, { firstName: 'New First Name' })).to.be.fulfilled();
//       const modifiedUser = await userController.findById(createdUser.id ?? -1);
//       expect(modifiedUser).to.deepEqual(createdUser);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(userController.updateById(-1, { firstName: 'New First Name' })).to.be.rejected();
//     });
//   });

//   describe('retreive user credential', () => {
//     it('should be successful if item exists', async () => {
//       // Set Up
//       const newUserRequest = Helpers.newUserRequest();
//       const createdUser = await userController.create(newUserRequest);
//       expect(await userController.getUserCredential(createdUser.id ?? 0)).to.hasOwnProperty('password'); // eslint-disable-line
//     });

//     it('should throw error if item does not exist', async () => {
//       await expect(userController.getUserCredential(-1)).to.be.rejected();
//     });
//   });

//   describe('retreive user group info', () => {
//     it('should be successful if item exists', async () => {
//       const newUserRequest = Helpers.newUserRequest();
//       const createdGroup = await groupRepository.create(Helpers.newGroupInfo());
//       const createdUser = await userController.create(Object.assign(newUserRequest, { groupId: createdGroup.id }));
//       expect(await userController.getGroupInfo(createdUser.groupId ?? -1)).to.deepEqual(createdGroup);
//     });

//     it('should throw error if item does not exist', async () => {
//       const newUserRequest = Helpers.newUserRequest();
//       const createdUser = await userController.create(Object.assign(newUserRequest, { groupId: -1 }));
//       await expect(userController.getGroupInfo(createdUser.groupId ?? -1)).to.be.rejected();
//     });
//   });
// });
