import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function AdminDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchApplications() {
      setLoading(true);
      // Lean column selection for performance optimization
      const { data, error } = await supabase
        .from("Application")
        .select(
          `
          id,
          Status,
          Form_Data,
          Created_at,
          STUDENT_INFO (
            Student_Name,
            Student_Email,
            Program
          )
        `,
        )
        .order("Created_at", { ascending: false });

      if (!error) {
        setApplications(data || []);
      }
      setLoading(false);
    }
    fetchApplications();
  }, []);

  const updateStatus = async (appId: string, newStatus: string) => {
    const { error } = await supabase
      .from("Application")
      .update({ Status: newStatus, Updated_at: new Date().toISOString() })
      .eq("id", appId);

    if (error) {
      alert("Failed to update: " + error.message);
    } else {
      setApplications((prev) =>
        prev.map((app) =>
          app.id === appId ? { ...app, Status: newStatus } : app,
        ),
      );
    }
  };

  if (loading) {
    return (
      <div className="p-12 text-center text-slate-500 text-xs">
        Loading committee queue...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-20 py-12 text-slate-800">
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
        Reviewer & Validator Dashboard
      </h1>
      <p className="text-xs text-slate-500 mb-8">
        Manage student application pipelines and approvals.
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold uppercase">
              <tr>
                <th className="p-4">Student</th>
                <th className="p-4">Program</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {applications.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="p-6 text-center text-slate-400 italic"
                  >
                    No applications found.
                  </td>
                </tr>
              ) : (
                applications.map((app) => {
                  const student = app.STUDENT_INFO || {};
                  const formData = app.Form_Data || {};
                  return (
                    <tr key={app.id} className="hover:bg-slate-50/50">
                      <td className="p-4 font-semibold text-slate-900">
                        {student.Student_Name || "Applicant"}
                        <div className="text-[11px] font-normal text-slate-500">
                          {student.Student_Email}
                        </div>
                      </td>
                      <td className="p-4 text-slate-700">
                        {student.Program || formData.enrolledProgram || "N/A"}
                      </td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-blue-50 text-blue-700">
                          {app.Status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="p-4 text-right space-x-2">
                        {app.Status === "pending_ai_check" && (
                          <button
                            onClick={() => updateStatus(app.id, "under_review")}
                            className="bg-amber-600 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Pass AI &rarr; Review
                          </button>
                        )}
                        {app.Status === "under_review" && (
                          <button
                            onClick={() =>
                              updateStatus(app.id, "pending_validation")
                            }
                            className="bg-blue-600 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                          >
                            Verify &rarr; Validate
                          </button>
                        )}
                        {app.Status === "pending_validation" && (
                          <>
                            <button
                              onClick={() => updateStatus(app.id, "approved")}
                              className="bg-green-600 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateStatus(app.id, "declined")}
                              className="bg-red-600 text-white px-3 py-1.5 rounded-lg cursor-pointer"
                            >
                              Decline
                            </button>
                          </>
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
