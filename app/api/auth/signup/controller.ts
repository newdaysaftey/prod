import { BaseController } from "@/app/api/controllers/base.controller";
import { SignupService } from "./service";

interface AddressesBody {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}
interface SignupRequestBody {
  Email: string;
  Password: string;
  Username: string;
  FirstName: string;
  LastName: string;
  Role: string;
  addresses: AddressesBody[];
}

export class SignupController extends BaseController {
  [x: string]: any;
  private service: SignupService;

  constructor() {
    super();
    this.service = new SignupService();
  }

  async signup(body: SignupRequestBody) {
    try {
      const {
        Email,
        Password,
        Username,
        FirstName,
        LastName,
        Role,
        addresses,
      } = body as SignupRequestBody;
      if (!Email || !Password) {
        return this.sendError(new Error("Email and password are required"));
      }
      const user = await this.service.createUser({
        Email,
        Password,
        Username,
        FirstName,
        LastName,
        Role,
        addresses,
      });
      return this.sendSuccess(user, "User created successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
