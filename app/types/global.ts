export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  // Add other roles as needed
}

export interface JWTPayload {
  UserId: string;
  Email: string;
  Role: UserRole;
  iat: number;
  exp: number;
}

// Extend the NextRequest type
declare module "next/server" {
  interface NextRequest {
    User?: JWTPayload;
  }
}
