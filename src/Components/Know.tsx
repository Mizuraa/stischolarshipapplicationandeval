export default function Know() {
  const steps = [
    {
      num: "01",
      title: "Prepare",
      desc: "Gather your promo grade and requisite identification slip for fast-track submission.",
    },
    {
      num: "02",
      title: "Complete",
      desc: "Fill out the online application, scholarship questionnaire, and required statement form.",
    },
    {
      num: "03",
      title: "Review & submit",
      desc: "Validate your credentials, double-check uploads, and formally release the final application.",
    },
    {
      num: "04",
      title: "Campus evaluation",
      desc: "The evaluation committee checks your records. Review email updates for available scholarship slots.",
    },
  ];

  return (
    <section className="bg-white py-12 px-6 lg:px-20 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">
          Know what comes next.
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-xl p-5 shadow-sm"
            >
              <div className="w-8 h-8 rounded bg-yellow-400 text-slate-900 font-bold text-xs flex items-center justify-center mb-3">
                {step.num}
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl flex items-start gap-3">
          <span className="text-amber-600 font-bold text-sm">💡</span>
          <p className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold">Guidance note:</strong> Please
            make sure all uploaded documents are clear and in digital format.
            Processing time takes between 3 to 5 working days from submission of
            complete requirements.
          </p>
        </div>
      </div>
    </section>
  );
}
