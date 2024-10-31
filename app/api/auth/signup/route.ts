// app/api/auth/signup/route.ts
import { NextRequest } from "next/server";
import { SignupController } from "./signup.controller";

const controller = new SignupController();

export async function POST(request: NextRequest) {
  return controller.signup(request);
}
