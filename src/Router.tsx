import {
  createBrowserRouter,
  useRouteError,
  isRouteErrorResponse,
} from "react-router-dom";
import Home from "./Home";
import Heropage from "./Pages/Heropage";
import Scholarships from "./Pages/Scholarships";
import Programs from "./Pages/Programs";
import Applicationguide from "./Pages/Applicationguide";
import Requirements from "./Pages/Requirements";
import Application from "./Pages/Application";

function RootErrorBoundary() {
  const error = useRouteError();
  console.error(error); // Logs error details to the developer console

  let errorMessage = "An unexpected error occurred.";
  if (isRouteErrorResponse(error)) {
    errorMessage = error.statusText || `Error ${error.status}`;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="p-8 text-center bg-red-50 border border-red-200 rounded-lg max-w-xl mx-auto my-10">
      <h2 className="text-xl font-bold text-red-700 mb-2">
        Oops! My heart went di pa tapos.
      </h2>
      <p className="text-gray-600">{errorMessage}</p>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <RootErrorBoundary />, // Catches crashes and renders them inside Home's layout
    children: [
      {
        index: true, // Renders Heropage by default at the root URL "/"
        element: <Heropage />,
      },
      {
        path: "Schorlarships", // URL will be "/Schorlarships"
        element: <Scholarships />,
      },
      {
        path: "Programs", // URL will be "/Programs"
        element: <Programs />,
      },
      {
        path: "ApplicationGuide", // URL will be "/ApplicationGuide"
        element: <Applicationguide />,
      },
      {
        path: "Requirements", // URL will be "/Requirements"
        element: <Requirements />,
      },
      {
        path: "Application", // URL will be "/Application"
        element: <Application />,
      },
    ],
  },
]);
