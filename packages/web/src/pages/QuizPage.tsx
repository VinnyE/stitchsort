import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuiz } from "../context/QuizContext";
import { quizSteps } from "../data/quizSteps";
import ProgressTracker from "../components/quiz/ProgressTracker";
import QuizOption from "../components/quiz/QuizOption";

export default function QuizPage() {
  const {
    answers,
    currentStep,
    setAnswer,
    nextStep,
    prevStep,
    totalSteps,
    hasCompletedQuiz,
  } = useQuiz();
  const navigate = useNavigate();
  const step = quizSteps[currentStep];
  const selected = answers[step.id] || [];

  useEffect(() => {
    if (hasCompletedQuiz) {
      navigate("/results");
    }
  }, [hasCompletedQuiz, navigate]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const toggleOption = useCallback(
    (optionId: string) => {
      if (step.selectionMode === "single") {
        setAnswer(step.id, [optionId]);
      } else {
        const next = selected.includes(optionId)
          ? selected.filter((id) => id !== optionId)
          : [...selected, optionId];
        setAnswer(step.id, next);
      }
    },
    [step.id, step.selectionMode, selected, setAnswer],
  );

  const canContinue = selected.length > 0;

  const handleContinue = useCallback(() => {
    if (canContinue) nextStep();
  }, [canContinue, nextStep]);

  // Enter key support
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Enter" && canContinue) {
        handleContinue();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canContinue, handleContinue]);

  // Grid classes based on layout
  const gridClasses =
    step.layout === "bento"
      ? "grid grid-cols-1 md:grid-cols-6 gap-4"
      : step.columns === 2
        ? "grid grid-cols-1 md:grid-cols-2 gap-4"
        : "grid grid-cols-1 md:grid-cols-3 gap-4";

  // Static bento col-span classes (must be full strings for Tailwind JIT)
  const bentoClasses = [
    "md:col-span-3",
    "md:col-span-3",
    "md:col-span-2",
    "md:col-span-2",
    "md:col-span-2",
  ];

  return (
    <div className="flex-grow px-6 max-w-4xl mx-auto w-full pb-32">
      <ProgressTracker
        currentStep={currentStep}
        totalSteps={totalSteps}
        categoryLabel={step.categoryLabel}
      />

      {/* Question Header */}
      <div className="mb-12 text-center">
        <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl text-on-surface leading-tight mb-4">
          {step.title}
        </h1>
        <p className="font-body text-on-surface-variant max-w-lg mx-auto italic">
          {step.subtitle}
        </p>
      </div>

      {/* Options Grid */}
      <div className={gridClasses}>
        {step.options.map((option, i) => {
          const isBento = step.layout === "bento";
          const isLarge = isBento ? i < 2 : step.columns === 2;

          return (
            <div
              key={option.id}
              className={isBento ? bentoClasses[i] ?? "" : ""}
            >
              <QuizOption
                icon={option.icon}
                title={option.title}
                description={option.description}
                selected={selected.includes(option.id)}
                onClick={() => toggleOption(option.id)}
                size={isLarge ? "large" : "small"}
              />
            </div>
          );
        })}
      </div>

      {/* Footer Actions */}
      <div className="mt-16 flex justify-between items-center">
        {currentStep > 0 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center gap-2 text-on-surface/50 hover:text-primary transition-colors py-2 group bg-transparent"
          >
            <span className="material-symbols-outlined text-sm transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span className="font-label text-sm uppercase tracking-widest">
              Back
            </span>
          </button>
        ) : (
          <div />
        )}
        <div className="flex items-center gap-6">
          <span className="hidden md:block text-xs italic text-on-surface-variant">
            Press 'Enter' to confirm selection
          </span>
          <button
            type="button"
            onClick={handleContinue}
            disabled={!canContinue}
            className="bg-primary text-on-primary px-10 py-4 rounded-sm font-label uppercase tracking-widest text-xs hover:bg-primary-container transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
