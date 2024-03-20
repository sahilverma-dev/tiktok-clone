import {
  BUCKET_ID,
  DATABASE_ID,
  USER_COLLECTION_ID,
} from "@/constants/appwrite";
import { databases, storage } from "../client";
import { uploadFile } from "../uploadFile";
import { User } from "@/interfaces";

export const updateUserProfileImage = async (userId: string, image: File) => {
  const imageData = await uploadFile(image);

  const imageCDN = storage.getFileDownload(BUCKET_ID, imageData.$id);

  return (await databases.updateDocument(
    DATABASE_ID,
    USER_COLLECTION_ID,
    userId,
    {
      avatar: imageCDN,
    }
  )) as User;
};
