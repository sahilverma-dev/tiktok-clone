import { DATABASE_ID, VIDEO_COLLECTION_ID } from "@/constants/appwrite";
import { databases } from "../client";
import { Video } from "@/interfaces";

export async function getVideoById(videoId: string) {
  try {
    const video = await databases.getDocument(
      DATABASE_ID,
      VIDEO_COLLECTION_ID,
      videoId
    );

    if (!video) throw Error;

    return video as Video;
  } catch (error) {
    console.log(error);
  }
}
