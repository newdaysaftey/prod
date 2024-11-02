// controllers/signup.controller.ts
import { NextRequest, NextResponse } from "next/server";
import { BaseController } from "@/app/api/controllers/base.controller";
import { SigninService } from "./signin.service";
import {
  createResponse,
  successResponse,
  errorResponse,
} from "@/app/api/utils/response.util";

interface SigninRequestBody {
  Email: string;
  Password: string;
}

export class SigninController extends BaseController {
  [x: string]: any;
  private service: SigninService;

  constructor() {
    super();
    this.service = new SigninService();
  }

  async signin(body: SigninRequestBody) {
    try {
      const { Email, Password } = body as SigninRequestBody;

      const user = await this.service.findUser({ Email, Password });
      if (!user?.token) {
        return NextResponse.json(errorResponse("Authentication failed"));
      }

      const resp = NextResponse.json(
        successResponse("Signin successful", { user: user.user }),
        {
          status: 200,
          headers: {
            "Set-Cookie": `authToken=${
              user.token
            }; HttpOnly; Path=/; Max-Age=3600000${
              process.env.NODE_ENV === "production" ? "; Secure" : ""
            }`,
          },
        }
      );
      return resp;
    } catch (error) {
      return NextResponse.json(errorResponse("Internal server error"));
    }
  }
}
