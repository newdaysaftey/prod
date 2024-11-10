import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWTPayload, UserRole } from "@/app/types/global";

// Define return type for verifyToken
type AuthResult = { success: true; User: JWTPayload } | NextResponse;

export async function verifyToken(request: NextRequest): Promise<AuthResult> {
  try {
    // Get token from cookies instead of headers
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Access denied. No token provided.",
        },
        { status: 401 }
      );
    }

    try {
      // Verify the token and cast it to our JWTPayload type
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as JWTPayload;

      // Attach the user to the request
      (request as any).User = decoded;

      return {
        success: true,
        User: decoded,
      };
    } catch (jwtError) {
      // Handle specific JWT errors
      if (jwtError instanceof jwt.TokenExpiredError) {
        return NextResponse.json(
          {
            success: false,
            error: true,
            message: "Token has expired.",
          },
          { status: 401 }
        );
      } else if (jwtError instanceof jwt.JsonWebTokenError) {
        return NextResponse.json(
          {
            success: false,
            error: true,
            message: "Invalid token.",
          },
          { status: 401 }
        );
      }
    }

    // If we get here, something went wrong with token verification
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Invalid token format.",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: true,
        message: "Authentication error occurred.",
      },
      { status: 500 }
    );
  }
}

// Role-based access control middleware
export function checkRole(allowedRoles: UserRole[]) {
  return async (request: NextRequest) => {
    const authResult = await verifyToken(request);

    // If authResult is a NextResponse, it means there was an error
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const userRole = authResult.User.Role;

    if (!allowedRoles.includes(userRole)) {
      return NextResponse.json(
        {
          success: false,
          error: true,
          message: "Access denied. Insufficient permissions.",
        },
        { status: 403 }
      );
    }

    return authResult;
  };
}
