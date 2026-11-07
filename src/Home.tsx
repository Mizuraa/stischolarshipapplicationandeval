import Breadcrumbs from "./Components/Breadcrumps";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Heropage from "./Pages/Heropage";
import Scholarships from "./Pages/Scholarships";
import { Outlet } from "react-router-dom";

export default function Home() {
  return (
    <>
      <body className="fixed inset-0 h-screen w-screen">
        {/*NAVBAR*/}
        <Navbar></Navbar>
        {/*BREADCRUMPS*/}
        <Breadcrumbs></Breadcrumbs>
        {/* HEROPAGE */}
        <main className="p-4">
          <Outlet /> {/* This loads your pages OR your ErrorBoundary */}
        </main>
        <Heropage></Heropage>
        {/* SCHOLARSHIPS */}
        <Scholarships></Scholarships>
        {/* FOOTER */}
        <Footer></Footer>
      </body>
    </>
  );
}
