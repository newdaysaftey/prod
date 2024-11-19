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
      const response = await this.service.verifyOTP(email, otp);

      if (response === true) {
        return this.sendSuccess("verified succesfully");
      } else {
        throw new Error("Error Verifying Otp");
      }
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
