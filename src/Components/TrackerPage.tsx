import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function TrackerPage() {
  const [studentNumber, setStudentNumber] = useState("");
  const [appData, setAppData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentNumber.trim()) return;

    setLoading(true);
    const { data, error } = await supabase
      .from("application")
      .select("status, form_data, updated_at")
      .eq("student_number", studentNumber.trim())
      .maybeSingle();

    if (error || !data) {
      alert("No application found for this Student Number.");
      setAppData(null);
    } else {
      setAppData(data);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 text-slate-800 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
          Public Status Lookup
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2 mb-2">
          Application Progress Tracker
        </h1>
        <p className="text-xs text-gray-500 mb-6">
          Enter your Student Number below to see your real-time position in the
          evaluation pipeline (Filter &rarr; Checker &rarr; Validator).
        </p>

        <form onSubmit={handleTrack} className="flex gap-3 mb-8 text-xs">
          <input
            type="text"
            value={studentNumber}
            onChange={(e) => setStudentNumber(e.target.value)}
            placeholder="Enter your Student Number"
            required
            className="grow border border-slate-300 rounded-lg p-3 bg-white"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition cursor-pointer"
          >
            {loading ? "Checking..." : "Track Status"}
          </button>
        </form>

        {appData && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 gap-2">
              <span className="font-bold text-blue-900 text-sm">
                Applicant: {appData.form_data?.formData?.firstName}{" "}
                {appData.form_data?.formData?.lastName}
              </span>
              <span className="bg-amber-100 text-amber-800 font-bold px-3 py-1 rounded-full uppercase tracking-wider text-[10px]">
                Pipeline Stage: {appData.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="font-semibold text-slate-500">
                  Scholarship Program:
                </p>
                <p className="text-slate-900 font-medium">
                  {appData.form_data?.selectedProgram}
                </p>
              </div>
              <div>
                <p className="font-semibold text-slate-500">
                  Enrolled Course / Strand:
                </p>
                <p className="text-slate-900 font-medium">
                  {appData.form_data?.enrolledProgram}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t flex justify-between items-center text-[11px] text-slate-400">
              <span>Student ID: {studentNumber}</span>
              <span>
                Last updated: {new Date(appData.updated_at).toLocaleString()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
