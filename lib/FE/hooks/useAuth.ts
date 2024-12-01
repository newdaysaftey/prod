"use client";

import { useState, useEffect } from "react";
import { User, AuthState } from "@/lib/FE/types/auth";

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const userCookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("user="));

    if (userCookie) {
      try {
        const user = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
        console.log(user);
        setAuthState({ user, isLoading: false });
      } catch (error) {
        setAuthState({ user: null, isLoading: false });
      }
    } else {
      setAuthState({ user: null, isLoading: false });
    }
  }, []);

  const hasRole = (role: string | string[]) => {
    if (!authState.user) return false;

    if (Array.isArray(role)) {
      return role.includes(authState.user.Role);
    }

    return authState.user.Role === role;
  };

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    isAuthenticated: !!authState.user,
    hasRole,
  };
}
