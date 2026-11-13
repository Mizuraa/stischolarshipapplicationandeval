import { Link, useLocation } from "react-router-dom";

export default function Breadcrumbs() {
  const location = useLocation();
  let currentLink = "";
  const crumbs = location.pathname.split("/").filter((crumb) => crumb !== "");

  // Hide breadcrumbs if we are strictly on the home page root
  if (crumbs.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-white border-b border-slate-200 px-6 lg:px-20 py-3 text-xs shadow-xs"
    >
      <ol className="flex items-center space-x-2 text-slate-600">
        <li>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-medium transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span>Home</span>
          </Link>
        </li>

        {crumbs.map((crumb, index) => {
          currentLink += `/${crumb}`;
          const isLast = index === crumbs.length - 1;
          const formattedCrumb = crumb.replace(/-/g, " ");

          return (
            <li key={currentLink} className="flex items-center space-x-2">
              <span className="text-slate-400 select-none" aria-hidden="true">
                /
              </span>
              {isLast ? (
                <span
                  className="capitalize font-semibold text-slate-900 bg-slate-100 px-2.5 py-0.5 rounded-md shadow-2xs"
                  aria-current="page"
                >
                  {formattedCrumb}
                </span>
              ) : (
                <Link
                  to={currentLink}
                  className="capitalize hover:text-blue-600 transition-colors"
                >
                  {formattedCrumb}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
