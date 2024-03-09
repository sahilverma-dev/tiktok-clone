import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <div className="w-full h-dvh bg-zinc-800 text-primary-foreground">
      <main className="w-full max-w-md mx-auto h-full bg-zinc-950 md:rounded-md overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
};

export default Root;
