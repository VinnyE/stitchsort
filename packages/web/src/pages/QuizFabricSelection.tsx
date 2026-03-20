import { useState } from "react";
import { Link } from "react-router-dom";
import TopNav from "../components/TopNav";
import Footer from "../components/Footer";
import BottomNav from "../components/BottomNav";

const FABRIC_OPTIONS = [
  {
    icon: "eco",
    title: "Cotton & Linen",
    desc: "Natural, breathable fibers perfect for dressmaking and light home decor.",
    size: "large",
  },
  {
    icon: "layers",
    title: "Denim & Canvas",
    desc: "Heavy-duty textiles requiring robust piercing power and reinforced seams.",
    size: "large",
  },
  {
    icon: "texture",
    title: "Knits & Stretch",
    desc: "Jersey, spandex, and activewear with high elasticity.",
    size: "small",
  },
  {
    icon: "diamond",
    title: "Specialty",
    desc: "Leather, vinyl, and technical outdoor fabrics.",
    size: "small",
  },
  {
    icon: "grid_view",
    title: "Mixed",
    desc: "An even blend of various weight and fiber types.",
    size: "small",
  },
];

const TOTAL_STEPS = 7;
const CURRENT_STEP = 2;

export default function QuizFabricSelection() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="bg-surface text-on-surface font-body min-h-screen flex flex-col">
      <TopNav />

      <main className="flex-grow pt-24 pb-32 px-6 max-w-4xl mx-auto w-full">
        {/* Progress Tracker */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-4">
            <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
              Step {CURRENT_STEP} of {TOTAL_STEPS}
            </span>
            <span className="font-label text-xs text-on-surface/50 italic">
              Material Compatibility
            </span>
          </div>
          <div className="relative h-[2px] w-full bg-surface-container-high">
            <div
              className="absolute top-0 left-0 h-full bg-primary transition-all duration-700 ease-in-out"
              style={{ width: `${(CURRENT_STEP / TOTAL_STEPS) * 100}%` }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-1">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2.5 h-2.5 rounded-full border-4 border-surface ${
                    i < CURRENT_STEP
                      ? "bg-primary"
                      : "bg-surface-container-high"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Question Header */}
        <div className="mb-12 text-center">
          <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-4">
            What fabrics will you use most?
          </h1>
          <p className="font-body text-on-surface-variant max-w-lg mx-auto italic">
            Selecting your primary materials helps us calibrate the motor torque
            and needle recommendations.
          </p>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {FABRIC_OPTIONS.map((opt) => {
            const isLarge = opt.size === "large";
            const isSelected = selected === opt.title;
            return (
              <button
                key={opt.title}
                onClick={() => setSelected(opt.title)}
                className={`${isLarge ? "md:col-span-3" : "md:col-span-2"} group relative flex flex-col items-start p-8 transition-all duration-300 text-left rounded-sm ${
                  isSelected
                    ? "bg-surface-container-high ring-2 ring-primary"
                    : "bg-surface-container-low hover:bg-surface-container-high"
                }`}
              >
                <span className="material-symbols-outlined text-primary mb-6 text-3xl">
                  {opt.icon}
                </span>
                <h3
                  className={`font-headline ${isLarge ? "text-2xl" : "text-xl"} mb-2`}
                >
                  {opt.title}
                </h3>
                <p
                  className={`${isLarge ? "text-sm" : "text-xs"} text-on-surface-variant leading-relaxed`}
                >
                  {opt.desc}
                </p>
                <div
                  className={`mt-${isLarge ? "8" : "4"} flex items-center ${isLarge ? "text-xs" : "text-[10px]"} font-label uppercase tracking-widest text-primary ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}
                >
                  {isSelected ? "Selected" : "Select Material"}
                  {isLarge && (
                    <span className="material-symbols-outlined text-sm ml-2">
                      {isSelected ? "check" : "arrow_forward"}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center gap-2 text-on-surface/50 hover:text-primary transition-colors py-2 group no-underline"
          >
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="font-label text-sm uppercase tracking-widest">
              Back
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="hidden md:block text-xs italic text-on-surface-variant">
              Press 'Enter' to confirm selection
            </span>
            <Link
              to="/results"
              className="bg-primary text-on-primary px-10 py-4 rounded-sm font-label uppercase tracking-widest text-xs hover:bg-primary-container transition-all active:scale-95 no-underline"
            >
              Continue
            </Link>
          </div>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
