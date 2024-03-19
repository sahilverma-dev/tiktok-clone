import { Query } from "appwrite";
import { databases } from "../client";
import { DATABASE_ID, VIDEO_COLLECTION_ID } from "@/constants/appwrite";
import { Video } from "@/interfaces";
import { videoLimit } from "@/hooks/useInfiniteVideos";

export const getInfiniteVideos = async ({
  pageParams = 1,
}: {
  pageParams: number;
}) => {
  const response = await databases.listDocuments(
    DATABASE_ID,
    VIDEO_COLLECTION_ID,
    [
      Query.orderDesc("$createdAt"),
      Query.limit(videoLimit),
      Query.offset((pageParams - 1) * videoLimit),
    ]
  );

  return {
    total: response.total,
    documents: response.documents as Video[],
  };
};
