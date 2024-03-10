import { BUCKET_ID } from "@/constants/appwrite";
import { ID, storage } from "./client";

export const uploadFile = async (file: File) =>
  await storage.createFile(BUCKET_ID, ID.unique(), file);
