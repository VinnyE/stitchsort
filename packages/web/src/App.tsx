import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { QuizProvider } from "./context/QuizContext";
import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultsPage from "./pages/ResultsPage";
import ComparisonPage from "./pages/ComparisonPage";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <QuizProvider>
      <ScrollToTop />
      <PageLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/compare" element={<ComparisonPage />} />
        </Routes>
      </PageLayout>
    </QuizProvider>
  );
}
