import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import Tracker from "../Components/Tracker";

export default function Application() {
  const [selectedProgram, setSelectedProgram] = useState(
    "Tertiary Open Scholarship",
  );
  const [enrolledProgram, setEnrolledProgram] = useState("BSIT");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string>("draft");

  type ApplicationFormData = {
    lastName: string;
    firstName: string;
    studentNumber: string;
    contactNumber: string;
    academicLevel: string;
    safUrl?: string;
    gradeUrl?: string;
  };

  // Form fields state
  const [formData, setFormData] = useState<ApplicationFormData>({
    lastName: "",
    firstName: "",
    studentNumber: "",
    contactNumber: "",
    academicLevel: "Tertiary",
    safUrl: "",
    gradeUrl: "",
  });

  // File states
  const [safFile, setSafFile] = useState<File | null>(null);
  const [gradeFile, setGradeFile] = useState<File | null>(null);

  // Load existing draft if available
  useEffect(() => {
    async function loadDraft() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("Application")
        .select("*")
        .eq("Student_Id", user.id)
        .maybeSingle();

      if (data) {
        setStatus(data.Status);
        if (data.Form_Data) {
          setSelectedProgram(data.Form_Data.selectedProgram || selectedProgram);
          setEnrolledProgram(data.Form_Data.enrolledProgram || enrolledProgram);
          setFormData(data.Form_Data.formData || formData);
        }
      }
    }
    loadDraft();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Helper to upload files to Supabase Storage
  const uploadFileToSupabase = async (file: File, folder: string) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const fileExt = file.name.split(".").pop();
    const fileName = `${user.id}/${folder}_${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("scholarship-docs")
      .upload(fileName, file, { upsert: true });

    if (uploadError) {
      console.error("Upload error:", uploadError.message);
      return null;
    }

    // Get public URL
    const { data } = supabase.storage
      .from("scholarship-docs")
      .getPublicUrl(fileName);

    return data.publicUrl;
  };

  const persistApplication = async (targetStatus: string) => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please log in to submit your application.");
      setLoading(false);
      return;
    }

    // Upload files if newly selected
    let safUrl = formData.safUrl || "";
    let gradeUrl = formData.gradeUrl || "";

    if (safFile) {
      const uploadedSaf = await uploadFileToSupabase(safFile, "SAF");
      if (uploadedSaf) safUrl = uploadedSaf;
    }

    if (gradeFile) {
      const uploadedGrade = await uploadFileToSupabase(gradeFile, "Grades");
      if (uploadedGrade) gradeUrl = uploadedGrade;
    }

    const payloadData = {
      selectedProgram,
      enrolledProgram,
      formData: { ...formData, safUrl, gradeUrl },
    };

    const { error } = await supabase.from("Application").upsert(
      {
        Student_Id: user.id,
        Status: targetStatus,
        Form_Data: payloadData,
        Updated_at: new Date().toISOString(),
      },
      { onConflict: "Student_Id" },
    );

    if (error) {
      alert("Error saving application: " + error.message);
    } else {
      setStatus(targetStatus);
      alert(
        targetStatus === "draft"
          ? "Draft saved successfully!"
          : "Application submitted successfully! Now undergoing pre-screening.",
      );
    }
    setLoading(false);
  };

  const isEditable = status === "draft" || status === "revision_requested";

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-slate-800 animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
          Active Portal Form
        </span>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-2 mb-2">
          Scholarship Application & Renewal Form (SAF)
        </h1>
        <p className="text-xs text-gray-500 mb-6">
          Please fill out this form completely and attach your required
          documents.
        </p>

        {/* Live Progress Tracker */}
        <Tracker />

        <form
          className="space-y-8 text-xs mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            persistApplication("pending_ai_check");
          }}
        >
          {/* Section I: Program Selection */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <label className="block font-bold text-blue-900 text-sm mb-2">
              1. Select Your Scholarship Program
            </label>
            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              disabled={!isEditable}
              className="w-full border border-slate-300 rounded-lg p-3 bg-white font-medium text-slate-800 cursor-pointer shadow-sm disabled:bg-slate-100"
            >
              <option value="Tertiary Open Scholarship">
                Tertiary Open Scholarship (Renewal/New)
              </option>
              <option value="SHS Open Scholarship">
                SHS Open Scholarship (Renewal/New)
              </option>
              <option value="Sibling Scholarship">
                Sibling Scholarship (Family Grant)
              </option>
              <option value="President's Honors List">
                President's Honors List (Academic Honors)
              </option>
            </select>
          </div>

          {/* Section II: Student Details */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="font-bold text-blue-900 text-sm mb-3">
              II. Student Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white disabled:bg-slate-100"
                />
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Student Number
                </label>
                <input
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white disabled:bg-slate-100"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Enrolled Course / Strand
                </label>
                <select
                  value={enrolledProgram}
                  onChange={(e) => setEnrolledProgram(e.target.value)}
                  disabled={!isEditable}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white disabled:bg-slate-100 cursor-pointer"
                >
                  <option value="BSIT">
                    Bachelor of Science in Information Technology (BSIT)
                  </option>
                  <option value="BSCS">
                    Bachelor of Science in Computer Science (BSCS)
                  </option>
                  <option value="BSCPE">
                    Bachelor of Science in Computer Engineering (BSCpE)
                  </option>
                  <option value="ABM">
                    ABM / Business and Entrepreneurship
                  </option>
                  <option value="STEM">STEM (ETM & HAS)</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-gray-700 mb-1">
                  Contact Number
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  disabled={!isEditable}
                  className="w-full border border-slate-300 rounded-lg p-2.5 bg-white disabled:bg-slate-100"
                />
              </div>
            </div>
          </div>

          {/* Section IV: Document Uploads */}
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
            <h2 className="font-bold text-blue-900 text-sm mb-1">
              IV. Upload Required Documents
            </h2>
            <div className="space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3.5 border border-slate-200 rounded-lg gap-2">
                <span className="font-medium text-slate-700">
                  Scholarship Application Form (SAF)
                </span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  disabled={!isEditable}
                  onChange={(e) =>
                    e.target.files && setSafFile(e.target.files[0])
                  }
                  className="text-[11px] text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-white p-3.5 border border-slate-200 rounded-lg gap-2">
                <span className="font-medium text-slate-700">
                  Student Grade Report / PSCS Record
                </span>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg"
                  disabled={!isEditable}
                  onChange={(e) =>
                    e.target.files && setGradeFile(e.target.files[0])
                  }
                  className="text-[11px] text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {isEditable && (
            <div className="flex items-center justify-end gap-4 pt-2">
              <button
                type="button"
                onClick={() => persistApplication("draft")}
                disabled={loading}
                className="px-5 py-3 rounded-xl border border-slate-300 text-slate-700 font-medium text-xs hover:bg-slate-50 transition cursor-pointer"
              >
                Save Draft
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition shadow-md cursor-pointer"
              >
                Submit Scholarship Application &rarr;
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
