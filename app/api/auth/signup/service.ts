//
import { BaseService } from "@/app/api/services/base.service";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { Role } from "@/lib/enum";

interface AddressesData {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}
interface SignupData {
  Email: string;
  Password: string;
  Username: string;
  FirstName: string;
  LastName: string;
  Role: string;
  addresses: AddressesData[];
}

export class SignupService extends BaseService {
  async createUser(data: SignupData) {
    const hashedPassword = await bcrypt.hash(data.Password, 10);

    const userData: Prisma.UserCreateInput = {
      Email: data.Email,
      PasswordHash: hashedPassword,
      Role: (data.Role as Role) || "USER",
      Username: data.Username,
      FirstName: data.FirstName,
      LastName: data.LastName,
      CreatedAt: new Date(),
      IsDeleted: false,
      IsActive: false,
    };
    const user = await prisma.user.create({
      data: userData,
      select: {
        UserId: true,
        Email: true,
      },
    });
    let _addresses: AddressesData[] = data.addresses;

    const address = await prisma.address.createMany({
      data: _addresses.map((address) => ({
        userId: user.UserId,
        street: address.street,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      })),
    });

    return { user, address };
  }
}
