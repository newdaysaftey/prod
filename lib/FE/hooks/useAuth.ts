"use client";

import { useQuery } from "@tanstack/react-query";
import { User, AuthState } from "@/lib/FE/types/auth";

const getUserFromCookie = (): User | null => {
  if (typeof document === "undefined") return null;
  
  const userCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("user="));

  if (!userCookie) return null;

  try {
    return JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
  } catch (error) {
    console.error("Error parsing user cookie:", error);
    return null;
  }
};

export function useAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserFromCookie,
    refetchOnWindowFocus: true,
  });

  const hasRole = (role: string | string[]) => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.Role);
    }
    return user.Role === role;
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    hasRole,
  };
}