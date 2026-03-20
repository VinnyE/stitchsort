interface QuizOptionProps {
  icon: string;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
  size: "large" | "small";
}

export default function QuizOption({
  icon,
  title,
  description,
  selected,
  onClick,
  size,
}: QuizOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-full group relative flex flex-col items-start p-8 text-left rounded-sm transition-all duration-300 ${
        selected
          ? "ring-2 ring-primary bg-surface-container-high"
          : "bg-surface-container-low hover:bg-surface-container-high"
      }`}
    >
      <span className="material-symbols-outlined text-primary mb-6 text-3xl">
        {icon}
      </span>
      <h3
        className={`font-headline mb-2 ${size === "large" ? "text-2xl" : "text-xl"}`}
      >
        {title}
      </h3>
      <p
        className={`text-on-surface-variant leading-relaxed ${size === "large" ? "text-sm" : "text-xs"}`}
      >
        {description}
      </p>
      <div
        className={`mt-4 flex items-center font-label uppercase tracking-widest text-primary transition-opacity ${
          selected ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        } ${size === "large" ? "text-xs" : "text-[10px]"}`}
      >
        {selected ? "Selected" : "Select"}
        <span className="material-symbols-outlined text-sm ml-2">
          {selected ? "check" : "arrow_forward"}
        </span>
      </div>
    </button>
  );
}
