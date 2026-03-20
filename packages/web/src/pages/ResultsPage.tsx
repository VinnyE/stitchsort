import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import MachineCard from "../components/results/MachineCard";
import ComparisonTable from "../components/results/ComparisonTable";

export default function ResultsPage() {
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

  return (
    <div className="px-6 max-w-5xl mx-auto pb-24">
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

      {/* Machine Cards */}
      <div className="space-y-12">
        {results.map((scored) => (
          <MachineCard key={scored.machine.id} scored={scored} />
        ))}
      </div>

      {/* Comparison Table */}
      <ComparisonTable results={results} />

      {/* Compare link */}
      <div className="mt-12 text-center">
        <Link
          to="/compare"
          className="text-primary font-label text-sm uppercase tracking-widest hover:text-primary-container transition-colors"
        >
          Compare All Machines &rarr;
        </Link>
      </div>

      {/* Retake CTA */}
      <section className="mt-24 text-center py-16 bg-surface-container-low rounded-sm">
        <h3 className="font-headline text-2xl mb-4">
          Not quite what you were looking for?
        </h3>
        <p className="font-body text-on-surface-variant mb-8 max-w-md mx-auto">
          Update your preferences to see a new set of curated machines tailored
          to your project goals.
        </p>
        <button
          type="button"
          onClick={() => {
            resetQuiz();
            navigate("/quiz");
          }}
          className="bg-secondary text-on-secondary px-8 py-4 rounded-sm font-semibold flex items-center gap-2 mx-auto hover:opacity-90 transition-opacity"
        >
          <span className="material-symbols-outlined text-sm">refresh</span>
          Retake Quiz
        </button>
      </section>
    </div>
  );
}
