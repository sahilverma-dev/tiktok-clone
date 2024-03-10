import { NavLink } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";

// icons
import { MdHomeFilled as HomeIcon } from "react-icons/md";
import { IoAddCircle as AddIcon } from "react-icons/io5";
import { FaCircleUser as UserIcon } from "react-icons/fa6";

import { userStore } from "@/services/zustand";
import { cn } from "@/lib/utils";
import { useState } from "react";
import UploadForm from "./UploadForm";

const BottomNavigation = () => {
  const { user } = userStore();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative border-t border-black bg-black fill-gray-500 stroke-gray-500 z-50"
      style={{
        height: "calc(56px + env(safe-area-inset-bottom))",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <nav
        className="h-full w-full py-2 px-4  mx-auto flex-row flex justify-around items-center"
        style={{ maxWidth: 450 }}
      >
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            cn([
              "no-link-highlight select-none basis-0 flex-grow cursor-pointer",
              isActive && "fill-white stroke-white ",
            ])
          }
        >
          <div className="select-none flex flex-col items-center justify-center flex-1 transition duration-100 ease-out transform false animate-activate-shrink">
            <HomeIcon className="h-[28px] w-[28px]" />
          </div>
        </NavLink>

        <div className="no-link-highlight select-none basis-0 flex-grow cursor-pointer">
          <motion.button
            style={{ rotate: isOpen ? 45 : 0 }}
            onClick={() => setIsOpen(!isOpen)}
            className="select-none flex flex-col items-center justify-center flex-1 transition duration-100 ease-out transform false animate-activate-shrink mx-auto"
          >
            <AddIcon className="text-4xl fill-white stroke-white" />
          </motion.button>
        </div>
        <NavLink
          to={user ? `user/${user?.$id}` : "/login"}
          className={({ isActive }) =>
            cn([
              "no-link-highlight select-none basis-0 flex-grow cursor-pointer",
              isActive && "fill-white stroke-white",
            ])
          }
        >
          {user ? (
            <div className="select-none flex flex-col items-center justify-center flex-1 transition duration-100 ease-out transform false animate-activate-shrink">
              <img src={user?.avatar} alt="" className="h-8" />
            </div>
          ) : (
            <div className="select-none flex flex-col items-center justify-center flex-1 transition duration-100 ease-out transform false animate-activate-shrink">
              <UserIcon className="h-6 w-[28px]" />
            </div>
          )}
        </NavLink>
      </nav>
      <AnimatePresence mode="wait">
        {isOpen && <UploadForm close={() => setIsOpen(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default BottomNavigation;
