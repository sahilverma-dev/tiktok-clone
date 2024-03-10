import {
  BUCKET_ID,
  DATABASE_ID,
  VIDEO_COLLECTION_ID,
} from "@/constants/appwrite";
import { uploadFile } from "../uploadFile";
import { ID } from "appwrite";
import { databases, storage } from "../client";
import { Video } from "@/interfaces";

type Type = (data: {
  caption: string;
  video: File;
  userId: string;
}) => Promise<Video>;

export const addVideo: Type = async ({ caption, video, userId }) => {
  const videoId = ID.unique();

  const videoData = await uploadFile(video);
  const videoCDN = await storage.getFileDownload(BUCKET_ID, videoData.$id);
  const videoDoc = await databases.createDocument(
    DATABASE_ID,
    VIDEO_COLLECTION_ID,
    videoId,
    {
      caption,
      video: videoCDN,
      storage_id: videoData.$id,
      user: userId,
    }
  );

  return videoDoc as Video;
};
