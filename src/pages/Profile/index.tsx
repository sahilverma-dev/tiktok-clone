import { userStore } from "@/services/zustand";
import { Link, useParams } from "react-router-dom";
import { useGetUserById } from "./useGetUserById";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const Profile = () => {
  const { id } = useParams();
  const { user } = userStore();

  const { data: currentUser, isLoading, error } = useGetUserById(id || "");

  if (error)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <p>User not found</p>
      </div>
    );

  if (!currentUser || isLoading)
    return (
      <div className="flex items-center justify-center w-full h-full">
        <SpinnerIcon className="animate-spin text-4xl" />
      </div>
    );

  return (
    <div className="flex flex-col p-4 flex-1 gap-4">
      <img
        src={currentUser?.avatar}
        alt="profile"
        className="w-28 h-28 rounded-full"
      />
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex flex-col w-full">
          <h1 className="text-center  xl:text-left font-bold md:h1-semibold w-full">
            {currentUser.full_name}
          </h1>
        </div>

        {currentUser?.bio && (
          <p className="small-medium md:base-medium text-center xl:text-left mt-3 max-w-screen-sm">
            {currentUser?.bio}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4">
        <div className={`${user?.$id !== currentUser.$id && "hidden"}`}>
          <Link
            to={`/update-profile/${currentUser.$id}`}
            className={cn([
              buttonVariants({ variant: "secondary" }),
              "rounded-full",
              user?.$id !== currentUser.$id && "hidden",
            ])}
          >
            <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
          </Link>
        </div>
      </div>

      {currentUser.video?.length && (
        <div className="grid grid-cols-3 gap-2">
          {currentUser.video?.map((video) => {
            return (
              <div className="flex aspect-[3/5] flex-col justify-end capitalize gap-1 rounded-md p-2 bg-zinc-800 text-primary-foreground hover:bg-zinc-700">
                <p>{video.caption}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
