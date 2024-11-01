// controllers/signup.controller.ts
import { NextRequest } from "next/server";
import { BaseController } from "@/app/api/controllers/base.controller";
import { SigninService } from "./signin.service";

interface SigninRequestBody {
  email: string;
  password: string;
}

export class SigninController extends BaseController {
  [x: string]: any;
  private service: SigninService;

  constructor() {
    super();
    this.service = new SigninService();
  }

  async signin(request: NextRequest) {
    try {
      const body: SigninRequestBody = await this.parseBody(request);
      const { email, password } = body;

      if (!email || !password) {
        return this.sendError(
          new Error("Email and password are required"),
          400
        );
      }
      const user = await this.service.findUser({ email, password });
      return this.sendSuccess(user, "User signed in successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
