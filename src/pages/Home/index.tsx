import { getVideos } from "@/services/appwrite/utils/get-videos";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import VideosList from "./VideosList";

const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    retry: 2,
  });

  if (isLoading) {
    return <Loader />;
  } else
    return (
      <div>
        <VideosList videos={data?.documents || []} />
      </div>
    );
};

export default Home;
