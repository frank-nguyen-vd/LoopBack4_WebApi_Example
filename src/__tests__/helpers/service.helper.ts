import _ from 'lodash';
import { NewUserRequest } from '../../controllers';
import {
  AgvJob,
  AgvStation,
  ButtonInfo,
  ButtonJob,
  CollectionWorkflow,
  CollectionWorkflowInfo,
  Credentials,
  CremationWorkflow,
  CremationWorkflowInfo,
  CrematorInfo,
  CrematorJob,
  DeceasedInfo,
  EPaperInfo,
  EPaperJob,
  GroupInfo,
  HearthInfo,
  LockerInfo,
  LockerJob,
  OneIlsToPcms,
  OtpCredential,
  ParkingBayInfo,
  PrinterInfo,
  PrinterJob,
  PrintingHistory,
  RecipientInfo,
  ResetPassCredentials,
  RoomInfo,
  RoomJob,
  ScannerInfo,
  ScannerJob,
  SystemSetting,
  TvInfo,
  UserCredential,
  UserInfo,
} from '../../models';

require('dotenv').config();

export namespace Helpers {
  export const firstName = 'John';
  export const lastName = 'Parker';
  export const username = 'G00112233T';
  export const staffId = 'G00112233T';
  export const password = 'secret1234';
  export const hashedPassword = 'hashedSecret';
  export const contactNumber = '80009000';
  export const otpCode = process.env.OTP_SECRET ?? '';
  export const token = 'newToken';

  export function newUserRequest(
    data?: Partial<NewUserRequest>
  ): NewUserRequest {
    const request = Object.assign(
      {
        firstName: firstName,
        lastName: lastName,
        staffId: staffId,
        username: username,
        password: password,
        contactNumber: contactNumber,
        groupId: 1,
      },
      data
    );
    return new NewUserRequest(request);
  }

  export function newUserInfo(data?: Partial<UserInfo>): UserInfo {
    const newUser = Object.assign(_.omit(newUserRequest(), 'password'), data);
    return new UserInfo(newUser);
  }

  export function newUserCredential(
    data?: Partial<UserCredential>
  ): UserCredential {
    const userCredential = Object.assign(
      {
        id: 1,
        password,
        otpCode,
      },
      data
    );
    return new UserCredential(userCredential);
  }

  export function newCredential(data?: Partial<UserInfo>): Credentials {
    const credential = Object.assign(
      { username: username, password: password },
      data
    );
    return new Credentials(credential);
  }

  export function newOtpCredential(
    data?: Partial<OtpCredential>
  ): OtpCredential {
    const credential = Object.assign(
      { username: username, otpCode: otpCode },
      data
    );
    return new OtpCredential(credential);
  }

  export function newResetPassRequest(
    data?: Partial<ResetPassCredentials>
  ): ResetPassCredentials {
    const credential = Object.assign(
      { username: username, contactNumber: contactNumber },
      data
    );
    return new ResetPassCredentials(credential);
  }

  export function newCrematorJob(
    data?: Partial<CrematorJob>
  ): Partial<CrematorJob> {
    return Object.assign(
      {
        status: 'WTP',
        createdDateTime: '29/09/2020',
        statusDateTime: '29/09/2020',
        completionDateTime: '29/09/2020',
        crematorId: 1,
        cremationWorkflowId: 1,
        errorCode: 1,
        errorDescription: 'NONE',
      },
      data
    );
  }

  export function newCrematorInfo(data?: Partial<CrematorInfo>): CrematorInfo {
    const newItem = Object.assign(
      {
        status: 'WTP',
        crematorNumber: 'L1-01',
        isUsed: true,
        hearthId: 1,
      },
      data
    );
    return new CrematorInfo(newItem);
  }

  export function newCremationWorkflow(
    data?: Partial<CremationWorkflow>
  ): Partial<CremationWorkflow> {
    return Object.assign(
      {
        workflowInfoId: 1,
        status: 'WTP',
        createdDateTime: '1/1/2020',
        statusDateTime: '1/1/2020',
        completionDateTime: '1/1/2020',
        jobSteps: '5',
        currentStep: '1',
        errorCode: 1,
        errorDescription: 'NONE',
      },
      data
    );
  }

  export function newCremationWorkflowInfo(
    data?: Partial<CremationWorkflowInfo>
  ): Partial<CremationWorkflowInfo> {
    return Object.assign(
      {
        deceasedId: 1,
        serviceHallId: 1,
        transferHallId: 1,
        insertionChamberId: 1,
        coolingChamberId: 1,
        crematorId: 1,
        hearthCremainId: 1,
        qrCode: 'qr code',
        dateOfService: '01/10/2019',
        timeOfService: '11:12',
        serviceHallNumber: '1',
        crematorNumber: '1',
        bookingStatus: 'Pending',
        oneIlsToPcmsId: 1,
      },
      data
    );
  }

  export function newUserGroup(data?: Partial<GroupInfo>): Partial<GroupInfo> {
    return Object.assign(
      {
        name: 'administrator',
        alias: 'admin',
      },
      data
    );
  }

  export function newEPaper(data?: Partial<EPaperInfo>): Partial<EPaperInfo> {
    return Object.assign(
      {
        status: 'WTP',
        location: 'B2-01',
        data: '{name: Ali}',
      },
      data
    );
  }

  export function newEPaperJob(data?: Partial<EPaperJob>): Partial<EPaperJob> {
    return Object.assign(
      {
        status: 'WTP',
        createdDateTime: '29/09/2020',
        statusDateTime: '29/09/2020',
        completionDateTime: '29/09/2020',
        ePaperId: 1,
        cremationWorkflowId: 1,
        errorCode: 1,
        errorDescription: 'None',
      },
      data
    );
  }

  export function newIlsRecord(
    data?: Partial<OneIlsToPcms>
  ): Partial<OneIlsToPcms> {
    return Object.assign(
      {
        deceasedName: 'Nikita Foosball',
        dateOfDeath: '29/09/2020',
        deathCertNumber: 'CERT-10129-113',
        cremationPermitNumber: 'PERMIT/2020-1012-12',
        qrCodeApplicationCremation: 'QR CODE',
        deceasedReligion: 'SOLARIS',
        deceasedAge: 1001,
        dateOfService: '1/2/2022',
        timeOfService: '13:00',
        serviceHallNumber: '1',
        crematorNumber: '1',
        isSelfPicked: true,
        isPulverized: true,
        qrCodeCollectionCrematedRemains: 'QR CODE',
        dateOfCollection: '1/1/2023',
        timeOfCollection: '13:00',
        bookingStatus: 'Pending',
      },
      data
    );
  }

  export function newDeceasedInfo(
    data?: Partial<DeceasedInfo>
  ): Partial<DeceasedInfo> {
    return Object.assign(
      {
        name: 'Nikita Foosball',
        dateOfDeath: '29/09/2020',
        cremationDateTime: '29/09/2020',
        religion: 'SOLARIS',
        cremationPermitNumber: 'PERMIT/2020-1012-12',
        deathCertNumber: 'CERT-10129-113',
        age: 1001,
        causeOfDeath: 'Natural',
        oneIlsToPcmsId: 1,
        status: 'NONE',
        remark: 'NONE',
      },
      data
    );
  }

  export function newHearthInfo(
    data?: Partial<HearthInfo>
  ): Partial<HearthInfo> {
    return Object.assign(
      {
        status: 'READY',
        location: 'B2-02',
        isUsed: false,
        deceasedId: 1,
      },
      data
    );
  }

  export function newAgvJob(data?: Partial<AgvJob>): Partial<AgvJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '01/02/2020',
        statusDateTime: '01/02/2020',
        completionDateTime: '01/02/2020',
        ownerKey: 'default',
        relateKey: 'default',
        order: 'default',
        orderDetail: 'default',
        destination1: 'default',
        height1: 'default',
        destination2: 'default',
        height2: 'default',
        priority: 'default',
        carrierNumber: 'default',
        cremationWorkflowId: 1,
        collectionWorkflowId: 1,
        errorCode: 0,
        errorDescription: 'NONE',
      },
      data
    );
  }

  export function newPrinterJob(
    data?: Partial<PrinterJob>
  ): Partial<PrinterJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '01/02/2020',
        statusDateTime: '01/02/2020',
        completionDateTime: '01/02/2020',
        userId: 1,
        printerId: 1,
        collectionWorkflowId: 1,
        isBigLocker: true,
        errorCode: 0,
        errorDescription: 'NONE',
      },
      data
    );
  }

  export function newScannerJob(
    data?: Partial<ScannerJob>
  ): Partial<ScannerJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '01/02/2020',
        statusDateTime: '01/02/2020',
        completionDateTime: '01/02/2020',
        scannerId: 1,
        cremationWorkflowId: 1,
        collectionWorkflowId: 1,
        errorCode: 0,
        errorDescription: 'NONE',
      },
      data
    );
  }
  export function newPrinterInfo(
    data?: Partial<PrinterInfo>
  ): Partial<PrinterInfo> {
    return Object.assign(
      {
        status: 'READY',
        location: 'B2-01',
        isUsed: false,
      },
      data
    );
  }

  export function newScannerInfo(
    data?: Partial<ScannerInfo>
  ): Partial<ScannerInfo> {
    return Object.assign(
      {
        status: 'READY',
        location: 'B2-01',
        isUsed: false,
      },
      data
    );
  }

  export function newCollectionWorkflow(
    data?: Partial<CollectionWorkflow>
  ): Partial<CollectionWorkflow> {
    return Object.assign(
      {
        workflowInfoId: 1,
        status: 'WTP',
        createdDateTime: '29/09/2020',
        statusDateTime: '29/09/2020',
        completionDateTime: '29/09/2020',
        jobSteps: '1',
        currentStep: '1',
        errorCode: 1,
        errorDescription: 'None',
      },
      data
    );
  }

  export function newCollectionWorkflowInfo(
    data?: Partial<CollectionWorkflowInfo>
  ): Partial<CollectionWorkflowInfo> {
    return Object.assign(
      {
        deceasedId: 1,
        recipientId: 1,
        scenario: 1,
        crematorNumber: '1',
        hearthCremainId: 1,
        hearthEmpty1Id: 1,
        hearthEmpty2Id: 1,
        lockerId: 1,
        roomId: 1,
        pulverization: true,
        qrCode: 'qr code',
        dateOfCollection: '01/10/2019',
        timeOfCollection: '11:12',
        bookingStatus: 'Pending',
        oneIlsToPcmsId: 1,
      },
      data
    );
  }

  export function newOneIlsToPcms(
    data?: Partial<OneIlsToPcms>
  ): Partial<OneIlsToPcms> {
    return Object.assign(
      {
        deceasedName: 'Nikita Foosball',
        dateOfDeath: '29/09/2020',
        deathCertNumber: 'CERT-10129-113',
        cremationPermitNumber: 'PERMIT/2020-1012-12',
        qrCodeApplicationCremation: 'QR CODE',
        deceasedReligion: 'SOLARIS',
        deceasedAge: 1001,
        dateOfService: '1/2/2022',
        timeOfService: '13:00',
        serviceHallNumber: '1',
        crematorNumber: '1',
        isSelfPicked: true,
        isPulverized: true,
        qrCodeCollectionCrematedRemains: 'QR CODE',
        dateOfCollection: '1/1/2023',
        timeOfCollection: '13:00',
        bookingStatus: 'Pending',
      },
      data
    );
  }

  export function newParkingBayInfo(
    data?: Partial<ParkingBayInfo>
  ): Partial<ParkingBayInfo> {
    return Object.assign(
      {
        status: 'READY',
        level: 'B2',
        unitNumber: '02',
        hearthId: 1,
        isUsed: false,
        isPriority: false,
      },
      data
    );
  }

  export function newRecipientInfo(
    data?: Partial<RecipientInfo>
  ): Partial<RecipientInfo> {
    return Object.assign(
      {
        name: 'Phil Roadster',
        identityNumber: 'S644567',
        contactNumber: '97473123',
        email: 'phil.roadster@hopetechnik.com',
        relationship: 'son of deceased',
      },
      data
    );
  }

  export function newLockerInfo(
    data?: Partial<LockerInfo>
  ): Partial<LockerInfo> {
    return Object.assign(
      {
        status: 'READY',
        lockerNumber: '1',
        isUsed: false,
        isFrontDoorOpen: false,
        isRearDoorOpen: false,
      },
      data
    );
  }

  export function newRoomInfo(data?: Partial<RoomInfo>): Partial<RoomInfo> {
    return Object.assign(
      {
        status: 'READY',
        roomNumber: '1',
        isUsed: false,
      },
      data
    );
  }

  export function newPrintingHistory(
    data?: Partial<PrintingHistory>
  ): Partial<PrintingHistory> {
    return Object.assign(
      {
        deceasedName: 'Li Hao',
        religion: 'SOLARIS',
        serviceHallNumber: '1',
        crematorNumber: '1',
        cremationDateTime: '01/10/2020',
        staffId: 'S77397493',
        staffName: 'Shabu Shabu',
        remarks: 'None',
        printerJobId: 1,
      },
      data
    );
  }

  export function newButtonInfo(
    data?: Partial<ButtonInfo>
  ): Partial<ButtonInfo> {
    return Object.assign(
      {
        status: 'READY',
        location: 'B2-10',
        isUsed: false,
      },
      data
    );
  }

  export function newButtonJob(data?: Partial<ButtonJob>): Partial<ButtonJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '10/10/2020',
        statusDateTime: '01/10/2020',
        completionDateTime: '18/10/2020',
        buttonId: 1,
        collectionWorkflowId: 1,
        errorCode: 1,
        errorDescription: 'None',
      },
      data
    );
  }

  export function newRoomJob(data?: Partial<RoomJob>): Partial<RoomJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '01/01/2018',
        statusDateTime: '01/02/2018',
        completionDateTime: '01/02/2018',
        roomId: 1,
        collectionWorkflowId: 1,
        queueNumber: '001',
        errorCode: 1,
        errorDescription: 'None',
      },
      data
    );
  }

  export function newLockerJob(data?: Partial<LockerJob>): Partial<LockerJob> {
    return Object.assign(
      {
        status: 'READY',
        createdDateTime: '10/10/2020',
        statusDateTime: '01/10/2020',
        completionDateTime: '18/10/2020',
        lockerId: 1,
        collectionWorkflowId: 1,
        queueNumber: '001',
        errorCode: 1,
        errorDescription: 'None',
      },
      data
    );
  }

  export function newAgvStation(
    data?: Partial<AgvStation>
  ): Partial<AgvStation> {
    return Object.assign(
      {
        status: 'READY',
        location: '02-01',
        stationNumber: '001',
      },
      data
    );
  }

  export function newTvInfo(data?: Partial<TvInfo>): Partial<TvInfo> {
    return Object.assign(
      {
        status: 'READY',
        location: '02-01',
        data: 'data',
      },
      data
    );
  }

  export function newSystemSetting(
    data?: Partial<SystemSetting>
  ): Partial<SystemSetting> {
    return Object.assign(
      {
        transferJobTimeout: 1000,
        agvJobTimeout: 1000,
        loginTimeout: 1000,
        scannerTimeout: 1000,
        printerTimeout: 1000,
      },
      data
    );
  }

  export function newGroupInfo(data?: Partial<GroupInfo>): GroupInfo {
    return new GroupInfo(
      Object.assign(
        {
          name: 'Administrator',
          alias: 'admin',
          numberOfMembers: 100,
          accessLevelId: 1,
        },
        data
      )
    );
  }
}
