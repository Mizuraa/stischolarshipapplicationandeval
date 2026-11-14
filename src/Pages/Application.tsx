import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Tracker from "../Components/Tracker";

export default function Application() {
  const navigate = useNavigate();
  const [applicantType, setApplicantType] = useState<"new" | "old">("new");
  const [academicLevel, setAcademicLevel] = useState("Tertiary");
  const [selectedProgram, setSelectedProgram] = useState(
    "Tertiary Open Scholarship",
  );
  const [enrolledProgram, setEnrolledProgram] = useState("BSIT");
  const [term, setTerm] = useState("Term 1");
  const [academicYear, setAcademicYear] = useState("2026-2027");
  const [loading, setLoading] = useState(false);
  const [lookupMessage, setLookupMessage] = useState<string>("");
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  // Scholarship history for old/returning students
  const [scholarshipHistory, setScholarshipHistory] = useState<
    Array<{
      syTerm: string;
      type: string;
      coverage: string;
      percentage: string;
      remarks: string;
    }>
  >([]);

  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    middleName: "",
    studentNumber: "",
    contactNumber: "",
    permanentAddress: "",
    email: "",
    // Partner Program Fields (GSIS / Pag-IBIG)
    classification: "Member",
    memberName: "",
    memberCardNo: "",
    memberRelationship: "",
  });

  const [gradeFile, setGradeFile] = useState<File | null>(null);

  // Returning student lookup via Student Number (Old Student Path)
  const handleStudentNumberBlur = async () => {
    if (applicantType !== "old") return;
    const studentNum = formData.studentNumber.trim();
    if (!studentNum) return;

    setLookupMessage("Checking student records for auto-fill...");

    const { data, error } = await supabase
      .from("student_info")
      .select(
        "student_name, program, contact_number, student_email, address, scholarship_history",
      )
      .eq("student_number", studentNum)
      .maybeSingle();

    if (!error && data) {
      const nameParts = data.student_name
        ? data.student_name.trim().split(" ")
        : ["", "", ""];
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        middleName: nameParts.length > 2 ? nameParts[1] : "",
        lastName:
          nameParts.length > 2
            ? nameParts[nameParts.length - 1]
            : nameParts[1] || "",
        contactNumber: data.contact_number || prev.contactNumber,
        permanentAddress: data.address || prev.permanentAddress,
        email: data.student_email || prev.email,
      }));
      if (data.program) setEnrolledProgram(data.program);
      if (data.scholarship_history) {
        setScholarshipHistory(data.scholarship_history);
      }
      setLookupMessage("Returning student record found! Details auto-filled.");
    } else {
      setLookupMessage("No existing record found for this Student Number.");
    }

    setTimeout(() => setLookupMessage(""), 4000);
  };

  const isSHSOnly = academicLevel === "Senior High School";
  const isGSIS = selectedProgram === "GSIS Educational Assistance";
  const isPagIBIG = selectedProgram === "Pag-IBIG Educational Assistance";

  const handleLevelChange = (level: string) => {
    setAcademicLevel(level);
    if (level === "Senior High School") {
      setSelectedProgram("SHS Open Scholarship");
      setEnrolledProgram("ABM");
    } else {
      setSelectedProgram("Tertiary Open Scholarship");
      setEnrolledProgram("BSIT");
    }
  };

  const handleInputChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    [],
  );

  const handleFileValidation = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (f: File | null) => void,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert(
        "File size exceeds 5MB limit. Please upload a compressed document.",
      );
      e.target.value = "";
      return;
    }
    setFile(file);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentNumber) {
      alert("Please provide your Student Number.");
      return;
    }

    setLoading(true);

    try {
      let gradeUrl = "";

      if (gradeFile) {
        const fileExt = gradeFile.name.split(".").pop();
        const fileName = `${formData.studentNumber}/Grades_${Date.now()}.${fileExt}`;
        const { error } = await supabase.storage
          .from("scholarship-docs")
          .upload(fileName, gradeFile, { upsert: true });
        if (error) throw error;
        const { data } = supabase.storage
          .from("scholarship-docs")
          .getPublicUrl(fileName);
        gradeUrl = data.publicUrl;
      }

      const payloadData = {
        applicantType,
        academicLevel,
        selectedProgram,
        enrolledProgram,
        term,
        academicYear,
        scholarshipHistory: applicantType === "old" ? scholarshipHistory : [],
        formData: { ...formData, gradeUrl },
      };

      // Upsert student info
      await supabase.from("student_info").upsert(
        {
          student_number: formData.studentNumber,
          student_name:
            `${formData.firstName} ${formData.middleName} ${formData.lastName}`
              .replace(/\s+/g, " ")
              .trim(),
          student_email: formData.email,
          program: enrolledProgram,
          contact_number: formData.contactNumber,
          address: formData.permanentAddress,
        },
        { onConflict: "student_number" },
      );

      // Insert/Upsert application into evaluation pipeline
      const { error: appError } = await supabase.from("application").upsert(
        {
          student_number: formData.studentNumber,
          status: "Pending Filter",
          form_data: payloadData,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "student_number" },
      );

      if (appError) throw appError;

      setSubmittedSuccessfully(true);
    } catch (err: any) {
      alert("Error submitting application: " + (err.message || err));
    } finally {
      setLoading(false);
    }
  };

  if (submittedSuccessfully) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-6 text-center animate-fadeIn">
        <div className="bg-white border border-slate-300 rounded-xl p-10 shadow-sm space-y-6">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            Application Successfully Submitted!
          </h1>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your Scholarship Application Form (SAF) has been submitted
            successfully. It is now queued for automated requirement filtering,
            checker review, and validator approval.
          </p>
          <div className="pt-4 flex items-center justify-center gap-3">
            <button
              onClick={() => navigate("/tracker")}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs py-3 px-6 rounded transition shadow cursor-pointer"
            >
              Track Your Application Status &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-6 text-slate-800 font-sans">
      <div className="bg-white border-2 border-slate-800 rounded-lg p-8 shadow-md">
        {/* Form Header */}
        <div className="text-center border-b-2 border-slate-800 pb-6 mb-6">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-600 mb-2">
            <span>STI COLLEGE ORTIGAS-CAINTA</span>
            <span>Ticket No: ___________</span>
          </div>
          <h1 className="text-xl font-extrabold text-blue-900 tracking-wide uppercase">
            Scholarship Application & Renewal Form (SAF)
          </h1>
          <p className="text-[11px] text-slate-600 mt-1 italic">
            Please fill out this form completely. Select your applicant path
            below.
          </p>
        </div>

        {/* Tracker component acting as the New/Old gateway cards */}
        <Tracker
          applicantType={applicantType}
          setApplicantType={setApplicantType}
        />

        <form className="space-y-6 text-xs mt-6" onSubmit={handleFormSubmit}>
          {/* Academic Level, Term (1 or 2), & Program */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 border border-slate-300 rounded">
            <div>
              <span className="block font-bold text-slate-700 mb-1">
                Academic Level:
              </span>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="academicLevel"
                    checked={academicLevel === "Senior High School"}
                    onChange={() => handleLevelChange("Senior High School")}
                  />
                  Senior High School
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer font-medium">
                  <input
                    type="radio"
                    name="academicLevel"
                    checked={academicLevel === "Tertiary"}
                    onChange={() => handleLevelChange("Tertiary")}
                  />
                  Tertiary
                </label>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Term & Academic Year:
              </label>
              <div className="flex gap-2">
                <select
                  value={term}
                  onChange={(e) => setTerm(e.target.value)}
                  className="w-1/2 border border-slate-300 p-1.5 bg-white rounded font-medium"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                </select>
                <input
                  type="text"
                  value={academicYear}
                  onChange={(e) => setAcademicYear(e.target.value)}
                  className="w-1/2 border border-slate-300 p-1.5 bg-white rounded font-medium text-center"
                  placeholder="2026-2027"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Scholarship Program:
              </label>
              <select
                value={selectedProgram}
                onChange={(e) => setSelectedProgram(e.target.value)}
                className="w-full border border-slate-300 p-1.5 bg-white rounded font-medium"
              >
                {isSHSOnly ? (
                  <>
                    <option value="SHS Open Scholarship">
                      SHS Open Scholarship (Renewal/New)
                    </option>
                    <option value="Sibling Scholarship">
                      Sibling Scholarship
                    </option>
                    <option value="GSIS Educational Assistance">
                      GSIS Educational Assistance
                    </option>
                    <option value="Pag-IBIG Educational Assistance">
                      Pag-IBIG Educational Assistance
                    </option>
                  </>
                ) : (
                  <>
                    <option value="Tertiary Open Scholarship">
                      Tertiary Open Scholarship (Renewal/New)
                    </option>
                    <option value="President's Honors List">
                      President's Honors List
                    </option>
                    <option value="Sibling Scholarship">
                      Sibling Scholarship
                    </option>
                    <option value="GSIS Educational Assistance">
                      GSIS Educational Assistance
                    </option>
                    <option value="Pag-IBIG Educational Assistance">
                      Pag-IBIG Educational Assistance
                    </option>
                  </>
                )}
              </select>
            </div>
          </div>

          {/* Section I: Student Details */}
          <div className="border border-slate-300 rounded p-5 space-y-4">
            <div className="flex justify-between items-center border-b border-slate-200 pb-2">
              <h2 className="font-bold text-blue-900 uppercase text-[13px]">
                I. Student Details
              </h2>
              {lookupMessage && (
                <span className="text-blue-700 font-bold animate-pulse text-[11px]">
                  {lookupMessage}
                </span>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Student Number *{" "}
                  {applicantType === "old" && (
                    <span className="text-blue-600 font-bold">
                      (Type & click outside)
                    </span>
                  )}
                </label>
                <input
                  type="text"
                  name="studentNumber"
                  value={formData.studentNumber}
                  onChange={handleInputChange}
                  onBlur={handleStudentNumberBlur}
                  required
                  placeholder={
                    applicantType === "old"
                      ? "Enter student ID"
                      : "Enter student number"
                  }
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="Last Name"
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="First Name"
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Middle Name
                </label>
                <input
                  type="text"
                  name="middleName"
                  value={formData.middleName}
                  onChange={handleInputChange}
                  placeholder="Middle Name"
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Program / Track / Strand *
                </label>
                <select
                  value={enrolledProgram}
                  onChange={(e) => setEnrolledProgram(e.target.value)}
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                >
                  {isSHSOnly ? (
                    <>
                      <option value="ABM">
                        ABM / Business and Entrepreneurship
                      </option>
                      <option value="HUMSS">HUMSS / Academic Track</option>
                      <option value="STEM">STEM (ETM & HAS)</option>
                      <option value="ICT-SCPT">
                        ICT Support & Computer Programming (TVL)
                      </option>
                      <option value="HTTO">Hospitality & Tourism (HTTO)</option>
                      <option value="CADT">
                        Creative Arts & Design Technology (CADT)
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="BSIT">
                        Bachelor of Science in Information Technology (BSIT)
                      </option>
                      <option value="BSCS">
                        Bachelor of Science in Computer Science (BSCS)
                      </option>
                      <option value="BSCPE">
                        Bachelor of Science in Computer Engineering (BSCpE)
                      </option>
                      <option value="BSA">
                        Bachelor of Science in Accountancy (BSA)
                      </option>
                      <option value="BSMA">
                        Bachelor of Science in Management Accounting (BSMA)
                      </option>
                      <option value="BSHM">
                        Bachelor of Science in Hospitality Management (BSHM)
                      </option>
                      <option value="BSTM">
                        Bachelor of Science in Tourism Management (BSTM)
                      </option>
                      <option value="BMMA">
                        Bachelor of Multimedia Arts (BMMA)
                      </option>
                      <option value="BACOMM">
                        Bachelor of Arts in Communication (BACOMM)
                      </option>
                      <option value="BAPSYCH">
                        Bachelor of Arts in Psychology (BAPSYCH)
                      </option>
                      <option value="BSCRIM">
                        Bachelor of Science in Criminology (BSCRIM)
                      </option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Contact Number *
                </label>
                <input
                  type="text"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="09123456789"
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-600 mb-1">
                  Email Address (for Outlook/SMS) *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="student@ortigascainta.sti.edu"
                  className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-600 mb-1">
                Permanent Address *
              </label>
              <input
                type="text"
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                required
                placeholder="House No., Street, Subdivision, Barangay, City/Municipality"
                className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
              />
            </div>
          </div>

          {/* Conditional Partner Program Section: GSIS or Pag-IBIG Form Details */}
          {(isGSIS || isPagIBIG) && (
            <div className="border border-blue-300 bg-blue-50/40 rounded p-5 space-y-4">
              <h2 className="font-bold text-blue-900 uppercase text-[13px] border-b border-blue-200 pb-2">
                {isGSIS
                  ? "GSIS Educational Assistance Program Details"
                  : "Pag-IBIG Educational Assistance Program Details"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Classification / Relation *
                  </label>
                  <select
                    name="classification"
                    value={formData.classification}
                    onChange={handleInputChange}
                    className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                  >
                    {isGSIS ? (
                      <>
                        <option value="GSIS Member">GSIS Member</option>
                        <option value="GSIS Pensioner">GSIS Pensioner</option>
                        <option value="GSIS Dependent">
                          GSIS Dependent (Member/Pensioner)
                        </option>
                        <option value="GSIS Survivor">
                          Qualified Survivor of Deceased GSIS Member
                        </option>
                      </>
                    ) : (
                      <>
                        <option value="Pag-IBIG Loyalty Cardholder">
                          Pag-IBIG Loyalty Cardholder
                        </option>
                        <option value="Pag-IBIG Loyalty Plus Cardholder">
                          Pag-IBIG Loyalty Plus Cardholder
                        </option>
                        <option value="Pag-IBIG Dependent">
                          Dependent of Pag-IBIG Member
                        </option>
                      </>
                    )}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isGSIS
                      ? "GSIS UMID Card Number *"
                      : "Pag-IBIG Loyalty/Loyalty Plus Card Number *"}
                  </label>
                  <input
                    type="text"
                    name="memberCardNo"
                    value={formData.memberCardNo}
                    onChange={handleInputChange}
                    required
                    placeholder={
                      isGSIS
                        ? "Enter UMID card number"
                        : "Enter Loyalty card number"
                    }
                    className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    {isGSIS
                      ? "Name of GSIS Member / Pensioner / Deceased *"
                      : "Name of Pag-IBIG Member / Cardholder *"}
                  </label>
                  <input
                    type="text"
                    name="memberName"
                    value={formData.memberName}
                    onChange={handleInputChange}
                    required
                    placeholder="Full Name of Member"
                    className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Relationship to Member (If Dependent)
                  </label>
                  <input
                    type="text"
                    name="memberRelationship"
                    value={formData.memberRelationship}
                    onChange={handleInputChange}
                    placeholder="e.g., Parent, Spouse, Child"
                    className="w-full border border-slate-300 p-2 rounded bg-white font-medium"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Section II: Scholarship History (Old Students Only) */}
          {applicantType === "old" && (
            <div className="border border-slate-300 rounded p-5 space-y-3 bg-blue-50/30">
              <h2 className="font-bold text-blue-900 uppercase text-[13px] border-b border-slate-200 pb-2">
                II. Scholarship History (Oldest to Latest) — Returning Student
                Record
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse border border-slate-300 bg-white">
                  <thead>
                    <tr className="bg-slate-100 text-[11px] text-slate-700">
                      <th className="border border-slate-300 p-2">
                        SY and TERM
                      </th>
                      <th className="border border-slate-300 p-2">
                        Type of Scholarship
                      </th>
                      <th className="border border-slate-300 p-2">Coverage</th>
                      <th className="border border-slate-300 p-2">
                        Percentage
                      </th>
                      <th className="border border-slate-300 p-2">REMARKS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scholarshipHistory.length > 0 ? (
                      scholarshipHistory.map((item, idx) => (
                        <tr key={idx} className="text-[11px]">
                          <td className="border border-slate-300 p-2">
                            {item.syTerm}
                          </td>
                          <td className="border border-slate-300 p-2">
                            {item.type}
                          </td>
                          <td className="border border-slate-300 p-2">
                            {item.coverage}
                          </td>
                          <td className="border border-slate-300 p-2">
                            {item.percentage}
                          </td>
                          <td className="border border-slate-300 p-2">
                            {item.remarks}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="border border-slate-300 p-3 text-center text-slate-500 italic"
                        >
                          Enter your Student Number above and click outside to
                          load prior scholarship history records.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Section III: Document Attachment (Grade Report) */}
          <div className="border border-slate-300 rounded p-5 space-y-4">
            <h2 className="font-bold text-blue-900 uppercase text-[13px] border-b border-slate-200 pb-2">
              III. Supporting Document Attachment (Grade Report - Max 5MB)
            </h2>
            <div className="border border-slate-200 p-3 rounded bg-slate-50">
              <label className="block font-semibold text-slate-700 mb-1">
                Student Grade Report Document
              </label>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFileValidation(e, setGradeFile)}
                className="text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:bg-blue-100 file:text-blue-800 cursor-pointer"
              />
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded shadow transition cursor-pointer text-xs"
            >
              {loading
                ? "Submitting Application..."
                : "Submit Scholarship Application →"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
