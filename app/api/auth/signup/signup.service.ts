// services/signup.service.ts
import { BaseService } from "@/app/api/services/base.service";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { Role } from "@/lib/enum";

interface SignupData {
  Email: string;
  Password: string;
  Username: string;
  FirstName: string;
  LastName: string;
  Role: string;
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
        Disabled: false,
        CreatedOn: new Date(),
        ModifiedOn: new Date(),
      },
    });

    return user.Email;
  }
}
