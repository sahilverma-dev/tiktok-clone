import { DATABASE_ID, VIDEO_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";
import { Video } from "@/interfaces";
// import { Query } from "appwrite";

export const getVideos = async () =>
  (await databases.listDocuments(DATABASE_ID, VIDEO_COLLECTION_ID, [
    // Query.orderAsc("$createdAt"),
  ])) as {
    total: number;
    documents: Video[];
  };
