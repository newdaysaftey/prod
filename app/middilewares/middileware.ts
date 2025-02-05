import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@/app/types/global";

export async function checkRole(
  allowedRoles: UserRole[],
  request: NextRequest
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: true, message: "No session found" },
      { status: 401 }
    );
  }

  const userRole = session.user.role;

  if (!allowedRoles.includes(userRole as UserRole)) {
    return NextResponse.json(
      { error: true, message: "Insufficient permissions" },
      { status: 403 }
    );
  }

  return {
    User: {
      UserId: session.user.id,
      Email: session.user.email,
      Name: session.user.name,
      Role: session.user.role,
    },
  };
}
