// app/api/auth/signup/route.ts
import { NextRequest } from "next/server";
import { SigninController } from "./signin.controller";

const controller = new SigninController();
export const dynamic = "dynamic";

export async function POST(request: NextRequest) {
  return controller.signin(request);
}
