import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
export declare class MailerService {
    private configService;
    private readonly email;
    private readonly email_key;
    private readonly front;
    constructor(configService: ConfigService);
    transport(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    confirmRegistration(receiver: string, token: string, name: string): void;
}
