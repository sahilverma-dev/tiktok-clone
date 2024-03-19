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
  thumbnail: File;
  userId: string;
}) => Promise<Video>;

export const addVideo: Type = async ({ caption, video, userId, thumbnail }) => {
  const videoId = ID.unique();

  const videoData = await uploadFile(video);
  const thumbnailData = await uploadFile(thumbnail);

  const videoCDN = storage.getFileDownload(BUCKET_ID, videoData.$id);
  const thumbnailCDN = storage.getFileDownload(BUCKET_ID, thumbnailData.$id);

  const videoDoc = await databases.createDocument(
    DATABASE_ID,
    VIDEO_COLLECTION_ID,
    videoId,
    {
      caption,
      video: videoCDN,
      storage_id: videoData.$id,
      user: userId,
      thumbnail: thumbnailCDN,
    }
  );

  return videoDoc as Video;
};
