import {
  createBrowserRouter,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Heropage from "./Pages/Heropage";
import Scholarships from "./Pages/Scholarships";
import Programs from "./Pages/Programs";
import Applicationguide from "./Pages/Applicationguide";
import Requirements from "./Pages/Requirements";
import Application from "./Pages/Application";
import HelpCenter from "./Pages/HelpCenter";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import VisitCampus from "./Pages/VisitCampus";
import StudentDashboard from "./Pages/StudentDashboard";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminDashboard from "./Pages/AdminDashboard";

function RootErrorBoundary() {
  const error = useRouteError();
  console.error(error);

  let errorMessage = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || `Error ${error.status}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg max-w-xl mx-auto my-10">
      <h2 className="text-xl font-bold text-red-700 mb-2">
        Oops! An unexpected error occurred.
      </h2>
      <p className="text-gray-600">{errorMessage}</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <RootErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "Schorlarships",
        element: <Scholarships />,
      },
      {
        path: "Programs",
        element: <Programs />,
      },
      {
        path: "ApplicationGuide",
        element: <Applicationguide />,
      },
      {
        path: "Requirements",
        element: <Requirements />,
      },
      {
        path: "Application",
        element: <Application />,
      },
      {
        path: "help",
        element: <HelpCenter />,
      },
      {
        path: "privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "visit-campus",
        element: <VisitCampus />,
      },
      {
        path: "dashboard",
        element: <StudentDashboard />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin/dashboard",
        element: (
          <ProtectedRoute requireAdmin={true}>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
