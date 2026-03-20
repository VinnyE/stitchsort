interface ProgressTrackerProps {
  currentStep: number;
  totalSteps: number;
  categoryLabel: string;
}

export default function ProgressTracker({
  currentStep,
  totalSteps,
  categoryLabel,
}: ProgressTrackerProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-4">
        <span className="font-label text-xs uppercase tracking-[0.2em] text-secondary">
          Step {currentStep + 1} of {totalSteps}
        </span>
        <span className="font-label text-xs text-on-surface/50 italic">
          {categoryLabel}
        </span>
      </div>
      <div className="relative h-[2px] w-full bg-surface-container-high">
        <div
          className="absolute top-0 left-0 h-full bg-primary transition-all duration-700 ease-in-out"
          style={{ width: `${progress}%` }}
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-0 w-full flex justify-between px-1">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`w-2.5 h-2.5 rounded-full border-4 border-surface transition-colors duration-300 ${
                i <= currentStep ? "bg-primary" : "bg-surface-container-high"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
