import type { ScoredMachine } from "../../types/machine";

interface MachineCardProps {
  scored: ScoredMachine;
}

export default function MachineCard({ scored }: MachineCardProps) {
  const { machine, score, rank } = scored;
  const isBestMatch = rank === 1;

  return (
    <article className="bg-surface-container-low group overflow-hidden flex flex-col md:flex-row gap-8 transition-colors duration-300 hover:bg-surface-container-high relative">
      {isBestMatch && (
        <div className="absolute top-4 left-4 bg-primary text-on-primary px-3 py-1 rounded-sm text-xs font-bold tracking-widest uppercase z-10">
          Best Match
        </div>
      )}
      <div className="w-full md:w-2/5 aspect-square bg-surface-container-highest overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={machine.imageUrl}
          alt={machine.name}
        />
      </div>
      <div className="w-full md:w-3/5 p-8 md:pl-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="font-headline text-3xl text-on-surface">
                {machine.name}
              </h2>
              <p className="text-secondary font-medium mt-1">
                {machine.priceRange}
              </p>
            </div>
            <div className="text-right">
              <div
                className={`text-3xl font-headline ${isBestMatch ? "text-primary" : "text-on-surface-variant"}`}
              >
                {score}%
              </div>
              <div className="text-[10px] uppercase tracking-widest font-bold text-on-surface-variant">
                Match Score
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {machine.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-surface-container-highest text-on-surface-variant text-[11px] font-bold rounded-sm border border-outline-variant/20 uppercase tracking-tighter"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="font-body text-on-surface-variant text-sm leading-relaxed mb-6">
            {machine.description}
          </p>
          <div
            className={`p-4 mb-8 ${
              isBestMatch
                ? "bg-secondary-container/10 border-l-2 border-secondary"
                : "bg-surface-container-highest"
            }`}
          >
            <p className="text-xs font-bold uppercase tracking-wider text-on-surface mb-1">
              {machine.tradeoffLabel}
            </p>
            <p className="text-sm text-on-surface-variant">
              {machine.tradeoff}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 mt-auto">
          <button className="bg-primary text-on-primary px-6 py-3 rounded-sm text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity">
            View on Amazon
            <span className="material-symbols-outlined text-sm">
              open_in_new
            </span>
          </button>
          {isBestMatch && (
            <button className="bg-transparent border border-outline-variant/30 text-primary px-6 py-3 rounded-sm text-sm font-semibold hover:bg-surface-container-highest transition-colors">
              SewingMachinesPlus
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
