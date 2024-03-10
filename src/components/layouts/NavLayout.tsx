import { Outlet } from "react-router-dom";
import BottomNavigation from "../custom/BottomNavigation";

const NavLayout = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex-grow">
        <Outlet />
      </div>
      <BottomNavigation />
    </div>
  );
};

export default NavLayout;
