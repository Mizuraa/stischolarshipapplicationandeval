import Breadcrumbs from "./Components/Breadcrumps";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import ScrollToTop from "./Components/ScrollToTop";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans antialiased">
      <ScrollToTop />
      <Navbar />
      <Breadcrumbs />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
