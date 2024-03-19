import { PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "sonner";

// providers
import ReactQueryProvider from "./ReactQueryProvider";
import { account } from "@/services/appwrite/client";
import { userStore } from "@/services/zustand";
import { getUserWithId } from "@/services/appwrite/utils/getUserWithId";
import Loader from "@/pages/Home/Loader";

const Providers = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const { login } = userStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const { $id: userId } = await account.get();

        if (userId) {
          // TODO change this
          const user = await getUserWithId(userId);
          login(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, [login]);

  return (
    <ReactQueryProvider>
      <Toaster richColors theme="dark" position="top-center" />
      {isLoading ? (
        <div className="h-dvh w-full">
          <Loader />
        </div>
      ) : (
        children
      )}
    </ReactQueryProvider>
  );
};

export default Providers;
