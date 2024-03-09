import { getVideos } from "@/services/appwrite/utils/get-videos";
import { useQuery } from "@tanstack/react-query";

const Home = () => {
  const { data } = useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    retry: 2,
  });
  return <div>{JSON.stringify(data)}</div>;
};

export default Home;
