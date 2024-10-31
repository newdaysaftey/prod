// services/signup.service.ts
import { BaseService } from "../../services/base.service";
import bcrypt from "bcrypt";

interface SignupData {
  email: string;
  password: string;
}

export class SignupService extends BaseService {
  async createUser(data: SignupData) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Replace the line below with actual database logic to save the user
    const user = {
      id: Date.now(),
      email: data.email,
      password: hashedPassword,
    };

    return user;
  }
}
