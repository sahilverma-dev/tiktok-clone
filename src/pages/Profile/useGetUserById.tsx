import { getUserById } from "@/services/appwrite/utils/getUserById";
import { useQuery } from "@tanstack/react-query";

export const useGetUserById = (userId: string) => {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    enabled: !!userId,
  });
};
