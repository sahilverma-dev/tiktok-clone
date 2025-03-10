import { FC, useEffect, useRef, useState } from "react";

import { useInView } from "react-intersection-observer";
import { AnimatePresence, motion } from "framer-motion";
import { Video } from "@/interfaces";
import { audioStore } from "@/services/zustand";

// icons
import { FaPlay as PlayIcon } from "react-icons/fa";
import { GoUnmute as UnmuteIcon, GoMute as MuteIcon } from "react-icons/go";
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import { MdVerified as VerifiedIcon } from "react-icons/md";

// components
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface Props {
  video: Video;
}

const VideoCard: FC<Props> = ({ video }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);
  const { mute, setMute } = audioStore();
  const videoRef = useRef<HTMLVideoElement>(null);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (videoRef.current) {
      videoRef.current.paused
        ? videoRef.current.play()
        : videoRef.current.pause();
    }
  };

  useEffect(() => {
    if (inView) {
      videoRef.current?.play();
      setIsPlaying(true);
    } else {
      videoRef.current?.pause();
    }
  }, [inView]);

  useEffect(() => {
    if (videoRef.current) {
      // detect video is paused for buffering
      videoRef.current.addEventListener("waiting", () => {
        setIsLoading(true);
      });

      videoRef.current.addEventListener("playing", () => {
        setIsLoading(false);
      });

      // video progress
      videoRef.current.addEventListener("timeupdate", () => {
        if (videoRef.current) {
          setWidth(
            (videoRef.current.currentTime / videoRef.current.duration) * 100
          );
        }
      });
    }
  }, []);

  return (
    <div className="relative h-full w-full" ref={ref}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-full w-full bg-black/50 flex items-center justify-center pointer-events-none"
          >
            <SpinnerIcon className="animate-spin text-2xl" />
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        {!isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-0 left-0 h-full w-full bg-black/50 flex items-center justify-center pointer-events-none"
          >
            <PlayIcon className="text-5xl" />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="absolute bottom-0 left-0 p-4 w-full z-10">
        <div className="flex gap-2 items-center">
          <Link to={`/user/${video.user.$id}`}>
            <img
              src={video.user.avatar}
              alt={video.user.full_name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
          <Link to={`user/${video.user.$id}`}>
            <p className="text-white font-semibold inline-flex gap-1 items-center">
              {video.user.full_name}{" "}
              {video.user.is_verified && <VerifiedIcon />}
            </p>
          </Link>
        </div>
        <p className="text-sm w-full truncate">{video.caption}</p>
      </div>
      <div className="absolute bottom-7 right-0 p-4 z-10">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="rounded-full bg-black/40 hover:bg-black/60 backdrop-blur"
          onClick={() => setMute(!mute)}
        >
          {mute ? <MuteIcon /> : <UnmuteIcon />}
        </Button>
      </div>
      <div className="w-full h-full" onClick={togglePlay}>
        <video
          ref={videoRef}
          src={video.video}
          poster={video.thumbnail}
          className="w-full h-full pointer-events-none"
          muted={mute}
          autoPlay
          playsInline
          controls={false}
          loop
        />
      </div>
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 rounded-lg bg-white"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

export default VideoCard;
