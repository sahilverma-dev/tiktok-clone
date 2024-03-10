import { PropsWithChildren, useEffect, useState } from "react";
import { Toaster } from "sonner";

// providers
import ReactQueryProvider from "./ReactQueryProvider";
import { account } from "@/services/appwrite/client";
import { userStore } from "@/services/zustand";
import { getUserWithId } from "@/services/appwrite/utils/getUserWithId";

const Providers = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const { login } = userStore();

  useEffect(() => {
    const getUserData = async () => {
      try {
        setIsLoading(true);
        const { $id: userId } = await account.get();
        console.log(userId);

        if (userId) {
          // TODO change this
          const user = await getUserWithId("65ec2e5b7ade8e8a59e2");
          login(user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getUserData();
  }, []);
  return (
    <ReactQueryProvider>
      <Toaster richColors theme="dark" position="top-center" />
      {isLoading ? "Loading" : children}
    </ReactQueryProvider>
  );
};

export default Providers;
