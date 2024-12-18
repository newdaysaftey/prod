import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/lib/FE/api";

export function useTags() {
  return useQuery({
    queryKey: ["tags"],
    queryFn: getTags,
  });
}