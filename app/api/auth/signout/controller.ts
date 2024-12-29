import { BaseController } from "@/app/api/controllers/base.controller";
import { SignoutService } from "./service";

interface SignoutRequestBody {
  Email: string;
  Password: string;
}

export class SignoutController extends BaseController {
  [x: string]: any;
  private service: SignoutService;

  constructor() {
    super();
    this.service = new SignoutService();
  }

  async signout(body: SignoutRequestBody) {
    try {
      const { Email, Password } = body as SignoutRequestBody;

      const user = await this.service.signout({ Email, Password });

      const response = this.sendSuccess(user, "Signin successful");
      response.cookies.delete({
        name: "authToken",
        httpOnly: true,
        path: "/",
        maxAge: 3600000, // 1 hour in seconds
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
      response.cookies.delete({
        name: "user",
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
