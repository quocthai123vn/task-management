import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';

Injectable();
export class ConfigurationService {
  private readonly firebaseAccountKey: any;
  constructor() {
    this.firebaseAccountKey = this.getSettingData('firebase-account-key.json');
  }
  getSettingData(fileName: string) {
    const file = resolve(__dirname, 'settings', fileName);
    return JSON.parse(readFileSync(file, 'utf-8'));
  }
  getFirebaseAccountKey() {
    return this.firebaseAccountKey;
  }
  getSMTPConfig() {
    return {
      host: process.env.MAIL_HOST || 'smtp.gmail.com',
      port: process.env.MAIL_PORT || 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER || '',
        pass: process.env.MAIL_PASSWORD || '',
      },
    };
  }
  getFirebaseDbUrl() {
    return process.env.FIREBASE_STORAGE_BASE_URL || '';
  }
  getAdminEmail() {
    return process.env.ADMIN_EMAIL || '';
  }
}
