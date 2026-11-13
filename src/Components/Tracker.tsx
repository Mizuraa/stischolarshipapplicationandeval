import { Link } from "react-router-dom";

export default function Tracker() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-20 -mt-8 relative z-10 mb-12 w-full">
      <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
        <div className="mb-6">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            START HERE
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-2">
            One application. The right path for you.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Student Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-400 transition-all">
            <div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2.5 py-0.5 rounded">
                First-Time Applicant
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-3">
                New student
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Enter your application for incoming freshman, transferee, or
                second-year students. Choose your program and upload required
                documents.
              </p>
            </div>
            <Link
              to="/Application"
              className="mt-6 bg-blue-900 hover:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg text-xs flex items-center justify-between transition"
            >
              <span>Start a new application</span>
              <span>&rarr;</span>
            </Link>
          </div>

          {/* Old / Returning Student Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 flex flex-col justify-between hover:border-blue-400 transition-all">
            <div>
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded">
                Renewal / Retention
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-3">
                Old / returning student
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                Enter your student ID to review saved details, check grade info,
                complete the annual family questionnaire, and upload applicable
                requirements.
              </p>
            </div>
            <Link
              to="/Application"
              className="mt-6 bg-blue-900 hover:bg-blue-800 text-white font-medium px-4 py-2.5 rounded-lg text-xs flex items-center justify-between transition"
            >
              <span>Continue student inquiry</span>
              <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
