// services/signup.service.ts
import { BaseService } from "@/app/api/services/base.service";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
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
    const user = await prisma.user.create({
      data: {
        Email: data.Email,
        PasswordHash: hashedPassword,
        Role: (data.Role as Role) || "USER",
        Username: data.Username,
        FirstName: data.FirstName,
        LastName: data.LastName,
        IsActive: true,
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        addresses: data.addresses,
      },
    });

    return user.Email;
  }
}
