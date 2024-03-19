import { userStore } from "@/services/zustand";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useGetUserById } from "./useGetUserById";

// icons
import { CgSpinner as SpinnerIcon } from "react-icons/cg";
import { MdVerified as VerifiedIcon } from "react-icons/md";
import { CiPower as PowerIcon } from "react-icons/ci";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { toast } from "sonner";
import { account } from "@/services/appwrite/client";

const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, logout } = userStore();

  const { data: currentUser, isLoading, error } = useGetUserById(id || "");

  const logoutUser = () => {
    logout();
    account.deleteSession("current");
    navigate("/");
    toast.success("Logged out successfully");
  };

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
    <div className="flex flex-col py-4 p-2 flex-1 gap-4">
      <div className="flex gap-2">
        <img
          src={currentUser?.avatar}
          alt="profile"
          className="w-28 h-28 rounded-full"
        />
        <div className="flex flex-col w-full">
          <div className="flex gap-2 items-center  w-full">
            <h1 className="font-bold">{currentUser.full_name}</h1>
            {user?.is_verified && <VerifiedIcon title="Verified" />}
            {user?.$id === currentUser.$id && (
              <div className="flex items-center gap-1 ml-auto">
                <Link
                  to={`/edit-profile/${currentUser.$id}`}
                  className={cn([
                    buttonVariants({ variant: "secondary" }),
                    "rounded-full",
                    user?.$id !== currentUser.$id && "hidden",
                  ])}
                >
                  <p className="whitespace-nowrap text-sm">Edit Profile</p>
                </Link>
                <Button
                  type="button"
                  onClick={logoutUser}
                  variant={"default"}
                  size={"icon"}
                  className="rounded-full"
                >
                  <PowerIcon />
                </Button>
              </div>
            )}
          </div>

          <p className="small-medium md:base-medium mt-3">
            {currentUser?.bio || "There is no bio."}
          </p>
        </div>
      </div>
      {currentUser.video?.length === 0 ? (
        <div className="w-full h-[500px]   flex items-center justify-center">
          No videos
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {currentUser.video?.map((video) => {
            return (
              <Link
                to={`/video/${video.$id}`}
                key={video.$id}
                className="relative flex aspect-[3/4.7] flex-col justify-end capitalize gap-1 rounded-md bg-zinc-800 text-primary-foreground hover:bg-zinc-700 overflow-hidden"
              >
                <img
                  src={video.thumbnail}
                  alt={video.caption}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-50"></div>
                <p className="absolute p-2 truncate text-xs w-full">
                  {video.caption}
                </p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Profile;
