import { Injectable } from '@nestjs/common';
import * as firebaseAdmin from 'firebase-admin';
import {
  OtpExpireException,
  OtpInvalidException,
} from 'src/shares/exceptions/otp.exception';
import { v4 as uuidv4 } from 'uuid';
import { ConfigurationService } from '../configuration/configuration.service';
import { MailService } from '../mail/mail.service';
import { SendOtpDto } from './dto/send-otp.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';

@Injectable()
export class OtpService {
  private readonly firebaseApp: firebaseAdmin.app.App;
  constructor(
    private readonly configurationService: ConfigurationService,
    private readonly mailService: MailService,
  ) {
    this.firebaseApp = firebaseAdmin.initializeApp(
      {
        credential: firebaseAdmin.credential.cert(
          this.configurationService.getFirebaseAccountKey(),
        ),
        databaseURL: configurationService.getFirebaseDbUrl(),
      },
      'Task Management',
    );
  }

  generateOTP() {
    const otpLength = 6;
    let otp = '';

    for (let i = 0; i < otpLength; i++) {
      otp += Math.floor(Math.random() * 10);
    }

    //To do: Set expire time in system config
    return {
      otp,
      expireAt: new Date(new Date().getTime() + 5 * 60 * 1000),
    };
  }

  async checkOtpExist(uid: string): Promise<boolean> {
    try {
      await this.firebaseApp.auth().getUser(uid);
      return true;
    } catch (error) {
      return false;
    }
  }

  async createNewOtp(uid: string, contact: string) {
    const userObj: any = { email: contact };
    try {
      const user = await this.firebaseApp.auth().getUserByEmail(contact);
      await this.firebaseApp.auth().deleteUser(user.uid);
    } catch (error) {}
    return await this.firebaseApp.auth().createUser({ uid, ...userObj });
  }

  async sendOtp(sendOtpDto: SendOtpDto) {
    const { contact } = sendOtpDto;
    const uid = uuidv4();
    await this.createNewOtp(uid, contact);
    const { otp, expireAt } = this.generateOTP();

    //To do: Set expire time in system config
    await this.firebaseApp
      .database()
      .ref('users/' + uid)
      .update({ otp, expireAt });

    await this.mailService.sendMail(contact, 'Verify Otp', 'verifyDriver', {
      otp,
      name: contact,
      sign: 'Task Management',
      AppName: 'Task Management',
    });
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto) {
    const { contact, otp } = verifyOtpDto;
    const user = await this.firebaseApp.auth().getUserByEmail(contact);
    const ref = this.firebaseApp.database().ref('users/' + user.uid);
    ref.on('value', (snapshot) => {
      ref.off();
      const user = snapshot.val();
      if (user.expireAt < new Date()) {
        throw new OtpExpireException();
      }
      if (user.otp !== otp) {
        throw new OtpInvalidException();
      }
    });
    await this.firebaseApp.auth().deleteUser(user.uid);
    // To do: Return a tokens
  }
}
