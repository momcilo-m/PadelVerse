import * as nodemailer from 'nodemailer';
export declare class MailerService {
    transport(): nodemailer.Transporter<import("nodemailer/lib/smtp-transport").SentMessageInfo, import("nodemailer/lib/smtp-transport").Options>;
    send(reciver: string, token: string, name: string): void;
}
