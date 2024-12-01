"use client";

import { useAuth } from "@/lib/FE/hooks/useAuth";

interface RoleBasedContentProps {
  roles: string[];
  children: React.ReactNode;
}

export function RoleBasedContent({ roles, children }: RoleBasedContentProps) {
  const { hasRole } = useAuth();

  if (!hasRole(roles)) {
    return null;
  }

  return <>{children}</>;
}
