// import { Getter } from '@loopback/core';
// import { createStubInstance, expect } from '@loopback/testlab';
// import { describe } from 'mocha';
// import sinon from 'sinon';
// import { CremationWorkflowController } from '../../controllers';
// import { CremationWorkflow } from '../../models';
// import {
//   CremationWorkflowInfoRepository,
//   CremationWorkflowRepository,
//   DeceasedInfoRepository,
//   HearthInfoRepository,
//   OneIlsToPcmsRepository,
// } from '../../repositories';
// import { Helpers } from '../helpers/service.helper';
// import { InMemoryDataSource } from '../helpers/testdb.helper';

// describe('Cremation Workflow Controller', () => {
//   let cremationWorkflowController: CremationWorkflowController;
//   let cremationWorkflowRepository: CremationWorkflowRepository;
//   let cremationWorkflowInfoRepository: CremationWorkflowInfoRepository;

//   beforeEach(() => {
//     const datasource = new InMemoryDataSource();
//     cremationWorkflowInfoRepository = new CremationWorkflowInfoRepository(
//       datasource,
//       Getter.fromValue(createStubInstance(DeceasedInfoRepository)),
//       Getter.fromValue(createStubInstance(HearthInfoRepository)),
//       Getter.fromValue(createStubInstance(OneIlsToPcmsRepository))
//     );
//     cremationWorkflowRepository = new CremationWorkflowRepository(
//       datasource,
//       Getter.fromValue(cremationWorkflowInfoRepository)
//     );
//     cremationWorkflowController = new CremationWorkflowController(
//       cremationWorkflowRepository
//     );
//   });
//   afterEach(() => {
//     sinon.restore();
//   });

//   describe('create a new item', () => {
//     it('should be successful if the item does not exist', async () => {
//       const newItem = new CremationWorkflow(Helpers.newCremationWorkflow());
//       const repoCreate = sinon.spy(cremationWorkflowRepository, 'create');
//       const createdItem = await cremationWorkflowController.create(newItem);
//       expect(repoCreate.calledOnceWith(newItem)).to.be.true();
//       newItem.id = createdItem.id;
//       expect(createdItem).to.deepEqual(newItem);
//     });

//     it('should throw error if the item exists', async () => {
//       const newItem = Helpers.newCremationWorkflow();
//       const repoCreate = sinon.spy(cremationWorkflowRepository, 'create');
//       await expect(
//         cremationWorkflowController.create(newItem)
//       ).to.be.fulfilled();
//       await expect(
//         cremationWorkflowController.create(newItem)
//       ).to.be.rejected();
//       expect(repoCreate.calledOnce).to.be.true();
//     });
//   });

//   describe('read/find an existing item', () => {
//     it('should be successful if the item exists', async () => {
//       const newItem = Helpers.newCremationWorkflow();
//       const createdItem = await cremationWorkflowController.create(newItem);
//       const repoFindById = sinon.spy(cremationWorkflowRepository, 'findById');
//       const foundItems = await cremationWorkflowController.findById(
//         createdItem.id ?? -1
//       );
//       expect(repoFindById.calledOnceWith(createdItem.id)).to.be.true();
//       expect(foundItems).to.deepEqual(createdItem);
//     });

//     it('should throw error if the item does not exist', async () => {
//       const repoFindById = sinon.spy(cremationWorkflowRepository, 'findById');
//       await expect(cremationWorkflowController.findById(-1)).to.be.rejected();
//       expect(repoFindById.calledOnceWith(-1)).to.be.true();
//     });
//   });

//   describe('update an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newItem = Helpers.newCremationWorkflow();
//       const createdItem = await cremationWorkflowController.create(newItem);
//       const repoUpdateById = sinon.spy(
//         cremationWorkflowRepository,
//         'updateById'
//       );
//       await expect(
//         cremationWorkflowController.updateById(createdItem.id ?? -1, {
//           status: 'DONE',
//         })
//       ).to.be.fulfilled();
//       expect(
//         repoUpdateById.calledOnceWith(createdItem.id, { status: 'DONE' })
//       ).to.be.true();
//       const foundItem = await cremationWorkflowController.findById(
//         createdItem.id ?? -1
//       );
//       createdItem.status = 'DONE';
//       expect(foundItem).to.deepEqual(createdItem);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(
//         cremationWorkflowController.updateById(-1, { status: 'DONE' })
//       ).to.be.rejected();
//     });
//   });

//   describe('delete an existing item', () => {
//     it('should be successful given correct id', async () => {
//       const newItem = Helpers.newCremationWorkflow();
//       const createdItem = await cremationWorkflowController.create(newItem);
//       const repoDeleteById = sinon.spy(
//         cremationWorkflowRepository,
//         'deleteById'
//       );
//       await expect(
//         cremationWorkflowController.deleteById(createdItem.id ?? -1)
//       ).to.be.fulfilled();
//       expect(repoDeleteById.calledOnceWith(createdItem.id)).to.be.true();
//       await expect(
//         cremationWorkflowController.findById(createdItem.id ?? -1)
//       ).to.be.rejected();
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(cremationWorkflowController.deleteById(-1)).to.be.rejected();
//     });
//   });

//   describe('retrieve cremation workflow info', () => {
//     it('should be successful given correct id', async () => {
//       const createdWorkflow = await cremationWorkflowController.create(
//         Helpers.newCremationWorkflow()
//       );
//       const createdWorkflowInfo = await cremationWorkflowInfoRepository.create(
//         Helpers.newCremationWorkflowInfo()
//       );
//       const retrievedWorkflowInfo = await cremationWorkflowController.getCremationWorkflowInfo(
//         createdWorkflow.id
//       );
//       expect(retrievedWorkflowInfo).to.deepEqual(createdWorkflowInfo);
//     });

//     it('should throw error if id does not exist', async () => {
//       await expect(
//         cremationWorkflowController.getCremationWorkflowInfo(-1)
//       ).to.be.rejected();
//     });
//   });
// });
