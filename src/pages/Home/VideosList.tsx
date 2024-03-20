import { FC, useEffect, useState } from "react";

import { Video } from "@/interfaces";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { Virtual, Mousewheel } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import VideoCard from "@/components/custom/VideoCard";
import { toast } from "sonner";
import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface Prop {
  videos: Video[];
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

const VideosList: FC<Prop> = ({ videos, fetchNextPage }) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 56);

    window.onresize = () => {
      setHeight(window.innerHeight - 56);
    };
  }, []);

  if (videos.length === 0) {
    return (
      <div className="w-full h-dvh flex justify-center items-center">
        No videos found
      </div>
    );
  } else
    return (
      <Swiper
        direction="vertical"
        style={{ height: `${height}px` }}
        modules={[Virtual, Mousewheel]}
        virtual
        mousewheel
        onReachEnd={() => {
          fetchNextPage();
          toast.promise(fetchNextPage, {
            loading: "Loading videos...",
            success: "Videos loaded",
            error: "Error loading videos",
            duration: 800,
          });
        }}
      >
        {videos.map((video, i) => (
          <SwiperSlide
            key={video.$id}
            virtualIndex={i}
            style={{ height: `${height}px` }}
          >
            <VideoCard video={video} />
          </SwiperSlide>
        ))}
      </Swiper>
    );
};

export default VideosList;
