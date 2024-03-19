import { useInfiniteVideos } from "@/hooks/useInfiniteVideos";
import Loader from "./Loader";
import VideosList from "./VideosList";

const Home = () => {
  const { data, isLoading, fetchNextPage } = useInfiniteVideos();

  if (isLoading) {
    return <Loader />;
  } else
    return (
      <div>
        <VideosList
          videos={data?.pages.flatMap((page) => page.documents) || []}
          fetchNextPage={fetchNextPage}
        />
      </div>
    );
};

export default Home;
