import { authenticator } from "otplib"; // Importing OTP library
import nodemailer from "nodemailer";
import { randomBytes } from "crypto";
import prisma from "@/lib/prisma";
import jwt from "jsonwebtoken";

export class OTPServiceImplementation {
  private otpCache: Map<string, { otp: string; expiresAt: number }> = new Map();
  private otpExpiryTime = 5 * 60 * 1000; // 5 minutes expiry
  private JWT_SECRET = process.env.JWT_SECRET as string;

  // Generate OTP
  async generateOTP(email: string): Promise<string> {
    const otp = authenticator.generate(randomBytes(10).toString("hex"));
    const expiresAt = Date.now() + this.otpExpiryTime;

    // Store OTP with expiration
    this.otpCache.set(email, { otp, expiresAt });

    // Send OTP email
    await this.sendOTPEmail(email, otp);
    return otp;
  }

  // Verify OTP
  async verifyOTP(email: string, otp: string) {
    const cachedOTP = this.otpCache.get(email);
    // console.log(cachedOTP);

    if (!cachedOTP) {
      return false;
    }

    const { otp: correctOTP, expiresAt } = cachedOTP;

    // Check if OTP is expired
    if (Date.now() > expiresAt) {
      this.otpCache.delete(email); // Delete expired OTP
      return false;
    }

    // Verify the OTP
    if (otp === correctOTP) {
      const user = await prisma.user.findFirst({
        where: {
          Email: email,
        },
        select: {
          UserId: true,
          Email: true,
          Role: true,
        },
      });
      if (!user) {
        throw new Error("User not found, please signup");
      }

      const token = jwt.sign(
        { UserId: user.UserId, Email: user.Email, Role: user.Role },
        this.JWT_SECRET,
        { expiresIn: "1h" }
      );
      return { user, token };
    } else {
      throw new Error("Invalid OTP");
    }
  }

  // Send OTP via email
  public async sendOTPEmail(email: string, otp: string): Promise<void> {
    // console.log(email);
    // Make this public
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "rajula0b9@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "rajula0b9@gmail.com",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It will expire in 5 minutes.`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending OTP email:", error);
    }
  }
}
