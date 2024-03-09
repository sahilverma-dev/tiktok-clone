import { DATABASE_ID, VIDEO_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";

export const getVideos = async () =>
  await databases.listDocuments(DATABASE_ID, VIDEO_COLLECTION_ID);
