"use client";

import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import HowAiDecides from "@/components/HowAiDecides";
import PredictionForm from "@/components/PredictionForm";
import PredictionResult from "@/components/PredictionResult";
import CandidateHistory from "@/components/CandidateHistory";
import AnalyticsDashboard from "@/components/AnalyticsDashboard";
import InteractiveShowcase from "@/components/InteractiveShowcase";
import ExploreMenu from "@/components/ExploreMenu";
import Footer from "@/components/Footer";

export default function Home() {
  const [predictionResult, setPredictionResult] = useState<Record<string, unknown> | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown> | null>(null);

  const handlePrediction = (res: Record<string, unknown>, fd: Record<string, unknown>) => {
    setPredictionResult(res);
    setFormData(fd);
  };

  return (
    <main className="w-full relative bg-black selection:bg-accent-primary selection:text-white text-white">
      <HeroSection />
      
      {/* Scrollable Content Container below Hero */}
      <div className="relative z-10 flex flex-col bg-black">
        <HowItWorks />
        <HowAiDecides />
        <PredictionForm onResult={handlePrediction} />
        <PredictionResult result={predictionResult} formData={formData} />
        <CandidateHistory />
        <AnalyticsDashboard />
        <InteractiveShowcase />
        <ExploreMenu />
        <Footer />
      </div>
    </main>
  );
}
