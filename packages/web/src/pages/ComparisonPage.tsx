import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";

export default function ComparisonPage() {
  const { results, hasCompletedQuiz, resetQuiz } = useQuiz();
  const navigate = useNavigate();

  useEffect(() => {
    if (!hasCompletedQuiz) {
      navigate("/quiz");
    }
  }, [hasCompletedQuiz, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!hasCompletedQuiz) return null;

  const topMatch = results[0];
  const specLabels = [
    { key: "price", label: "Price Range" },
    { key: "projectType", label: "Project Type" },
    { key: "fabricHandling", label: "Fabric Handling" },
    { key: "throatSpace", label: "Throat Space" },
    { key: "bestFor", label: "Best For" },
  ] as const;

  return (
    <div className="px-6 max-w-7xl mx-auto pb-32">
      {/* Header */}
      <header className="mb-16">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary mb-3 block">
          Match Comparison
        </span>
        <h1 className="font-headline text-5xl md:text-6xl text-on-background leading-tight max-w-2xl">
          Tailored Results for Your Workshop
        </h1>
        <p className="mt-6 text-on-surface-variant max-w-xl leading-relaxed">
          We've narrowed down the ideal machines for your specific needs.
          Compare the technical specifications and artisanal capabilities of
          your top three matches.
        </p>
      </header>

      {/* Horizontal scroll comparison grid */}
      <div className="overflow-x-auto custom-scrollbar">
        <div className="min-w-[1000px] grid grid-cols-4 gap-x-6">
          {/* Label column */}
          <div className="col-span-1 pt-64 space-y-16">
            {specLabels.map((spec) => (
              <div key={spec.key} className="h-12 flex items-center">
                <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant/60">
                  {spec.label}
                </span>
              </div>
            ))}
          </div>

          {/* Machine columns */}
          {results.map((scored) => {
            const isTop = scored.rank === 1;
            return (
              <div
                key={scored.machine.id}
                className={`col-span-1 bg-surface-container-low p-6 rounded-lg transition-all duration-300 hover:translate-y-[-4px] hover:bg-surface-container-high ${
                  isTop ? "ring-1 ring-primary/20" : ""
                }`}
              >
                {/* Machine image */}
                <div className="mb-8 aspect-[4/5] bg-surface-container-highest rounded-sm overflow-hidden flex items-center justify-center p-4">
                  <img
                    className="w-full h-full object-cover rounded-sm grayscale-[0.2] hover:grayscale-0 transition-all duration-500"
                    src={scored.machine.comparisonImageUrl}
                    alt={scored.machine.name}
                  />
                </div>

                {/* Machine name */}
                <div className="mb-12">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline text-2xl text-on-surface">
                        {scored.machine.name.split(" ").pop()}
                      </h3>
                      <p className="text-sm text-on-surface-variant mt-1">
                        {scored.machine.subtitle}
                      </p>
                    </div>
                    {isTop && (
                      <span className="bg-primary text-on-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                        TOP MATCH
                      </span>
                    )}
                  </div>
                </div>

                {/* Spec values */}
                <div className="space-y-16">
                  {specLabels.map((spec) => {
                    if (spec.key === "price") {
                      return (
                        <div
                          key={spec.key}
                          className="h-12 flex items-center text-lg font-medium text-primary"
                        >
                          {scored.machine.specs.price}
                        </div>
                      );
                    }
                    if (spec.key === "fabricHandling") {
                      const isGood =
                        scored.machine.specs.fabricHandling !==
                        "Lightweight Only";
                      return (
                        <div
                          key={spec.key}
                          className="h-12 flex flex-col justify-center"
                        >
                          <span
                            className={`inline-flex items-center gap-2 text-sm ${isGood ? "text-tertiary" : "text-secondary"}`}
                          >
                            <span
                              className="material-symbols-outlined text-[18px]"
                              style={
                                isGood
                                  ? {
                                      fontVariationSettings: "'FILL' 1",
                                    }
                                  : undefined
                              }
                            >
                              {isGood ? "check_circle" : "warning"}
                            </span>
                            {scored.machine.specs.fabricHandling}
                          </span>
                        </div>
                      );
                    }
                    if (spec.key === "bestFor") {
                      const colorClass =
                        scored.rank === 1
                          ? "bg-tertiary/10 text-tertiary"
                          : scored.rank === 2
                            ? "bg-tertiary/10 text-tertiary"
                            : "bg-secondary-container/20 text-on-secondary-container";
                      return (
                        <div key={spec.key} className="h-12 flex items-center">
                          <span
                            className={`${colorClass} px-3 py-1 text-[11px] font-bold uppercase tracking-wider rounded-full`}
                          >
                            {scored.machine.specs.bestFor}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div
                        key={spec.key}
                        className="h-12 flex items-center text-sm"
                      >
                        {scored.machine.specs[spec.key]}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Advice Section */}
      <section className="mt-24 bg-surface-container px-8 py-12 rounded-lg flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1">
          <span className="inline-block bg-secondary-container text-on-secondary-container px-3 py-1 text-[10px] font-bold uppercase tracking-widest mb-4">
            Pro Advice
          </span>
          <h2 className="font-headline text-3xl text-on-background mb-4">
            The Artisan's Choice
          </h2>
          <p className="text-on-surface-variant leading-relaxed">
            While the{" "}
            <span className="text-primary font-semibold">
              {topMatch?.machine.name}
            </span>{" "}
            scored highest for your profile, each machine excels in different
            areas. Consider your most important projects and choose the one that
            best serves your creative vision.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            type="button"
            className="px-8 py-4 bg-primary text-on-primary rounded-sm font-medium hover:bg-primary-container transition-all shadow-lg shadow-primary/10"
          >
            Confirm Top Match
          </button>
          <button
            type="button"
            onClick={() => {
              resetQuiz();
              navigate("/quiz");
            }}
            className="px-8 py-4 border border-outline-variant/20 text-primary rounded-sm font-medium hover:bg-surface-container-high transition-all bg-transparent"
          >
            Refine Search
          </button>
        </div>
      </section>
    </div>
  );
}
