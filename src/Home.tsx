import Breadcrumbs from "./Components/Breadcrumps";
import Footer from "./Components/Footer";
import Navbar from "./Components/Navbar";
import Heropage from "./Pages/Heropage";
import Scholarships from "./Pages/Scholarships";

export default function Home() {
  return (
    <>
      <body className="fixed inset-0 h-screen w-screen">
        {/*NAVBAR*/}
        <Navbar></Navbar>
        {/*BREADCRUMPS*/}
        <Breadcrumbs></Breadcrumbs>
        {/* HEROPAGE */}
        <Heropage></Heropage>
        {/* SCHOLARSHIPS */}
        <Scholarships></Scholarships>
        {/* FOOTER */}
        <Footer></Footer>
      </body>
    </>
  );
}
