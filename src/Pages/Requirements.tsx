export default function Requirements() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-20 text-slate-800">
      <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
        Scholarship Requirements & Checklist
      </h1>
      <p className="text-sm text-gray-600 mb-8">
        Official document checklist for renewal and scholarship applications at
        STI College Ortigas-Cainta.
      </p>

      <div className="space-y-8">
        {/* Sibling Scholarship */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
            Family Grant
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-3 mb-4">
            Sibling Scholarship (New & Renewal)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs text-gray-700">
            <li>
              <strong>
                Fully Accomplished SAF (Scholarship Application Form):
              </strong>{" "}
              Filled out legibly without erasures using a black pen.
            </li>
            <li>
              <strong>Copy of PSA Birth Certificate / Adoption Papers:</strong>{" "}
              Required for new applicants to prove consanguinity.
            </li>
            <li>
              <strong>Printed Copy of Student Grade Report:</strong> Required
              for renewal applicants retrieved from the PSCS system.
            </li>
          </ul>
        </div>

        {/* Alumni Scholarship */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">
            School Initiative
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-3 mb-4">
            Alumni Scholarship (New & Renewal)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs text-gray-700">
            <li>
              <strong>Fully Accomplished SAF:</strong> Complete and signed
              scholarship application form.
            </li>
            <li>
              <strong>SHS Report Card / Junior High School Report Card:</strong>{" "}
              Required for incoming new freshman applicants.
            </li>
            <li>
              <strong>PSCS Student Grade Report:</strong> Required for renewal
              applicants showing no grades below 2.5, no dropped courses, and no
              disciplinary actions.
            </li>
          </ul>
        </div>

        {/* President's Honors List */}
        <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-sm">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-widest bg-purple-50 px-2.5 py-1 rounded">
            Academic Honors
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-3 mb-4">
            President's Honors List (New & Renewal)
          </h2>
          <ul className="list-disc list-inside space-y-2 text-xs text-gray-700">
            <li>
              <strong>Fully Accomplished SAF:</strong> Complete scholarship
              application/renewal form.
            </li>
            <li>
              <strong>PSCS Student Grade Report:</strong> Showing regular
              academic load per curriculum, GWA of 1.5 or higher (or 90+ for
              SHS), and no grades lower than 2.0 (or 87 for SHS).
            </li>
            <li>
              <strong>PE & NSTP Grades:</strong> Must not be less than 1.50.
            </li>
            <li>
              <strong>Standing Check:</strong> No DRP/INC grades in previous
              loads and absolute absence of any disciplinary actions.
            </li>
            <li>
              <strong>Certificate of Recognition:</strong> Required for new
              applicants as a President's Honors List awardee.
            </li>
          </ul>
        </div>

        {/* Open Scholarships & Partner Assistance */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">
              Open Grant
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-3 mb-2">
              Tertiary & SHS Open Scholarship
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-700">
              <li>Fully Accomplished SAF</li>
              <li>Entrance Examination Result (90+ score)</li>
              <li>Printed Student Grade Report / Report Card</li>
              <li>GWA of 92+ / No grades below 87 / Conduct grade of 90+</li>
            </ul>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">
              Partner Assistance
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-3 mb-2">
              Pag-IBIG & GSIS Educational Assistance
            </h3>
            <ul className="list-disc list-inside space-y-1.5 text-xs text-gray-700">
              <li>Verified Loyalty/Plus Card or UMID Card</li>
              <li>Photocopy of card with signature</li>
              <li>Consanguinity/Affinity Certification</li>
              <li>Notarized Affirmation & Undertaking</li>
              <li>Signed Scholarship Contract</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
