import { expect } from '@loopback/testlab';
import { describe, it } from 'mocha';
import sinon from 'sinon';
import { RecipientInfoController } from '../../controllers';
import { RecipientInfo } from '../../models';
import { RecipientInfoRepository } from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Recipient Info Controller', () => {
  let recipientInfoController: RecipientInfoController;
  let recipientInfoRepository: RecipientInfoRepository;
  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    recipientInfoRepository = new RecipientInfoRepository(datasource);
    recipientInfoController = new RecipientInfoController(
      recipientInfoRepository
    );
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('create a new item', () => {
    it('should be successful if item does not exist', async () => {
      const newObject = new RecipientInfo(Helpers.newRecipientInfo());
      const createdObject = await recipientInfoController.create(newObject);
      newObject.id = createdObject.id;
      expect(createdObject.id).to.deepEqual(1);
      expect(createdObject).to.deepEqual(newObject);
    });

    it('should throw error if item exists', async () => {
      const newObject = new RecipientInfo(Helpers.newRecipientInfo());
      await expect(recipientInfoController.create(newObject)).to.be.fulfilled();
      await expect(recipientInfoController.create(newObject)).to.be.rejected();
    });
  });

  describe('retrieve an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RecipientInfo(Helpers.newRecipientInfo());
      const createdObject = await recipientInfoController.create(newObject);
      const foundObject = await recipientInfoController.findById(
        createdObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(createdObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(recipientInfoController.findById(-1)).to.be.rejected();
    });
  });

  describe('update an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RecipientInfo(Helpers.newRecipientInfo());
      const modifiedObject = await recipientInfoController.create(newObject);
      modifiedObject.relationship = 'father of deceased';
      await expect(
        recipientInfoController.updateById(modifiedObject.id ?? -1, {
          relationship: 'father of deceased',
        })
      ).to.be.fulfilled();
      const foundObject = await recipientInfoController.findById(
        modifiedObject.id ?? -1
      );
      expect(foundObject).to.deepEqual(modifiedObject);
    });

    it('should throw error if item does not exist', async () => {
      await expect(
        recipientInfoController.updateById(-1, {
          relationship: 'father of deceased',
        })
      ).to.be.rejected();
    });
  });

  describe('delete an existing item', () => {
    it('should be successful if item exists', async () => {
      const newObject = new RecipientInfo(Helpers.newRecipientInfo());
      const createdObject = await recipientInfoController.create(newObject);
      await expect(
        recipientInfoController.deleteById(createdObject.id ?? -1)
      ).to.be.fulfilled();
      await expect(
        recipientInfoController.findById(createdObject.id ?? -1)
      ).to.be.rejected();
    });

    it('should throw error if item does not exist', async () => {
      await expect(recipientInfoController.deleteById(-1)).to.be.rejected();
    });
  });
});
