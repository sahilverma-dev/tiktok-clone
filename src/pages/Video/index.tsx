import VideoCard from "@/components/custom/VideoCard";
import { buttonVariants } from "@/components/ui/button";

import { getVideoById } from "@/services/appwrite/utils/getVideoById";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

// icons
import { IoArrowBackSharp as ArrowIcon } from "react-icons/io5";

const Video = () => {
  const { videoId } = useParams<{ videoId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ["video", videoId],
    queryFn: () => getVideoById(videoId as string),
  });

  if (isLoading) return <div>Loading...</div>;

  if (!data) return <div>Video not found</div>;
  else
    return (
      <div className="w-full h-full relative  rounded-lg overflow-hidden">
        <Link
          to={"/"}
          className={buttonVariants({
            size: "icon",
            variant: "secondary",
            className: "absolute top-4 left-4 z-10",
          })}
        >
          <ArrowIcon />
        </Link>
        <VideoCard video={data} />
      </div>
    );
};

export default Video;
