import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-blue-950 text-blue-200 text-xs py-8 px-6 lg:px-20 mt-auto border-t border-blue-900">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-white">STI College Ortigas-Cainta</p>
          <p>Scholarship Application and Evaluation System</p>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/help" className="hover:text-yellow-400 transition-colors">
            Help Center
          </Link>
          <Link
            to="/privacy"
            className="hover:text-yellow-400 transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            to="/visit-campus"
            className="hover:text-yellow-400 transition-colors"
          >
            Visit Campus
          </Link>
        </div>
      </div>
    </footer>
  );
}
