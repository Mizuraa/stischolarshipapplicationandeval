import { Link } from "react-router-dom";

export default function Scholarships() {
  return (
    <section className="max-w-7xl mx-auto py-12 px-6 lg:px-20 w-full">
      <div className="mb-8">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded">
          Find your Support
        </span>
        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          Scholarships & Partner assistance
        </h2>
        <p className="text-xs text-gray-500 mt-1">
          Choose one program in your application. Only that program's applicable
          requirements are requested.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            tag: "Renewal / Retention",
            title: "Tertiary Open Scholarship",
            desc: "Requires GWA of 92 or higher, no grades below 87, and zero financial accountabilities.",
          },
          {
            tag: "Partner Program",
            title: "Alumni Scholarship",
            desc: "Senior High-school alumni requirements apply. Confirm supporting records with your campus Registrar.",
          },
          {
            tag: "Partner Assistance",
            title: "Pag-IBIG Educational Assistance",
            desc: "Available for Loyalty or Loyalty Plus cardholders and qualified dependents with verified contract.",
          },
          {
            tag: "Partner Assistance",
            title: "GSIS Educational Assistance",
            desc: "Available for members, pensioners, or qualified survivors with UMID card verification.",
          },
          {
            tag: "Academic Honors",
            title: "President's Honors List",
            desc: "Regular academic load with GWA of 1.5 or higher and no grades lower than 2.0.",
          },
          {
            tag: "Family Grant",
            title: "Sibling Scholarship",
            desc: "Tuition discount for families with multiple enrolled siblings in STI programs.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded">
                {item.tag}
              </span>
              <h3 className="text-base font-bold text-slate-900 mt-3">
                {item.title}
              </h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {item.desc}
              </p>
            </div>
            <Link
              to="/Requirements"
              className="mt-6 text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              View applicable requirements &rarr;
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
