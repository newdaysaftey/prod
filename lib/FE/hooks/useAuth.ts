"use client";

// import { useQuery } from "@tanstack/react-query";
// import { User, AuthState } from "@/lib/FE/types/auth";

// const getUserFromCookie = (): User | null => {
//   if (typeof document === "undefined") return null;

//   const userCookie = document.cookie
//     .split("; ")
//     .find((row) => row.startsWith("user="));

//   if (!userCookie) return null;

//   try {
//     return JSON.parse(decodeURIComponent(userCookie.split("=")[1]));
//   } catch (error) {
//     console.error("Error parsing user cookie:", error);
//     return null;
//   }
// };

// export function useAuth() {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["auth"],
//     queryFn: getUserFromCookie,
//     refetchOnWindowFocus: true,
//   });

//   const hasRole = (role: string | string[]) => {
//     if (!user) return false;
//     if (Array.isArray(role)) {
//       return role.includes(user.Role);
//     }
//     return user.Role === role;
//   };

//   return {
//     user,
//     isLoading,
//     isAuthenticated: !!user,
//     hasRole,
//   };
// }
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const hasRole = (role: string | string[]) => {
    if (!session?.user) return false;
    if (Array.isArray(role)) {
      return role.includes(session?.user?.role || "");
    }
    return session?.user.role === role;
  };
  console.log(session);

  const logout = async () => {
    await signOut({ redirect: false });
    router.push("/auth/signin");
  };

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    hasRole,
  };
}
