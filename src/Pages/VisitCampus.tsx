export default function VisitCampus() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fadeIn">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Visit Our Campus
      </h1>
      <p className="text-slate-600 mb-8">
        Experience our facilities firsthand at STI College Ortigas-Cainta.
        Schedule a tour or drop by our admissions office.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">
              Campus Location
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Ortigas Avenue Extension, Cainta, Rizal, Philippines
            </p>
            <div className="bg-slate-100 rounded-xl h-40 flex items-center justify-center text-slate-400 text-sm mb-4">
              [Campus Map Preview]
            </div>
          </div>
          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-center bg-blue-600 text-white font-medium py-2.5 rounded-xl hover:bg-blue-700 transition-colors text-sm"
          >
            Open in Google Maps &rarr;
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs">
          <h3 className="font-bold text-slate-900 text-lg mb-2">
            Office Hours
          </h3>
          <ul className="text-sm text-slate-600 space-y-3 mb-6">
            <li className="flex justify-between border-b border-slate-100 pb-2">
              <span>Monday – Friday:</span>
              <span className="font-semibold text-slate-900">
                8:00 AM – 5:00 PM
              </span>
            </li>
            <li className="flex justify-between border-b border-slate-100 pb-2">
              <span>Saturday:</span>
              <span className="font-semibold text-slate-900">
                8:00 AM – 12:00 NN
              </span>
            </li>
            <li className="flex justify-between">
              <span>Sunday:</span>
              <span className="font-semibold text-slate-900">Closed</span>
            </li>
          </ul>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-xs text-blue-800">
            <span className="font-bold">Need assistance?</span> Contact our
            campus admissions hotline directly before dropping by for a guided
            tour.
          </div>
        </div>
      </div>
    </div>
  );
}
