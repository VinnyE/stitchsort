export interface MachineSpecs {
  price: string;
  stitches: number;
  throatSpace: string;
  bobbinType: string;
  type: string;
  fabricHandling: string;
  projectType: string;
  bestFor: string;
}

export interface Machine {
  id: string;
  name: string;
  subtitle: string;
  priceRange: string;
  imageUrl: string;
  specs: MachineSpecs;
  tags: string[];
  description: string;
  tradeoff: string;
  tradeoffLabel: string;
  /** comparison view image */
  comparisonImageUrl: string;
}

export interface ScoredMachine {
  machine: Machine;
  score: number;
  matchReasons: string[];
  rank: number;
}

export interface ScoringProfile {
  experience: number;
  fabrics: number;
  projects: number;
  features: number;
  budget: number;
  workspace: number;
  preferences: number;
}
