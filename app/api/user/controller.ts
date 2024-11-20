import { BaseController } from "@/app/api/controllers/base.controller";
import { UserService } from "./service";
import { Gender } from "@/app/types/global";

interface AddressesBody {
  id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  firstName?: string;
  lastName?: string;
  isDeleted?: boolean;
  isDefault?: boolean;
}

interface updateProfileBody {
  Password?: string;
  Username?: string;
  FirstName?: string;
  LastName?: string;
  MiddleName: string | null;
  Phone: number;
  Gender: Gender;
  CountryCode: string | null;
  ImageUrl: string;
  addresses: AddressesBody[];
}

export class UserController extends BaseController {
  [x: string]: any;
  private service: UserService;

  constructor() {
    super();
    this.service = new UserService();
  }

  async getProfile(UserId: string) {
    try {
      const user = await this.service.getProfile(UserId);
      return this.sendSuccess(user, "user details fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async updateProfile(UserId: string, data: updateProfileBody) {
    try {
      const user = await this.service.updateProfile(UserId, data);
      return this.sendSuccess(user, "user details Updated successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
