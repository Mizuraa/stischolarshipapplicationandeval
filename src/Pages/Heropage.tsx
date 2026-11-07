export default function Heropage() {
  return (
    <>
      <body className="bg-blue-500 font-sans text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-6 lg:px-20 pt-16 flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Content */}
          <div className="flex-1 max-w-xl">
            <p className="text-sm text-yellow-400 font-semibold tracking-wide">
              Be more, be STI
            </p>
            <h1 className="text-4xl lg:text-6xl font-medium tracking-tight mt-2">
              Move forward.
            </h1>
            <h2 className="text-yellow-400 text-4xl lg:text-6xl font-bold py-2">
              With Support.
            </h2>
            <p className="py-4 text-blue-100 text-base lg:text-lg leading-relaxed">
              Explore STI Scholarships and educational assistance. Apply for the
              first time or renew your application.
            </p>

            {/* Buttons */}
            <div className="flex flex-row gap-4 pt-4">
              <button className="bg-yellow-400 text-blue-950 font-semibold rounded-2xl px-6 py-3 shadow-md hover:bg-yellow-200 transition">
                I'm a new Student &rarr;
              </button>
              <button className="bg-white text-blue-950 font-semibold rounded-2xl px-6 py-3 shadow-md hover:bg-yellow-200 transition">
                I'm an old Student
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <img
              className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl object-cover"
              src="src\assets\FrontSchool.jpg"
              alt="STI School"
            />
          </div>
        </div>
      </body>
    </>
  );
}
