import { authenticate } from '@loopback/authentication';
import { inject } from '@loopback/core';
import { repository } from '@loopback/repository';
import {
  getModelSchemaRef,
  HttpErrors,
  param,
  post,
  requestBody,
} from '@loopback/rest';
import { MESSAGE } from '../keys';
import { log, LOG_FORMAT, LOG_LEVEL } from '../logger';
import {
  AuthResponse,
  Credentials,
  NewPassword,
  OtpCredential,
  ResetPassCredentials,
  UserCredential,
  UserInfo,
} from '../models';
import {
  JWTService,
  MyUserService,
  TokenServiceBindings,
  UserServiceBindings,
} from '../rbac';
import {
  RbacParams,
  RbacSubject,
  ROLES_REQUIRE_2FA,
  TokenParamsSchema,
  TokenProfile,
  UserStatus,
} from '../rbac/casbin-authorization';
import { UserCredentialRepository, UserInfoRepository } from '../repositories';

const speakeasy = require('speakeasy');
// Load variables defined in .env file into global environment
require('dotenv').config();

export class AuthController {
  constructor(
    @repository(UserInfoRepository)
    public userRepository: UserInfoRepository,
    @repository(UserCredentialRepository)
    public userCredentialRepository: UserCredentialRepository,
    @inject(UserServiceBindings.USER_SERVICE)
    public userService: MyUserService,
    @inject(TokenServiceBindings.TOKEN_SERVICE)
    public jwtService: JWTService
  ) {}

  @log(LOG_LEVEL.DEBUG, LOG_FORMAT.USER_ACTIVITY)
  @post('/api/auth/login', {
    responses: {
      '200': {
        description: 'Valid credential',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AuthResponse, {
              title: 'Authentication Response',
            }),
          },
        },
      },
    },
  })
  async login(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Credentials, {}),
        },
      },
    })
    credential: Credentials
  ): Promise<AuthResponse> {
    // We allow a secret admin account to set up the user database
    if (
      credential.username === process.env.SECRET_ID &&
      credential.password === process.env.SECRET_PW
    ) {
      const userInfo = new UserInfo({ id: 0 });
      const token = await this.userService.generateToken(
        userInfo,
        RbacSubject.Admin,
        RbacParams.Token.LogIn
      );
      const password_expiry = new Date(process.env.SECRET_PE ?? '3000-01-01');
      return new AuthResponse({
        token: token,
        passwordExpiry: password_expiry,
      });
    }

    // Return user info given credential is correct or throw error if invalid
    const userInfo = await this.userService.getUserInfo(
      undefined,
      credential,
      undefined
    );
    const userRole = await this.userService.getUserRole(userInfo.id);
    const userCredential = await this.userService.getUserCredential(
      userInfo.id
    );

    // If the user role is subjected to Two-Factor Authentication (2FA)
    if (ROLES_REQUIRE_2FA.includes(userRole)) {
      const otpCode = await this.generateOtp(userInfo.id);

      // TODO: Find a way to send this OTP to User
      console.log(`OTP code is: ${otpCode}`);
      // -----------------------------------------

      this.updateUserOtp(userCredential.id, otpCode);
      return new AuthResponse({ message: MESSAGE.OTP.REQUIRED });
    }

    // At this point the user does not need 2FA
    await this.updateAccountStatus(userCredential.id, UserStatus.Active);
    const token = await this.getToken(
      userInfo,
      userRole,
      RbacParams.Token.LogIn
    );
    return new AuthResponse({
      token: token,
      passwordExpiry: userCredential.passwordExpiry,
    });
  }

  @log(LOG_LEVEL.DEBUG, LOG_FORMAT.USER_ACTIVITY)
  @post('/api/auth/login/verify-otp', {
    responses: {
      '200': {
        description: 'Valid Otp credential',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AuthResponse, {}),
          },
        },
      },
    },
  })
  async verifyLoginOtp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtpCredential, {}),
        },
      },
    })
    request: OtpCredential
  ): Promise<AuthResponse> {
    const userInfo = await this.userService.getUserInfo(
      request.username,
      undefined,
      undefined
    );
    const userRole = await this.userService.getUserRole(userInfo.id);
    const userCredential = await this.userService.getUserCredential(
      userInfo.id
    );

    await this.verifyOtp(userCredential, request.otpCode);

    // At this point the user completed 2FA
    await this.updateAccountStatus(userCredential.id, UserStatus.Active);
    const token = await this.getToken(
      userInfo,
      userRole,
      RbacParams.Token.LogIn
    );
    return new AuthResponse({
      token: token,
      passwordExpiry: userCredential.passwordExpiry,
    });
  }

  @log(LOG_LEVEL.DEBUG, LOG_FORMAT.USER_ACTIVITY)
  @post('/api/auth/reset-pass/request', {
    responses: {
      '200': {
        description: 'Valid Reset Password Request',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AuthResponse, {}),
          },
        },
      },
    },
  })
  async verifyResetPassRequest(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetPassCredentials, {}),
        },
      },
    })
    request: ResetPassCredentials
  ): Promise<AuthResponse> {
    // Reject request if the user profile does not exist
    const userInfo = await this.userService.getUserInfo(
      undefined,
      undefined,
      request
    );
    const userCredential = await this.userService.getUserCredential(
      userInfo.id
    );
    const otpCode = await this.generateOtp(userInfo.id);

    // TODO: Find a way to send this OTP to User
    console.log(`OTP code is: ${otpCode}`);
    // -----------------------------------------

    this.updateUserOtp(userCredential.id, otpCode);
    return new AuthResponse({ message: MESSAGE.OTP.REQUIRED });
  }

  @log(LOG_LEVEL.DEBUG, LOG_FORMAT.USER_ACTIVITY)
  @post('/api/auth/reset-pass/verify-otp', {
    responses: {
      '200': {
        description: 'Valid Otp Credential',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AuthResponse, {}),
          },
        },
      },
    },
  })
  async verifyResetPassOtp(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(OtpCredential, {}),
        },
      },
    })
    request: OtpCredential
  ): Promise<AuthResponse> {
    const userInfo = await this.userService.getUserInfo(
      request.username,
      undefined,
      undefined
    );
    const userRole = await this.userService.getUserRole(userInfo.id);
    const userCredential = await this.userService.getUserCredential(
      userInfo.id
    );

    await this.verifyOtp(userCredential, request.otpCode);

    // At this point the user completed 2FA. Server send Reset Pass Token which is used only for
    // reseting password
    const token = await this.getToken(
      userInfo,
      userRole,
      RbacParams.Token.ResetPass
    );
    return new AuthResponse({
      token: token,
      passwordExpiry: userCredential.passwordExpiry,
    });
  }

  @log(LOG_LEVEL.DEBUG, LOG_FORMAT.USER_ACTIVITY)
  @authenticate('jwt')
  @post('/api/auth/reset-pass', {
    responses: {
      '200': {
        description: 'Valid Reset Password',
        content: {
          'application/json': {
            schema: getModelSchemaRef(AuthResponse, {}),
          },
        },
      },
    },
  })
  async resetPass(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(NewPassword, {}),
        },
      },
    })
    request: NewPassword,
    @param.header.string('Authorization') authHeader: string
  ): Promise<AuthResponse> {
    const token = this.getTokenFromAuthHeader(authHeader);
    const tokenProfile = await this.getTokenProfileFromToken(token);
    const userCredential = await this.userService.getUserCredential(
      tokenProfile.userId
    );

    // Hash user password first before update password field in the database
    const password = await this.userService.hashPassword(request.password);

    // New password will expire in number of days e.g 90 days
    const passwordExpiry = new Date();
    passwordExpiry.setDate(
      passwordExpiry.getDate() + RbacParams.Password.Expires_In_Days
    );

    await this.userService.updateUserCredential(userCredential.id, {
      password,
      passwordExpiry,
      passwordSubmissions: RbacParams.Password.Max_Submissions,
    });

    return new AuthResponse({ message: MESSAGE.PASSWORD.CHANGED });
  }

  async verifyOtp(
    userCredential: UserCredential,
    otpCode: string
  ): Promise<void> {
    // This secret code is used for automated testing during development
    // In production, please remove OTP_SECRET from the environment
    if (process.env.OTP_SECRET && otpCode === process.env.OTP_SECRET) {
      return;
    }

    // Ensure OTP does not expire and the number of tries is positive
    if (
      new Date() > userCredential.otpExpiry ||
      userCredential.otpSubmissions <= 0
    ) {
      throw new HttpErrors.Unauthorized(MESSAGE.OTP.EXPIRES);
    }

    // Reduce the number of Otp submissions
    await this.userCredentialRepository.updateById(userCredential.id, {
      otpSubmissions: userCredential.otpSubmissions - 1,
    });

    // Check if submitted OTP code matches the reference
    if (otpCode !== userCredential.otpCode) {
      // Reduce number of remaining tries
      throw new HttpErrors.Unauthorized(MESSAGE.OTP.INVALID);
    }
  }

  generateOtp(userId: number): string {
    const otpCode = speakeasy.totp({
      secret: process.env.TWOFA_SECRET ?? '' + userId,
    });

    return otpCode;
  }

  async getTokenProfileFromToken(token: string): Promise<TokenProfile> {
    const tokenProfile = await this.jwtService.getTokenProfile(token);
    return tokenProfile;
  }

  getTokenFromAuthHeader(authHeader: string): string {
    return authHeader.split(' ')[1];
  }

  async updateAccountStatus(id: number, status: UserStatus): Promise<void> {
    await this.userRepository.updateById(id, { status });
  }

  async getToken(
    userInfo: UserInfo,
    userRole: string,
    tokenType: TokenParamsSchema
  ): Promise<string> {
    return this.userService.generateToken(userInfo, userRole, tokenType);
  }

  async updateUserOtp(
    userCredentialId: number,
    otpCode: string
  ): Promise<void> {
    // Set OTP expire time in minutes
    const otpExpiry = new Date();
    otpExpiry.setMinutes(
      otpExpiry.getMinutes() + RbacParams.Otp.Expires_In_Minutes
    );

    // Save otpCode, its expiry date and number of remaining tries
    await this.userCredentialRepository.updateById(userCredentialId, {
      otpCode: otpCode,
      otpSubmissions: RbacParams.Otp.Max_Submissions,
      otpExpiry: otpExpiry,
    });
  }
}
