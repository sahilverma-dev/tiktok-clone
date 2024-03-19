import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getVideoCover: (
  file: File,
  seekTo: number
) => Promise<Blob | null> = (file, seekTo = 0) =>
  new Promise((resolve, reject) => {
    const videoPlayer = document.createElement("video");
    videoPlayer.setAttribute("src", URL.createObjectURL(file));
    videoPlayer.load();
    videoPlayer.addEventListener("error", (ex) => {
      console.log(ex);
      reject("error when loading video file");
    });

    videoPlayer.addEventListener("loadedmetadata", () => {
      if (videoPlayer.duration < seekTo) {
        reject("video is too short.");
        return;
      }

      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 200);

      videoPlayer.addEventListener("seeked", () => {
        const canvas = document.createElement("canvas");
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

        ctx?.canvas.toBlob(
          (blob) => {
            resolve(blob);
          },
          "image/jpeg",
          0.5
        );
      });
    });
  });
