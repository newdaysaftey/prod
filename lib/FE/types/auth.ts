export type UserRole = "ADMIN" | "USER" | "GUEST";

export interface User {
  id: string;
  email: string;
  Role: UserRole;
  name: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
}
