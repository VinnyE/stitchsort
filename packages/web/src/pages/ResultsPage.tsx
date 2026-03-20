import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const RESULTS = [
  {
    name: "Brother CS7000X",
    price: "$180 - $220",
    matchScore: 94,
    isBestMatch: true,
    tags: [
      "Handles cotton garments",
      "Beginner-friendly computerized",
      "Under $300 budget",
    ],
    desc: 'This machine perfectly aligns with your focus on lightweight garment construction. Its intuitive needle threader and speed control provide the "low noise" learning environment you requested.',
    caveatTitle: "Watch out for",
    caveat:
      "Struggles with heavy layers of denim or upholstery fabrics.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCLq4TaqfR0NCzrZdHI4ZOiHK_hsU3YXArULgbm-PTeVC7ylBR47LGrPdvBBuQi7wzoTuQEv8K1FP4KIRxitjqrsV6lr4mF_9s8Ecefoj4E6sEy3qIblM9aFvzGCXWXBNwgDlITA6ToXdPiqaKvY3OUxf4hOyLQ3QsInzhe-O2gKOtLR-q8eCMLYG2JdUp0dsnOuLgqcUAWeN6mCwof7g6jsz1VWM_i-XqHUpxRgPHVWvW1rPVxYkMOfUkt61LLtcIyQ_naOW-PoYw",
    links: [
      { label: "View on Amazon", primary: true },
      { label: "SewingMachinesPlus", primary: false },
    ],
  },
  {
    name: "Singer 4423 Heavy Duty",
    price: "$170 - $200",
    matchScore: 88,
    isBestMatch: false,
    tags: ["Heavy fabrics", "Mechanical simplicity"],
    desc: "A powerhouse alternative if you anticipate working with thicker canvas or multiple layers of quilting. It trades digital convenience for raw mechanical power and speed.",
    caveatTitle: "Tradeoff",
    caveat:
      "Can be noticeably loud at high speeds, lacking the refinement of computerized models.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBqiKNdlbjQYzNP5VbDGc-jnTNAH5wHmvBAF8S0gJ1hmgG5D2uPgcDU4G6W97PrY21bAw1H27fp-V5g_ADjexCO4N_X89Xux3QrHr2fByiY59vcJD5mjsx_Bw8z0Udkt-2tpxIdi9dOZS4LsH159_5u3yb6dhWfFovY7mOkSsNkuTKdnXiQTmvASUCDhbAMHD-k2QyoncDGshot0fCg8S8CKLGvWjMnNF8hN0Ep7gs-Wm9S2aX_8xfKdFfYjkpkStVIG233heAgLUo",
    links: [{ label: "View on Amazon", primary: true }],
  },
  {
    name: "Brother XM2701",
    price: "$120 - $140",
    matchScore: 82,
    isBestMatch: false,
    tags: ["Great for simple repairs"],
    desc: "An excellent entry point if you primarily want to handle mending or simple home decor projects. It's lightweight and easy to store in small spaces.",
    caveatTitle: "Tradeoff",
    caveat:
      "Significantly fewer stitch options and decorative patterns compared to your top match.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA6oHneENOt3RUQgXWVSEpj6O123NVu2mkIW1m7rPTJ8mrRFvJpdIxmKK0YXsILy_vtulXo_NVJKVi0-wO4EUGB_cRPpfJSe8kpgO5EcFM1X3A4n2IPUzSu974qSj7ZRD6I4wwqLrTFYuj65gXZwinnXZYw9QJb0_QWHC1AA9Lfy0e4Ffgc6KlpjPjILkvbf9XiOt2ESB_YOV2QlpfF3b9-0lsTBNgSaBEOWB8a4sRHWgrpD2IOECi8lYj-6lGYIG6P1mjXEYzN8-c",
    links: [{ label: "View on Amazon", primary: true }],
  },
];

const COMPARISON_ROWS = [
  {
    label: "Typical Price",
    values: ["$180-$220", "$170-$200", "$120-$140"],
  },
  {
    label: "Fabric Handling",
    values: ["Delicates to Medium", "Medium to Heavy", "Lightweight Only"],
  },
  {
    label: "Throat Space",
    values: ['6.4" (Standard)', '6.0" (Compact)', '5.8" (Small)'],
  },
  {
    label: "Bobbin Type",
    values: [
      "Top Drop-in (Clear)",
      "Top Drop-in (Clear)",
      "Top Drop-in (Clear)",
    ],
  },
];

export default function ResultsPage() {
  return (
    <div className="bg-background text-on-surface selection:bg-primary-container selection:text-on-primary-container">
      <TopNav />

      <main className="pt-32 pb-24 px-6 max-w-5xl mx-auto">
        {/* Results Header */}
        <section className="mb-16 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <span className="font-label uppercase tracking-widest text-secondary text-xs font-semibold">
                Curated Selection
              </span>
              <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight">
                Based on your answers, here are your top 3 matches.
              </h1>
            </div>
          </div>
          <div className="mt-12 bg-surface-container-low p-4 rounded-sm">
            <p className="font-body text-sm text-on-surface-variant italic">
              <span className="material-symbols-outlined align-middle text-sm mr-1">
                info
              </span>
              Independent recommendations: We may earn a commission if you
              purchase through our links at no extra cost to you.
            </p>
          </div>
        </section>

        {/* Recommendation Cards */}
        <div className="space-y-12">
          {RESULTS.map((result) => (
            <article
              key={result.name}
              className="bg-surface-container-low group overflow-hidden flex flex-col md:flex-row gap-8 transition-colors duration-300 hover:bg-surface-container-high relative"
            >
              {result.isBestMatch && (
                <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-sm text-xs font-bold tracking-widest uppercase z-10">
                  Best Match
                </div>
              )}
              <div className="w-full md:w-2/5 aspect-square bg-surface-container-highest overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={result.name}
                  src={result.image}
                />
              </div>
              <div className="w-full md:w-3/5 p-8 md:pl-0 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h2 className="font-headline text-3xl text-on-surface">
                        {result.name}
                      </h2>
                      <p className="text-secondary font-medium mt-1">
                        {result.price}
                      </p>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-3xl font-headline ${result.isBestMatch ? "text-primary" : "text-on-surface-variant"}`}
                      >
                        {result.matchScore}%
                      </div>
                      <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                        Match Score
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[11px] font-bold rounded-sm border border-outline-variant/20 uppercase tracking-tighter"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
                    {result.desc}
                  </p>
                  <div
                    className={`${result.isBestMatch ? "bg-secondary-container/10 border-l-2 border-secondary" : "bg-surface-container-highest"} p-4 mb-8`}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider text-on-secondary-container mb-1">
                      {result.caveatTitle}
                    </p>
                    <p className="text-sm text-on-secondary-container">
                      {result.caveat}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mt-auto">
                  {result.links.map((link) =>
                    link.primary ? (
                      <button
                        key={link.label}
                        className="bg-primary text-on-primary px-6 py-3 rounded-sm text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        {link.label}
                        <span className="material-symbols-outlined text-sm">
                          open_in_new
                        </span>
                      </button>
                    ) : (
                      <button
                        key={link.label}
                        className="bg-transparent border border-outline-variant/30 text-primary px-6 py-3 rounded-sm text-sm font-semibold hover:bg-surface-container-highest transition-colors cursor-pointer"
                      >
                        {link.label}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Comparison Table */}
        <section className="mt-32">
          <h2 className="font-headline text-3xl mb-12">
            Side-by-Side Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body text-sm">
              <thead>
                <tr className="bg-surface-container">
                  <th className="p-6 font-semibold uppercase tracking-widest text-[10px]">
                    Specification
                  </th>
                  <th className="p-6 font-headline text-lg border-l border-outline-variant/10">
                    CS7000X
                  </th>
                  <th className="p-6 font-headline text-lg border-l border-outline-variant/10">
                    4423 Heavy Duty
                  </th>
                  <th className="p-6 font-headline text-lg border-l border-outline-variant/10">
                    XM2701
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="p-6 font-medium text-on-surface-variant">
                      {row.label}
                    </td>
                    {row.values.map((val, i) => (
                      <td
                        key={i}
                        className="p-6 border-l border-outline-variant/10"
                      >
                        {val}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-24 text-center py-16 bg-surface-container-low rounded-sm">
          <h3 className="font-headline text-2xl mb-4">
            Not quite what you were looking for?
          </h3>
          <p className="font-body text-on-surface-variant mb-8 max-w-md mx-auto">
            Update your preferences to see a new set of curated machines
            tailored to your project goals.
          </p>
          <Link
            to="/quiz"
            className="bg-secondary text-on-secondary px-8 py-4 rounded-sm font-semibold inline-flex items-center gap-2 hover:opacity-90 transition-opacity no-underline"
          >
            <span className="material-symbols-outlined text-sm">refresh</span>
            Retake Quiz
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
