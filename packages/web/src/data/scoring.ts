import type { QuizAnswers } from "../types/quiz";
import type { ScoredMachine } from "../types/machine";
import { machines } from "./machines";

const WEIGHTS = {
  experience: 20,
  fabrics: 20,
  projects: 15,
  features: 15,
  budget: 15,
  workspace: 10,
  preferences: 5,
};

function scoreMachine(
  machineId: string,
  answers: QuizAnswers,
): { score: number; reasons: string[] } {
  let totalScore = 0;
  const reasons: string[] = [];

  // Experience scoring
  const experience = answers.experience?.[0];
  if (experience) {
    if (machineId === "brother-cs7000x") {
      if (experience === "beginner" || experience === "intermediate") {
        totalScore += WEIGHTS.experience;
        reasons.push("Beginner-friendly computerized controls");
      } else {
        totalScore += WEIGHTS.experience * 0.7;
      }
    } else if (machineId === "singer-4423") {
      if (experience === "intermediate" || experience === "advanced") {
        totalScore += WEIGHTS.experience;
        reasons.push("Mechanical controls suit experienced hands");
      } else {
        totalScore += WEIGHTS.experience * 0.6;
      }
    } else if (machineId === "brother-xm2701") {
      if (experience === "beginner") {
        totalScore += WEIGHTS.experience;
        reasons.push("Perfect starting machine for beginners");
      } else {
        totalScore += WEIGHTS.experience * 0.5;
      }
    }
  }

  // Fabric scoring
  const fabrics = answers.fabrics || [];
  if (fabrics.length > 0) {
    if (machineId === "brother-cs7000x") {
      const goodFabrics = ["cotton-linen", "knits-stretch", "mixed"];
      const matches = fabrics.filter((f) => goodFabrics.includes(f));
      const ratio = matches.length / fabrics.length;
      totalScore += WEIGHTS.fabrics * Math.max(ratio, 0.3);
      if (matches.length > 0) reasons.push("Handles your chosen fabrics well");
    } else if (machineId === "singer-4423") {
      const goodFabrics = ["denim-canvas", "specialty", "mixed"];
      const matches = fabrics.filter((f) => goodFabrics.includes(f));
      const ratio = matches.length / fabrics.length;
      totalScore += WEIGHTS.fabrics * Math.max(ratio, 0.3);
      if (matches.length > 0) reasons.push("Built for heavy-duty fabrics");
    } else if (machineId === "brother-xm2701") {
      const goodFabrics = ["cotton-linen", "mixed"];
      const matches = fabrics.filter((f) => goodFabrics.includes(f));
      const ratio = matches.length / fabrics.length;
      totalScore += WEIGHTS.fabrics * Math.max(ratio, 0.2);
      if (matches.length > 0) reasons.push("Suitable for lightweight fabrics");
    }
  }

  // Projects scoring
  const projects = answers.projects || [];
  if (projects.length > 0) {
    if (machineId === "brother-cs7000x") {
      const goodProjects = ["garments", "quilting", "embroidery", "crafts"];
      const matches = projects.filter((p) => goodProjects.includes(p));
      totalScore +=
        WEIGHTS.projects * Math.max(matches.length / projects.length, 0.3);
      if (matches.length > 0) reasons.push("Ideal for your project types");
    } else if (machineId === "singer-4423") {
      const goodProjects = ["home-decor", "repairs"];
      const matches = projects.filter((p) => goodProjects.includes(p));
      totalScore +=
        WEIGHTS.projects * Math.max(matches.length / projects.length, 0.3);
      if (matches.length > 0) reasons.push("Strong for structural projects");
    } else if (machineId === "brother-xm2701") {
      const goodProjects = ["repairs", "crafts"];
      const matches = projects.filter((p) => goodProjects.includes(p));
      totalScore +=
        WEIGHTS.projects * Math.max(matches.length / projects.length, 0.3);
      if (matches.length > 0) reasons.push("Good for basic projects");
    }
  }

  // Features scoring
  const features = answers.features || [];
  if (features.length > 0) {
    if (machineId === "brother-cs7000x") {
      const goodFeatures = [
        "auto-threader",
        "speed-control",
        "stitch-variety",
        "quiet-operation",
      ];
      const matches = features.filter((f) => goodFeatures.includes(f));
      totalScore +=
        WEIGHTS.features * Math.max(matches.length / features.length, 0.2);
      if (matches.length > 0) reasons.push("Matches your feature priorities");
    } else if (machineId === "singer-4423") {
      const goodFeatures = ["heavy-duty"];
      const matches = features.filter((f) => goodFeatures.includes(f));
      totalScore +=
        WEIGHTS.features * Math.max(matches.length > 0 ? 0.8 : 0.3, 0.2);
      if (matches.length > 0) reasons.push("Heavy-duty power you wanted");
    } else if (machineId === "brother-xm2701") {
      const goodFeatures = ["portability", "quiet-operation"];
      const matches = features.filter((f) => goodFeatures.includes(f));
      totalScore +=
        WEIGHTS.features * Math.max(matches.length / features.length, 0.2);
      if (matches.length > 0) reasons.push("Lightweight and portable");
    }
  }

  // Budget scoring
  const budget = answers.budget?.[0];
  if (budget) {
    if (machineId === "brother-cs7000x") {
      if (budget === "mid" || budget === "premium")
        totalScore += WEIGHTS.budget;
      else if (budget === "entry") totalScore += WEIGHTS.budget * 0.4;
      else totalScore += WEIGHTS.budget * 0.7;
    } else if (machineId === "singer-4423") {
      if (budget === "mid") totalScore += WEIGHTS.budget;
      else if (budget === "entry") totalScore += WEIGHTS.budget * 0.5;
      else totalScore += WEIGHTS.budget * 0.7;
    } else if (machineId === "brother-xm2701") {
      if (budget === "entry") totalScore += WEIGHTS.budget;
      else if (budget === "mid") totalScore += WEIGHTS.budget * 0.8;
      else totalScore += WEIGHTS.budget * 0.5;
    }
    reasons.push("Within your budget range");
  }

  // Workspace scoring
  const workspace = answers.workspace?.[0];
  if (workspace) {
    if (machineId === "brother-cs7000x") {
      if (workspace === "dedicated" || workspace === "shared")
        totalScore += WEIGHTS.workspace;
      else totalScore += WEIGHTS.workspace * 0.6;
    } else if (machineId === "singer-4423") {
      if (workspace === "dedicated") totalScore += WEIGHTS.workspace;
      else totalScore += WEIGHTS.workspace * 0.5;
    } else if (machineId === "brother-xm2701") {
      if (workspace === "small" || workspace === "portable")
        totalScore += WEIGHTS.workspace;
      else totalScore += WEIGHTS.workspace * 0.7;
    }
  }

  // Brand preference scoring
  const prefs = answers.preferences || [];
  if (prefs.length > 0) {
    if (
      machineId === "brother-cs7000x" &&
      (prefs.includes("brother") || prefs.includes("no-preference"))
    ) {
      totalScore += WEIGHTS.preferences;
    } else if (
      machineId === "singer-4423" &&
      (prefs.includes("singer") || prefs.includes("no-preference"))
    ) {
      totalScore += WEIGHTS.preferences;
    } else if (
      machineId === "brother-xm2701" &&
      (prefs.includes("brother") || prefs.includes("no-preference"))
    ) {
      totalScore += WEIGHTS.preferences;
    } else {
      totalScore += WEIGHTS.preferences * 0.3;
    }
  }

  // Normalize to percentage (max possible is 100)
  const maxScore = Object.values(WEIGHTS).reduce((a, b) => a + b, 0);
  const percentage = Math.round((totalScore / maxScore) * 100);

  return { score: Math.min(percentage, 99), reasons };
}

export function calculateResults(answers: QuizAnswers): ScoredMachine[] {
  const scored = machines.map((machine) => {
    const { score, reasons } = scoreMachine(machine.id, answers);
    return {
      machine,
      score,
      matchReasons: reasons,
      rank: 0,
    };
  });

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Ensure minimum spread between scores for visual variety
  if (scored.length >= 3) {
    if (scored[0].score - scored[1].score < 4) {
      scored[1].score = scored[0].score - 6;
    }
    if (scored[1].score - scored[2].score < 4) {
      scored[2].score = scored[1].score - 6;
    }
  }

  // Assign ranks
  scored.forEach((s, i) => {
    s.rank = i + 1;
  });

  return scored;
}
