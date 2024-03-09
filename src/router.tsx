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

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Route>
  )
);
