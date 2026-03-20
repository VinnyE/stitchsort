import { Routes, Route } from "react-router-dom";
import HomepageMobile from "./pages/HomepageMobile";
import StitchMatchHomepage from "./pages/StitchMatchHomepage";
import QuizFabricSelection from "./pages/QuizFabricSelection";
import ResultsPage from "./pages/ResultsPage";
import ComparisonView from "./pages/ComparisonView";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomepageMobile />} />
      <Route path="/stitchmatch" element={<StitchMatchHomepage />} />
      <Route path="/quiz" element={<QuizFabricSelection />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/compare" element={<ComparisonView />} />
    </Routes>
  );
}
