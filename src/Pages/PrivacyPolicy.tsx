export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn text-slate-700">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">Privacy Policy</h1>
      <p className="text-xs text-slate-400 mb-8">Last updated: November 2026</p>

      <div className="space-y-6 text-sm leading-relaxed">
        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            1. Information We Collect
          </h2>
          <p>
            We collect personal information that you voluntarily provide when
            applying for scholarships, including your full name, student ID,
            contact details, and academic transcripts.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            2. How We Use Your Data
          </h2>
          <p>
            Your data is used strictly for evaluating scholarship eligibility,
            processing educational assistance grants, and communicating updates
            regarding your application status.
          </p>
        </section>

        <section className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h2 className="text-lg font-semibold text-slate-900 mb-2">
            3. Data Protection
          </h2>
          <p>
            We implement strict security protocols and database encryption via
            Supabase to safeguard your personal records against unauthorized
            access.
          </p>
        </section>
      </div>
    </div>
  );
}
