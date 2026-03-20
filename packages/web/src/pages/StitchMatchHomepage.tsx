import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";

const STEPS = [
  {
    icon: "quiz",
    title: "Answer questions",
    desc: "Tell us about your projects, skill level, and what features matter most to your sewing journey.",
  },
  {
    icon: "auto_awesome",
    title: "Get matched",
    desc: "Our engine filters through hundreds of specs to find the top 3 machines for your profile.",
  },
  {
    icon: "fact_check",
    title: "See reasoning",
    desc: "Understand the 'why' behind each recommendation with transparent feature breakdowns.",
  },
];

const TRUST_SIGNALS = [
  {
    icon: "verified_user",
    title: "Free & Independent",
    desc: "We don't take brand sponsorships. Our loyalty lies with your craft.",
  },
  {
    icon: "compare_arrows",
    title: "Cross-Brand Comparison",
    desc: "From Bernina to Brother, we analyze every major manufacturer in one place.",
  },
  {
    icon: "visibility",
    title: "Transparent Methodology",
    desc: "See exactly why a machine was matched to your specific needs.",
  },
];

export default function StitchMatchHomepage() {
  return (
    <div className="bg-background text-on-surface font-body selection:bg-secondary-container">
      <TopNav />

      <main className="pt-24">
        {/* Hero Section */}
        <section className="relative px-6 py-24 md:py-40 max-w-7xl mx-auto overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 z-10">
              <div className="mb-6">
                <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold">
                  The Machine Finder
                </span>
              </div>
              <h1 className="font-headline text-5xl md:text-7xl lg:text-8xl text-on-surface leading-[1.1] tracking-tight mb-8">
                Which sewing machine is right for you?
              </h1>
              <p className="font-body text-lg md:text-xl text-on-surface-variant max-w-xl mb-12 leading-relaxed">
                Stop guessing. Start sewing. Find your machine in 90 seconds
                with our independent matching engine.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/quiz"
                  className="bg-primary text-on-primary px-10 py-5 rounded-sm font-body text-lg font-semibold tracking-wide shadow-lg shadow-primary/10 hover:bg-primary-container transition-all flex items-center justify-center gap-3 no-underline"
                >
                  Take the Quiz
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-surface-container-low rounded-xl overflow-hidden relative">
                <img
                  alt="Vintage sewing machine in a sunlit studio"
                  className="w-full h-full object-cover mix-blend-multiply opacity-80"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQqcD47zqVQYB1FGoQ1arXMM9UVlGBhXkxREVFIebxGMUp02x3kTw4EtxduHBLqPQZBt0LREOV569nVqsx8CptqbJ_hN7dap0eKkszS_ybVHnddV2dND4l7t0M4ESfIiK3S4HdQukv-PQR8d7crb__xY1p2dk1mJ0Mr8-OXPpEKhFTXWDStuid50pg4GBComw5thjWck5QxknwKZwjxvnEx_l9CCjNbV5IcocbJmxdK5WwjQuT-KeEQbkPB6xAJKmAE3shFKG0kuk"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent opacity-40" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-l border-b border-outline-variant/30" />
            </div>
          </div>
        </section>

        {/* Trust Signals */}
        <section className="bg-surface-container-low py-20 px-6 border-y border-outline-variant/10">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
              {TRUST_SIGNALS.map((item) => (
                <div key={item.title} className="flex flex-col items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-3xl">
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl mb-2">{item.title}</h3>
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary font-semibold block mb-4">
              Our Process
            </span>
            <h2 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface">
              Designed for clarity.
            </h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Thread Progress Line (Desktop) */}
            <div className="hidden md:block absolute top-10 left-[15%] right-[15%] h-[1.5px] bg-outline-variant/30 z-0">
              <div className="absolute top-[-4px] left-0 w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="absolute top-[-4px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-primary" />
              <div className="absolute top-[-4px] right-0 w-2.5 h-2.5 rounded-full bg-primary" />
            </div>

            {STEPS.map((step) => (
              <div key={step.title} className="relative z-10 group">
                <div className="mb-10 w-20 h-20 bg-surface-container-highest rounded-full flex items-center justify-center mx-auto group-hover:bg-primary group-hover:text-on-primary transition-colors duration-500">
                  <span className="material-symbols-outlined text-3xl">
                    {step.icon}
                  </span>
                </div>
                <div className="text-center">
                  <h4 className="font-headline text-2xl mb-4">{step.title}</h4>
                  <p className="text-on-surface-variant leading-relaxed px-4">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-24 flex justify-center">
            <Link
              to="/results"
              className="bg-surface-container-highest text-primary px-8 py-4 rounded-sm font-body font-semibold hover:bg-primary hover:text-on-primary transition-all duration-300 no-underline"
            >
              Explore the Machine Library
            </Link>
          </div>
        </section>

        {/* CTA Featurette */}
        <section className="mb-32 px-6">
          <div className="max-w-7xl mx-auto bg-primary rounded-xl p-12 md:p-24 relative overflow-hidden flex flex-col items-center text-center text-on-primary">
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDX_ncq9tgbcvVdWDvzNvBMnSFfCJ_MDUHaAyE8yZxXN9QgRwKCAB3pzzmyAM7UftaZneJe_t8iUf5be5zXzYskn5_Wj5Un_RQlv2FmlfFgXB-Oxa3qV3G5lCkcFnaCfOq1pd0TD33oN0Jp3-j5-EzgO2yzdhwH-y18QC6v5_mzOqx2bztIg5amhbtDKR_nr8uc_ruRaINKW5wSLfM7k5pPZ3kXlu6lRHnQi8p9HhEe_H50AqhyuBZpqYBUCA5nBACw1003GUKbDqE')",
              }}
            />
            <h2 className="font-headline text-4xl md:text-6xl mb-8 relative z-10">
              Ready to meet your match?
            </h2>
            <p className="text-primary-fixed-dim text-lg md:text-xl max-w-2xl mb-12 relative z-10">
              Join over 50,000 sewists who found their perfect studio companion
              through StitchMatch.
            </p>
            <Link
              to="/quiz"
              className="bg-surface text-primary px-12 py-5 rounded-sm font-body text-lg font-bold tracking-wide hover:bg-secondary-fixed transition-all relative z-10 shadow-xl no-underline"
            >
              Start Your Search Now
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
