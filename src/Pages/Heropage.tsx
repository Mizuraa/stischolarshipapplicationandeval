import { Link } from "react-router-dom";
import FrontSchool from "../assets/FrontSchool.jpg";

export default function Heropage() {
  return (
    <section className="bg-blue-600 font-sans text-white py-12 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
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

          <div className="flex flex-row gap-4 pt-4">
            <Link
              to="/Application"
              className="bg-yellow-400 text-blue-950 font-semibold rounded-2xl px-6 py-3 shadow-md hover:bg-yellow-300 transition text-sm"
            >
              I'm a new Student &rarr;
            </Link>
            <Link
              to="/Application"
              className="bg-white text-blue-950 font-semibold rounded-2xl px-6 py-3 shadow-md hover:bg-slate-100 transition text-sm"
            >
              I'm an old Student
            </Link>
          </div>
        </div>

        <div className="flex-1 flex justify-center lg:justify-end w-full">
          <img
            className="w-full max-w-md lg:max-w-lg h-auto rounded-2xl shadow-2xl object-cover border-4 border-white/10"
            src={FrontSchool}
            alt="STI College Ortigas-Cainta Campus"
          />
        </div>
      </div>
    </section>
  );
}
