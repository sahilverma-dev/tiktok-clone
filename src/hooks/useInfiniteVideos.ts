import { getInfiniteVideos } from "@/services/appwrite/utils/getInfiniteVideos";
import { useInfiniteQuery } from "@tanstack/react-query";

export const videoLimit = 10;

export const useInfiniteVideos = () =>
  useInfiniteQuery({
    queryKey: ["videos"],
    queryFn: ({ pageParam }) =>
      getInfiniteVideos({ pageParams: pageParam || 1 }),
    initialPageParam: 1,
    throwOnError: true,
    refetchOnWindowFocus: false,
    // TODO improve pagination
    getNextPageParam: (lastPage) =>
      lastPage.documents.length >= videoLimit
        ? Math.floor(lastPage.documents.length / videoLimit) + 1
        : undefined,
  });
