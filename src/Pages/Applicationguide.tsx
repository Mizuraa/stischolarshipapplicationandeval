export default function Applicationguide() {
  const downloadResources = [
    {
      title: "Scholarship Application Form (SAF)",
      desc: "Official printable form for physical and manual submissions.",
      href: "https://drive.google.com/file/d/14auU-hMsqCeCCHSvgxW3gTpwcAfTChc5/view",
    },
    {
      title: "GSIS Educational Assistance",
      desc: "Application and requirement checklist for GSIS beneficiaries.",
      href: "https://drive.google.com/file/d/1ayh0_rjbO23DjWdr_NVnXPqNmlWMqTO5/view",
    },
    {
      title: "Pag-IBIG Educational Assistance",
      desc: "Application form and undertaking for Pag-IBIG cardholders.",
      href: "https://drive.google.com/file/d/1YReUIaSKsk4VU7eE3wxJHSFrDEGBa-ED/view",
    },
  ];

  const steps = [
    {
      num: "01",
      title: "Verify Eligibility",
      desc: "Check academic thresholds (GWA and grade minimums) and pull your PSCS grade report.",
    },
    {
      num: "02",
      title: "Choose Path",
      desc: "Apply digitally via the portal, or download and print physical forms for manual filing.",
    },
    {
      num: "03",
      title: "Submit Requirements",
      desc: "Upload scans (PDF/Image under 5MB) online or submit physical packets to admissions.",
    },
    {
      num: "04",
      title: "Track Evaluation",
      desc: "Monitor status updates in real-time through your dashboard or await confirmation.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 lg:px-20 text-slate-800 animate-fadeIn space-y-10">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest bg-blue-50 px-2.5 py-1 rounded">
          Onsite & Online Workflow
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 mt-2">
          Scholarship Application Guide & Downloads
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Complete your application via our digital portal or download printable
          documents for physical submission at STI College Ortigas-Cainta.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="w-8 h-8 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center mb-4">
                {step.num}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {step.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-xs space-y-6">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">
            Printable Resources
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-2">
            Downloadable PDF Forms
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Required for traditional manual filing or physical verification at
            the campus registrar.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {downloadResources.map((doc, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between hover:border-blue-300 transition"
            >
              <div>
                <h3 className="font-bold text-slate-900 text-xs mb-1">
                  {doc.title}
                </h3>
                <p className="text-[11px] text-slate-600 leading-relaxed mb-4">
                  {doc.desc}
                </p>
              </div>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
              >
                <span>Download PDF</span>
                <span>&rarr;</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
