export type QuizStepId =
  | "experience"
  | "fabrics"
  | "projects"
  | "features"
  | "budget"
  | "workspace"
  | "preferences";

export interface QuizOption {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface QuizStep {
  id: QuizStepId;
  title: string;
  subtitle: string;
  categoryLabel: string;
  selectionMode: "single" | "multi";
  /** Grid layout: "bento" for step 2 fabric layout, "uniform" for standard 2x2 or 3x2 grids */
  layout: "bento" | "uniform";
  columns: number;
  options: QuizOption[];
}

export type QuizAnswers = Partial<Record<QuizStepId, string[]>>;
