import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { QuizAnswers, QuizStepId } from "../types/quiz";
import type { ScoredMachine } from "../types/machine";
import { calculateResults } from "../data/scoring";
import { quizSteps } from "../data/quizSteps";

interface QuizContextValue {
  answers: QuizAnswers;
  currentStep: number;
  setAnswer: (stepId: QuizStepId, value: string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetQuiz: () => void;
  results: ScoredMachine[];
  hasCompletedQuiz: boolean;
  totalSteps: number;
}

const QuizContext = createContext<QuizContextValue | null>(null);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [hasCompletedQuiz, setHasCompletedQuiz] = useState(false);

  const totalSteps = quizSteps.length;

  const setAnswer = useCallback(
    (stepId: QuizStepId, value: string[]) => {
      setAnswers((prev) => ({ ...prev, [stepId]: value }));
    },
    [],
  );

  const nextStep = useCallback(() => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((s) => s + 1);
    } else {
      setHasCompletedQuiz(true);
    }
  }, [currentStep, totalSteps]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    setCurrentStep(step);
  }, []);

  const resetQuiz = useCallback(() => {
    setAnswers({});
    setCurrentStep(0);
    setHasCompletedQuiz(false);
  }, []);

  const results = useMemo(() => calculateResults(answers), [answers]);

  const value = useMemo(
    () => ({
      answers,
      currentStep,
      setAnswer,
      nextStep,
      prevStep,
      goToStep,
      resetQuiz,
      results,
      hasCompletedQuiz,
      totalSteps,
    }),
    [
      answers,
      currentStep,
      setAnswer,
      nextStep,
      prevStep,
      goToStep,
      resetQuiz,
      results,
      hasCompletedQuiz,
      totalSteps,
    ],
  );

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error("useQuiz must be used within QuizProvider");
  return ctx;
}
