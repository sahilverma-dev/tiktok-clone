import { Outlet } from "react-router-dom";
import BottomNavigation from "../custom/BottomNavigation";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

const NavLayout = () => {
  const [height, setHeight] = useState(0);
  useEffect(() => {
    setHeight(window.innerHeight - 56);

    window.onresize = () => {
      setHeight(window.innerHeight - 56);
    };
  }, []);

  return (
    <div className="h-full flex flex-col">
      <motion.div
        className="overflow-y-auto"
        style={{
          height: `${height}px`,
        }}
      >
        <Outlet />
      </motion.div>
      <BottomNavigation />
    </div>
  );
};

export default NavLayout;
