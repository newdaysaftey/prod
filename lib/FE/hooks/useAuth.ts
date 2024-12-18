// "use client";

// import { useState, useEffect } from "react";
// import { User, AuthState } from "@/lib/FE/types/auth";

// export function useAuth() {
//   const [authState, setAuthState] = useState<AuthState>({
//     user: null,
//     isLoading: true,
//   });

//   useEffect(() => {
//     const userCookie = document.cookie
//       .split("; ")
//       .find((row) => row.startsWith("user="));

//     if (userCookie) {
//       try {
//         const user = JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
//         console.log(user);
//         setAuthState({ user, isLoading: false });
//       } catch (error) {
//         setAuthState({ user: null, isLoading: false });
//       }
//     } else {
//       setAuthState({ user: null, isLoading: false });
//     }
//   }, []);

//   const hasRole = (role: string | string[]) => {
//     if (!authState.user) return false;

//     if (Array.isArray(role)) {
//       return role.includes(authState.user.Role);
//     }

//     return authState.user.Role === role;
//   };

//   return {
//     user: authState.user,
//     isLoading: authState.isLoading,
//     isAuthenticated: !!authState.user,
//     hasRole,
//   };
// }

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
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
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