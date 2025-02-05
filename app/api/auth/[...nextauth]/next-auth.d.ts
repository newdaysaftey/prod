import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    role?: string;
    id?: string;
    Role?: string;
    UserId?: string;
  }

  interface Session {
    user: DefaultSession["user"] & {
      role?: string;
      id?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    id?: string;

    testing?: string;
  }
}
