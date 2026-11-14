interface TrackerProps {
  applicantType?: "new" | "old";
  setApplicantType?: (type: "new" | "old") => void;
}

export default function Tracker({
  applicantType = "new",
  setApplicantType = () => {},
}: TrackerProps) {
  return (
    <div className="space-y-6 mb-8">
      <div className="text-center">
        <h2 className="text-lg font-extrabold text-slate-900">
          One application. The right path for you.
        </h2>
      </div>

      {/* New vs Old Selector Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* New Student Card */}
        <div
          onClick={() => setApplicantType("new")}
          className={`p-6 rounded-xl border-2 cursor-pointer transition ${
            applicantType === "new"
              ? "border-blue-900 bg-blue-50/40 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded uppercase">
            First-Time Applicant
          </span>
          <h3 className="font-bold text-slate-900 text-sm mt-2">New student</h3>
          <p className="text-[11px] text-slate-600 mt-1 mb-4 leading-relaxed">
            Enter your application for incoming freshman, transferee, or
            second-year students. Choose your program and upload required
            documents.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold bg-blue-900 text-white px-4 py-2 rounded-lg shadow-sm">
            Start a new application &rarr;
          </div>
        </div>

        {/* Old / Returning Student Card */}
        <div
          onClick={() => setApplicantType("old")}
          className={`p-6 rounded-xl border-2 cursor-pointer transition ${
            applicantType === "old"
              ? "border-blue-900 bg-blue-50/40 shadow-sm"
              : "border-slate-200 bg-white hover:border-slate-300"
          }`}
        >
          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded uppercase">
            Renewal / Retention
          </span>
          <h3 className="font-bold text-slate-900 text-sm mt-2">
            Old / returning student
          </h3>
          <p className="text-[11px] text-slate-600 mt-1 mb-4 leading-relaxed">
            Enter your student ID to review saved details, check grade info,
            complete renewal requirements, and view scholarship history.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-bold bg-blue-900 text-white px-4 py-2 rounded-lg shadow-sm">
            Continue student inquiry &rarr;
          </div>
        </div>
      </div>
    </div>
  );
}
