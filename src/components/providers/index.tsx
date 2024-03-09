import { PropsWithChildren } from "react";
import { Toaster } from "sonner";

// providers
import ReactQueryProvider from "./ReactQueryProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ReactQueryProvider>
      <Toaster richColors theme="dark" position="top-center" />
      {children}
    </ReactQueryProvider>
  );
};

export default Providers;
