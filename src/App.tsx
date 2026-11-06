import Breadcrumbs from "./Components/Breadcrumps";
import Navbar from "./Components/Navbar";
import Heropage from "./Pages/Heropage";

export default function App() {
  return (
    <>
      <body className="fixed inset-0 h-screen w-screen">
        {/*NAVBAR*/}
        <Navbar></Navbar>
        {/*BREADCRUMPS*/}
        <Breadcrumbs></Breadcrumbs>
        {/* HEROPAGE */}
        <Heropage></Heropage>
        {/* WELCOMEPAGE */}
        {/* FOOTER */}
      </body>
    </>
  );
}
