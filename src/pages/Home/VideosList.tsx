import { FC, useEffect, useState } from "react";

import { Video } from "@/interfaces";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import VideoCard from "@/components/custom/VideoCard";

interface Prop {
  videos: Video[];
}

const VideosList: FC<Prop> = ({ videos }) => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 56);

    window.onresize = () => {
      setHeight(window.innerHeight - 56);
    };
  }, []);
  return (
    <Swiper direction="vertical" style={{ height: `${height}px` }}>
      {videos.map((video) => (
        <SwiperSlide key={video.$id} style={{ height: `${height}px` }}>
          <VideoCard video={video} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VideosList;
