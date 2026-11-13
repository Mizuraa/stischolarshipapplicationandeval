import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all student applications
  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      const { data, error } = await supabase
        .from("Application")
        .select(
          `
          *,
          STUDENT_INFO (
            Student_Name,
            Student_Email,
            Program,
            Year_Level
          )
        `,
        )
        .order("Created_at", { ascending: false });

      if (error) {
        console.error("Error fetching applications:", error);
      } else {
        setApplications(data || []);
      }
      setLoading(false);
    }

    fetchApplications();
  }, []);

  // Update application status (Reviewer / Validator actions)
  const updateStatus = async (
    appId: string,
    newStatus: string,
    notesField?: string,
    notesValue?: string,
  ) => {
    const updatePayload: any = {
      Status: newStatus,
      Updated_at: new Date().toISOString(),
    };
    if (notesField && notesValue) {
      updatePayload[notesField] = notesValue;
    }

    const { error } = await supabase
      .from("Application")
      .update(updatePayload)
      .eq("id", appId);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, Status: newStatus } : app,
        ),
      );
      alert(`Application status updated to: ${newStatus}`);
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500">
        Loading evaluation queue...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 text-slate-800">
      <div className="flex justify-between items-center mb-8">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 px-2.5 py-1 rounded">
            Committee Portal
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
            Reviewer & Validator Evaluation Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage student application pipelines, run automated checks, and
            issue final decisions.
          </p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase tracking-wider">
              <tr>
                <th className="p-4">Student Name</th>
                <th className="p-4">Program</th>
                <th className="p-4">Scholarship Type</th>
                <th className="p-4">Current Status</th>
                <th className="p-4 text-right">Pipeline Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="p-6 text-center text-slate-400 italic"
                  >
                    No applications found in the database.
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const student = app.STUDENT_INFO || {};
                  const formData = app.Form_Data || {};

                  return (
                    <tr
                      key={app.id}
                      className="hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="p-4 font-semibold text-slate-900">
                        {student.Student_Name || "Unnamed Student"}
                        <div className="text-[11px] font-normal text-slate-500">
                          {student.Student_Email}
                        </div>
                      </td>
                      <td className="p-4 font-medium text-slate-700">
                        {student.Program || formData.enrolledProgram || "N/A"}
                        <div className="text-[10px] text-slate-400">
                          {student.Year_Level}
                        </div>
                      </td>
                      <td className="p-4 text-slate-600">
                        {formData.selectedProgram || app.Application_Type}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                            app.Status === "approved"
                              ? "bg-green-100 text-green-800"
                              : app.Status === "declined"
                                ? "bg-red-100 text-red-800"
                                : app.Status === "under_review"
                                  ? "bg-blue-100 text-blue-800"
                                  : app.Status === "pending_validation"
                                    ? "bg-purple-100 text-purple-800"
                                    : app.Status === "pending_ai_check"
                                      ? "bg-amber-100 text-amber-800"
                                      : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {app.Status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {app.Status === "pending_ai_check" && (
                          <button
                            onClick={() => updateStatus(app.id, "under_review")}
                            className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            Pass AI Check &rarr; Review
                          </button>
                        )}

                        {app.Status === "under_review" && (
                          <button
                            onClick={() =>
                              updateStatus(app.id, "pending_validation")
                            }
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                          >
                            Verify &rarr; Send to Validator
                          </button>
                        )}

                        {app.Status === "pending_validation" && (
                          <>
                            <button
                              onClick={() => updateStatus(app.id, "approved")}
                              className="bg-green-600 hover:bg-green-700 text-white font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(app.id, "declined")}
                              className="bg-red-600 hover:bg-red-700 text-white font-medium px-3 py-1.5 rounded-lg transition cursor-pointer"
                            >
                              Decline
                            </button>
                          </>
                        )}

                        {(app.Status === "approved" ||
                          app.Status === "declined") && (
                          <span className="text-slate-400 italic text-[11px]">
                            Decision Finalized
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
