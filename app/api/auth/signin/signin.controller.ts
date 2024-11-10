import { BaseController } from "@/app/api/controllers/base.controller";
import { SigninService } from "./signin.service";

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
        throw new Error("Authentication failed");
      }

      const response = this.sendSuccess(user.user, "Signin successful");
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
