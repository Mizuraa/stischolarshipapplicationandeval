import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Tracker from "../Components/Tracker";

export default function StudentDashboard() {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUserApplication() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("Application")
        .select(
          `
          *,
          STUDENT_INFO (
            Student_Name,
            Program
          )
        `,
        )
        .eq("Student_Id", user.id)
        .maybeSingle();

      if (!error && data) {
        setApplication(data);
      }
      setLoading(false);
    }

    fetchUserApplication();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        Loading your dashboard...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-slate-800 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Applicant Dashboard
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-2">
            Welcome back
            {application?.STUDENT_INFO?.Student_Name
              ? `, ${application.STUDENT_INFO.Student_Name}`
              : ""}
            !
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor your scholarship application pipeline status and committee
            feedback in real-time.
          </p>
        </div>

        <Link
          to="/Application"
          className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition shadow-sm"
        >
          {application
            ? "View / Edit Application Form"
            : "Start New Application"}{" "}
          &rarr;
        </Link>
      </div>

      {!application ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-8 text-center space-y-4">
          <h3 className="font-bold text-slate-900 text-base">
            No Application Found
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            You haven't submitted or saved a scholarship application draft yet.
            Get started by filling out the Application & Renewal Form (SAF).
          </p>
          <Link
            to="/Application"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition"
          >
            Go to Application Form &rarr;
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Live Progress Tracker */}
          <Tracker />

          {/* Application Details Summary Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-slate-900 text-sm border-b pb-3">
              Application Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block mb-1">
                  Scholarship Program
                </span>
                <span className="font-semibold text-slate-700">
                  {application.Form_Data?.selectedProgram || "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">
                  Enrolled Course
                </span>
                <span className="font-semibold text-slate-700">
                  {application.STUDENT_INFO?.Program ||
                    application.Form_Data?.enrolledProgram ||
                    "N/A"}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">
                  Current Status
                </span>
                <span className="font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  {application.Status.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            {/* Reviewer / Validator Feedback Notes */}
            {(application.Reviewer_Notes ||
              application.Validator_Notes ||
              application.Rejection_Reason) && (
              <div className="mt-4 pt-4 border-t bg-amber-50/60 p-4 rounded-xl border border-amber-200 text-xs">
                <h4 className="font-bold text-amber-900 mb-1">
                  Committee Feedback & Notes:
                </h4>
                <p className="text-amber-800 leading-relaxed">
                  {application.Reviewer_Notes ||
                    application.Validator_Notes ||
                    application.Rejection_Reason}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
