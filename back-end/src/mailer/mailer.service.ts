import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MailerService {

    transport()
    {
        return nodemailer.createTransport(
        {
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports
            service:'gmail',
            auth: {
                user: "polovniracunari3@gmail.com",
                pass: "typnenhrvhhzocdk",
            }
        })
    }

    send(reciver:string, token:string, name:string)
    {
        this.transport().sendMail(
            {
                from: '"Momcilo Marjanovic" <admin@padelverse.com>',
                to: `${reciver}`,
                subject: "Welcome to PadelVerse",
                text: "Hello world?",
                html: `Hello ${name.toUpperCase()} <br> Plase confirm your registration at this link https://localhost:3000/confirmRegistration/${token} </b>`, // HTML body
            }
        )
    }
}
