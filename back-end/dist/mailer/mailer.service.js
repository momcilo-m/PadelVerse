"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer = __importStar(require("nodemailer"));
let MailerService = class MailerService {
    configService;
    email;
    email_key;
    front;
    constructor(configService) {
        this.configService = configService;
        this.email = this.configService.get("EMAIL");
        this.email_key = this.configService.get("EMAIL_KEY");
        this.front = this.configService.get("FRONT");
    }
    transport() {
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            service: 'gmail',
            auth: {
                user: this.email,
                pass: this.email_key,
            }
        });
    }
    confirmRegistration(receiver, token, name) {
        const subject = "Confirm Your PadelVerse Registration";
        const text = `Hello ${name},

        Thank you for registering at PadelVerse!

        Please confirm your registration by clicking the link below:
        ${this.front}/confirmRegistration/${token}

        If you did not register, please ignore this email.

        Best regards,
        The PadelVerse Team`;
        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; text-align: center;">
                <img src="https://i.imgur.com/vKCYjUz.png" 
                    alt="PadelVerse Logo" 
                    style="width: 100px; height: 100px; border-radius: 50%; display: block; margin: 0 auto 20px;">

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
};
exports.MailerService = MailerService;
exports.MailerService = MailerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MailerService);
//# sourceMappingURL=mailer.service.js.map