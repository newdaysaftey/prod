import { BaseController } from "@/app/api/controllers/base.controller";
import { OTPServiceImplementation } from "./service";

interface OtpRequestBody {
  email: string;
  otp: string;
}

export class OtpController extends BaseController {
  [x: string]: any;
  private service: OTPServiceImplementation;

  constructor() {
    super();
    this.service = new OTPServiceImplementation();
  }

  async generateOTP(email: string) {
    try {
      // const { email } ;
      const response = await this.service.generateOTP(email);

      return this.sendSuccess(response);
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async verifyOtp(body: OtpRequestBody) {
    try {
      const { email, otp } = body;
      const user = await this.service.verifyOTP(email, otp);

      if (!user) {
        throw new Error("Authentication failed && invalid OTP");
      }
      const response = this.sendSuccess(user.user, "verified succesfully");
      response.cookies.set({
        name: "authToken",
        value: user.token,
        httpOnly: true,
        path: "/",
        maxAge: 3600000, // 1 hour in seconds
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      return response;
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
