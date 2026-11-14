import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Programs from "./Pages/Programs";
import ApplicationGuide from "./Pages/Applicationguide";
import Requirements from "./Pages/Requirements";
import Application from "./Pages/Application";
import TrackerPage from "./Components/TrackerPage";
import AdminDashboard from "./Pages/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "Programs", element: <Programs /> },
      { path: "ApplicationGuide", element: <ApplicationGuide /> },
      { path: "Requirements", element: <Requirements /> },
      { path: "Application", element: <Application /> },
      { path: "tracker", element: <TrackerPage /> },
      { path: "admin", element: <AdminDashboard /> },
    ],
  },
]);
