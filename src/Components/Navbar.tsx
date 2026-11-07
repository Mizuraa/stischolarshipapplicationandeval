export default function Navbar() {
  return (
    <>
      <body className="font-sans fixed inset-0 h-screen w-screen">
        <div className="bg-blue-500 h-16 relative flex items-center px-20">
          {/* NAVBAR */}
          <div className="flex items-center gap-4">
            <a href="">
              <img src="src\assets\STILogo.png" className="h-10" />
            </a>
            <div className="text-xs italic font-medium leading-tight">
              <p>Scholarships & educational assistance</p>
              <p>Student Services Portal</p>
            </div>
          </div>
          <nav className="flex flex-row items-center gap-10 text-amber-50 text-xs italic font-medium ml-auto">
            <a href="/Pages/Programs">Programs</a>
            <a href="/Pages/Applicationguide">Application Guide</a>
            <a href="/Pages/Requirements">Requirements</a>
            <a href="/Pages/Application" className="bg-yellow-400 px-3 py-2">
              Start Application &rarr;
            </a>
          </nav>
        </div>
      </body>
    </>
  );
}
