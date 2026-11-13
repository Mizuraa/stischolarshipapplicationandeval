export default function HelpCenter() {
  const faqs = [
    {
      q: "What are the eligibility criteria for the STI scholarship?",
      a: "Applicants must be enrolled as a regular student at STI College Ortigas-Cainta, meet the required grade point average (GPA), and submit all required application documents before the deadline.",
    },
    {
      q: "How will I know if my scholarship application is approved?",
      a: "You can check your application status in real-time through your applicant dashboard. You will also receive an email notification once the evaluation process is completed.",
    },
    {
      q: "Can I edit my submitted application details?",
      a: "Once submitted, applications are locked for review. If you need to make urgent corrections, please contact the scholarship committee directly.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Help Center & Support
      </h1>
      <p className="text-slate-600 mb-8">
        Find answers to common questions regarding scholarship applications,
        requirements, and portal assistance.
      </p>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs"
          >
            <h3 className="font-semibold text-slate-900 text-lg mb-2">
              {faq.q}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
