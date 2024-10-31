// controllers/signup.controller.ts
import { NextRequest } from "next/server";
import { BaseController } from "../../controllers/base.controller";
import { SignupService } from "./signup.service";

interface SignupRequestBody {
  email: string;
  password: string;
}

export class SignupController extends BaseController {
  [x: string]: any;
  private service: SignupService;

  constructor() {
    super();
    this.service = new SignupService();
  }

  async signup(request: NextRequest) {
    try {
      // const body: SignupRequestBody = await this.parseBody(request);
      // const { email, password } = body;

      // if (!email || !password) {
      //   return this.sendError(
      //     new Error("Email and password are required"),
      //     400
      //   );
      // }
      console.log(Object.keys(request));

      // const user = await this.service.createUser({ email, password });
      // return this.sendSuccess(user, "User created successfully");
      return this.sendSuccess("hello");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
