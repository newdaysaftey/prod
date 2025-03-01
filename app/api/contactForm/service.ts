import { BaseService } from "@/app/api/services/base.service";
import { ContactFormData } from "@/app/types/global";
import nodemailer from "nodemailer";

export class ContactFormService extends BaseService {
  private transporter: nodemailer.Transporter;

  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendContactFormEmail(data: ContactFormData) {
    const emailContent = `
     New Contact Form Submission for ${data.orderType} order
     
     Name: ${data.firstName} ${data.lastName}
     Email: ${data.email}
     Phone: ${data.phoneNumber}
     Region: ${data.region}
     Order Type: ${data.orderType}
     Message: ${data.message}
   `;

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form - ${data.orderType} Order`,
      text: emailContent,
    };

    return this.transporter.sendMail(mailOptions);
  }
}
