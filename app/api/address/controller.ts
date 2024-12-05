import { BaseController } from "@/app/api/controllers/base.controller";
import { AddressService } from "./service";
import { NextRequest } from "next/server";

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
  addresses: AddressesBody[];
}

export class AddressController extends BaseController {
  [x: string]: any;
  private service: AddressService;

  constructor() {
    super();
    this.service = new AddressService();
  }

  async updateAddress(UserId: string, data: updateProfileBody) {
    try {
      const user = await this.service.updateAddress(UserId, data);
      return this.sendSuccess(user, "Address details Updated successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async deleteAddress(UserId: string, request: NextRequest) {
    try {
      const searchParams = request.nextUrl.searchParams;
      const addressId = searchParams.get("addressId") || undefined;
      const user = await this.service.deleteAddress(UserId, addressId);
      return this.sendSuccess(user, "Address deleted successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }

  async getAddressess(UserId: string) {
    try {
      const user = await this.service.getAddressess(UserId);
      return this.sendSuccess(user, "Address fetched successfully");
    } catch (error) {
      return this.sendError(error as Error);
    }
  }
}
