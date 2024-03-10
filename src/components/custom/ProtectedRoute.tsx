import { FC } from "react";
import { userStore } from "@/services/zustand";
import { Navigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  inverted?: boolean;
}

const ProtectedRoute: FC<Props> = ({ children, inverted }) => {
  const { user } = userStore();

  if (inverted) {
    return user ? <Navigate to="/" /> : children;
  }

  if (!user) {
    // user is not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
