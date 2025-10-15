import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {
    private readonly email: string;
    private readonly email_key: string
    private readonly front: string

    constructor(
        private configService: ConfigService
    ) {
        this.email = this.configService.get<string>("EMAIL")!;
        this.email_key = this.configService.get<string>("EMAIL_KEY")!;
        this.front = this.configService.get<string>("FRONT")!;
    }

    transport() {
        return nodemailer.createTransport(
            {
                host: "smtp.gmail.com",
                port: 587,
                secure: false,
                service: 'gmail',
                auth: {
                    user: this.email,
                    pass: this.email_key,
                }
            })
    }

    // send(reciver: string, token: string, name: string) {
    //     this.transport().sendMail(
    //         {
    //             from: '"Momcilo Marjanovic" <admin@padelverse.com>',
    //             to: `${reciver}`,
    //             subject: "Welcome to PadelVerse",
    //             text: "Hello world?",
    //             html: `Hello ${name.toUpperCase()} <br> Plase confirm your registration at this link ${this.front}/confirmRegistration/${token} </b>`,
    //         }
    //     )
    // }

    confirmRegistration(receiver: string, token: string, name: string) {
        const subject = "Confirm Your PadelVerse Registration";
        const text = `Hello ${name},

        Thank you for registering at PadelVerse!

        Please confirm your registration by clicking the link below:
        ${this.front}/confirmRegistration/${token}

        If you did not register, please ignore this email.

        Best regards,
        The PadelVerse Team`;

        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #2E86C1;">Welcome to PadelVerse, ${name.toUpperCase()}!</h2>
                <p>Thank you for signing up. To complete your registration, please confirm your email by clicking the button below:</p>
                <a href="${this.front}/confirmRegistration/${token}" 
                style="display: inline-block; padding: 12px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #2E86C1; text-decoration: none; border-radius: 5px;">
                Confirm Registration
                </a>
                <p>If you did not register, you can safely ignore this email.</p>
                <p>Best regards,<br>The PadelVerse Team</p>
            </div>
        `;

        this.transport().sendMail({
            from: '"PadelVerse Team" <admin@padelverse.com>',
            to: receiver,
            subject: subject,
            text: text,
            html: html,
        });
    }
}
