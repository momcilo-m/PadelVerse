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
        this.front = this.configService.get<string>("front")!;
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

    send(reciver: string, token: string, name: string) {
        this.transport().sendMail(
            {
                from: '"Momcilo Marjanovic" <admin@padelverse.com>',
                to: `${reciver}`,
                subject: "Welcome to PadelVerse",
                text: "Hello world?",
                html: `Hello ${name.toUpperCase()} <br> Plase confirm your registration at this link ${this.front}/confirmRegistration/${token} </b>`,
            }
        )
    }
}
