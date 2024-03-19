import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Root from "./components/layouts/Root";
import Register from "./pages/Register";
import NavLayout from "./components/layouts/NavLayout";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/custom/ProtectedRoute";
import Video from "./pages/Video";
import EditProfile from "./pages/EditProfile";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<NavLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/user/:id" element={<Profile />} />
        <Route path="/edit-profile/:id" element={<EditProfile />} />
        <Route path="/video/:videoId" element={<Video />} />
      </Route>
      <Route
        path="/login"
        element={
          <ProtectedRoute inverted>
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/register"
        element={
          <ProtectedRoute inverted>
            <Register />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);
