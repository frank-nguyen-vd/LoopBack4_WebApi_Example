import { Getter } from '@loopback/core';
import { createStubInstance, expect, sinon } from '@loopback/testlab';
import { describe } from 'mocha';
import { AuthController } from '../../controllers';
import { MESSAGE } from '../../keys';
import { JWTService, MyUserService } from '../../rbac';
import { RbacParams, RbacSubject } from '../../rbac/keys';
import {
  GroupInfoRepository,
  UserCredentialRepository,
  UserInfoRepository,
} from '../../repositories';
import { Helpers } from '../helpers/service.helper';
import { InMemoryDataSource } from '../helpers/testdb.helper';

describe('Auth Controller', () => {
  let userRepository: UserInfoRepository;
  let userCredentialRepository: UserCredentialRepository;
  let userService: MyUserService;
  let authController: AuthController;

  let getUserCredential: sinon.SinonStub;
  let generateToken: sinon.SinonStub;
  let getUserInfo: sinon.SinonStub;
  let getUserRole: sinon.SinonStub;
  let generateOtp: sinon.SinonStub;
  let updateUserOtp: sinon.SinonStub;
  let updateAccountStatus: sinon.SinonStub;
  let getToken: sinon.SinonStub;
  let verifyOtp: sinon.SinonStub;

  beforeEach(() => {
    const datasource = new InMemoryDataSource();
    const jwtService = createStubInstance(JWTService);
    userRepository = new UserInfoRepository(
      datasource,
      Getter.fromValue(createStubInstance(UserCredentialRepository)),
      Getter.fromValue(createStubInstance(GroupInfoRepository))
    );
    userService = new MyUserService(
      createStubInstance(UserInfoRepository),
      createStubInstance(GroupInfoRepository),
      createStubInstance(UserCredentialRepository),
      jwtService
    );
    userCredentialRepository = new UserCredentialRepository(datasource);
    authController = new AuthController(
      userRepository,
      userCredentialRepository,
      userService,
      jwtService
    );

    // Stub external functions
    generateToken = sinon.stub(userService, 'generateToken');
    getUserInfo = sinon.stub(userService, 'getUserInfo');
    getUserRole = sinon.stub(userService, 'getUserRole');
    getUserCredential = sinon.stub(userService, 'getUserCredential');
    generateOtp = sinon.stub(authController, 'generateOtp');
    updateUserOtp = sinon.stub(authController, 'updateUserOtp');
    updateAccountStatus = sinon.stub(authController, 'updateAccountStatus');
    getToken = sinon.stub(authController, 'getToken');
    verifyOtp = sinon.stub(authController, 'verifyOtp');
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('login without 2FA', () => {
    it('should not return token if administrators', async () => {
      // Set Up
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Admin);
      getUserCredential.resolves(newUserCredential);
      generateOtp.resolves(Helpers.otpCode);
      updateUserOtp.resolves();
      updateAccountStatus.resolves();
      getToken.resolves(Helpers.token);

      // Perform
      const request = Helpers.newCredential();
      const response = await authController.login(request);

      // Verify
      sinon.assert.calledOnceWithExactly(
        getUserInfo,
        undefined,
        request,
        undefined
      );
      sinon.assert.calledOnceWithExactly(getUserRole, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(getUserCredential, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(generateOtp, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(
        updateUserOtp,
        newUserCredential.id,
        Helpers.otpCode
      );
      sinon.assert.notCalled(updateAccountStatus);
      sinon.assert.notCalled(getToken);
      expect(response).not.containEql({ token: Helpers.token });
    });

    it('should return token if service account', async () => {
      // Set Up
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Service);
      getUserCredential.resolves(newUserCredential);
      generateOtp.resolves(Helpers.otpCode);
      updateUserOtp.resolves();
      updateAccountStatus.resolves();
      getToken.resolves(Helpers.token);

      // Perform
      const request = Helpers.newCredential();
      const response = await authController.login(request);

      // Verify
      sinon.assert.calledOnceWithExactly(
        getUserInfo,
        undefined,
        request,
        undefined
      );
      sinon.assert.calledOnceWithExactly(getUserRole, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(getUserCredential, newUserInfo.id);
      sinon.assert.notCalled(generateOtp);
      sinon.assert.notCalled(updateUserOtp);
      sinon.assert.calledOnce(updateAccountStatus);
      sinon.assert.calledOnce(getToken);
      expect(response).containEql({ token: Helpers.token });
    });
  });

  describe('login with 2FA', () => {
    it('should be successful with correct username and correct Otp', async () => {
      // Set Up
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Admin);
      getUserCredential.resolves(newUserCredential);
      verifyOtp.resolves();
      getToken.resolves(Helpers.token);

      // Perform
      const request = Helpers.newOtpCredential();
      const response = await authController.verifyLoginOtp(request);

      // Verify
      sinon.assert.calledOnceWithExactly(
        getUserInfo,
        request.username,
        undefined,
        undefined
      );
      sinon.assert.calledOnceWithExactly(getUserRole, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(getUserCredential, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(
        verifyOtp,
        newUserCredential,
        request.otpCode
      );
      sinon.assert.calledOnce(updateAccountStatus);
      sinon.assert.calledOnce(getToken);
      expect(response).containEql({ token: Helpers.token });
    });

    it('should throw error if username does not exist', async () => {
      // Set Up
      const request = Helpers.newOtpCredential();
      getUserInfo.throws();

      // Perform and Verify
      await expect(authController.verifyLoginOtp(request)).to.be.rejected();
    });

    it('should throw error if OTP is incorrect', async () => {
      // Set Up
      const request = Helpers.newOtpCredential();
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Admin);
      getUserCredential.resolves(newUserCredential);
      verifyOtp.throws();

      // Perform and Verify
      await expect(authController.verifyLoginOtp(request)).to.be.rejected();
    });
  });

  describe('send request to reset password', () => {
    it('should throw error if cannot retrieve UserInfo', async () => {
      // Set Up
      const request = Helpers.newResetPassRequest();
      getUserInfo.throws();

      // Perform and Verify
      await expect(
        authController.verifyResetPassRequest(request)
      ).to.be.rejected();
    });

    it('should be successful if UserInfo exists', async () => {
      // Set Up
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Admin);
      getUserCredential.resolves(newUserCredential);

      // Perform
      const request = Helpers.newResetPassRequest();
      const response = await authController.verifyResetPassRequest(request);

      // Verify
      expect(response.message).to.deepEqual(MESSAGE.OTP.REQUIRED);
    });
  });

  describe('verify Reset-Password-Otp', () => {
    it('should return Reset-Password-Token if no errors', async () => {
      // Set Up
      const newUserInfo = Helpers.newUserInfo();
      const newUserCredential = Helpers.newUserCredential();
      getUserInfo.resolves(newUserInfo);
      getUserRole.resolves(RbacSubject.Admin);
      getUserCredential.resolves(newUserCredential);
      verifyOtp.resolves();
      getToken.resolves(Helpers.token);

      // Perform
      const request = Helpers.newOtpCredential();
      const response = await authController.verifyResetPassOtp(request);

      // Verify
      sinon.assert.calledOnceWithExactly(
        getUserInfo,
        request.username,
        undefined,
        undefined
      );
      sinon.assert.calledOnceWithExactly(getUserRole, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(getUserCredential, newUserInfo.id);
      sinon.assert.calledOnceWithExactly(
        verifyOtp,
        newUserCredential,
        request.otpCode
      );
      sinon.assert.calledOnceWithExactly(
        getToken,
        newUserInfo,
        RbacSubject.Admin,
        RbacParams.Token.ResetPass
      );
      expect(response).containEql({ token: Helpers.token });
    });

    it('should throw error if UserInfo does not exist', async () => {
      // Set Up
      getUserInfo.throws();

      // Perform and Verify
      const request = Helpers.newOtpCredential();
      await expect(authController.verifyResetPassOtp(request)).to.be.rejected();
    });

    it('should throw error if fails Otp verification', async () => {
      // Set Up
      verifyOtp.throws();

      // Perform and Verify
      const request = Helpers.newOtpCredential();
      await expect(authController.verifyResetPassOtp(request)).to.be.rejected();
    });
  });
});
