export enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  // Add other roles as needed
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

export interface authResult {
  User: JWTPayload;
}

export interface JWTPayload {
  UserId: string;
  Email: string;
  Role: UserRole;
  iat: number;
  exp: number;
}

export interface UploadImageParams {
  file: Buffer | string;
  folder: string;
  resourceType?: string;
}

export interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
}

export interface FAQ {
  keywords: string[];
  question: string;
  answer: string;
}

export interface FAQResponse {
  question?: string;
  answer: string;
  error?: string;
}

export interface FAQRequest {
  question: string;
}

// Extend the NextRequest type
declare module "next/server" {
  interface NextRequest {
    User?: JWTPayload;
  }
}
