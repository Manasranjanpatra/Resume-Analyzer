import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Analyzer from './components/Analyzer';
import Footer from './components/Footer';
import ResultsPage from './components/ResultsPage';
import type { AnalysisResponse, ATSScoreResponse } from './types';

interface ResultsState {
  analysis: AnalysisResponse;
  ats: ATSScoreResponse;
  resumeText: string;
  fileName: string;
}

export default function App() {
  const analyzerRef = useRef<HTMLDivElement>(null);
  const [results, setResults] = useState<ResultsState | null>(null);

  const scrollToAnalyzer = () => {
    analyzerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleAnalysisComplete = (
    analysis: AnalysisResponse,
    ats: ATSScoreResponse,
    resumeText: string,
    fileName: string
  ) => {
    setResults({ analysis, ats, resumeText, fileName });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setResults(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Show Results Page
  if (results) {
    return (
      <ResultsPage
        analysisData={results.analysis}
        atsData={results.ats}
        resumeText={results.resumeText}
        fileName={results.fileName}
        onBack={handleBack}
      />
    );
  }

  // Show Landing Page
  return (
    <div className="min-h-screen bg-white">
      <Navbar onGetStarted={scrollToAnalyzer} />
      <Hero onGetStarted={scrollToAnalyzer} />
      <Features />
      <HowItWorks />
      <Analyzer ref={analyzerRef} onAnalysisComplete={handleAnalysisComplete} />
      <Footer />
    </div>
  );
}
