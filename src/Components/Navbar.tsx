import { Link } from "react-router-dom";
import STILogo from "../assets/STILogo.png";

export default function Navbar() {
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="bg-blue-600 h-16 w-full flex items-center px-6 lg:px-20 shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          onClick={handleLogoClick}
          className="flex items-center gap-3 group"
        >
          <img
            src={STILogo}
            alt="STI Logo"
            className="h-9 object-contain bg-yellow-400 p-1 rounded transition-transform group-hover:scale-105"
          />
          <div className="text-xs font-medium leading-tight text-white hidden sm:block">
            <p className="text-blue-200">
              Scholarships & educational assistance
            </p>
            <p className="font-bold">STI College Ortigas-Cainta</p>
          </div>
        </Link>
      </div>

      <nav className="flex items-center gap-4 lg:gap-6 text-amber-50 text-xs font-medium ml-auto">
        <Link
          to="/Programs"
          onClick={handleLogoClick}
          className="hover:text-yellow-300 transition-colors hidden md:inline-block"
        >
          Programs
        </Link>
        <Link
          to="/ApplicationGuide"
          onClick={handleLogoClick}
          className="hover:text-yellow-300 transition-colors hidden md:inline-block"
        >
          Application Guide
        </Link>
        <Link
          to="/Requirements"
          onClick={handleLogoClick}
          className="hover:text-yellow-300 transition-colors hidden md:inline-block"
        >
          Requirements
        </Link>
        <Link
          to="/Application"
          onClick={handleLogoClick}
          className="bg-yellow-400 text-blue-950 font-bold px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition-all transform hover:-translate-y-0.5"
        >
          Start Application &rarr;
        </Link>
      </nav>
    </header>
  );
}
