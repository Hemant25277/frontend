"use client";

import { motion, AnimatePresence } from "framer-motion";

interface PredictionResponse {
  error?: string;
  prediction?: string;
  confidence?: number;
  selection_probability?: number;
  top_factors?: string[];
  what_if?: Array<{ factor: string; increase: number }>;
  decision_path?: string[];
  candidate_insights?: {
    overall_rating: number;
    strengths: string[];
    weaknesses: string[];
    recommendation: string;
  };
}

const CircularProgress = ({ percentage, color }: { percentage: number, color: string }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        <circle cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-800" />
        <motion.circle 
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
          cx="48" cy="48" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" 
          strokeDasharray={circumference}
          strokeLinecap="round"
          className={color} 
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-lg font-bold text-white">{percentage}%</span>
      </div>
    </div>
  );
};

export default function PredictionResult({ result, formData }: { result: PredictionResponse | null, formData?: Record<string, unknown> | null }) {
  if (!result) return null;

  // Handle connection errors
  if (result.error) {
    return (
      <section className="bg-black pb-24 px-4 relative z-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-8 rounded-3xl border border-red-500/30 bg-red-500/10 backdrop-blur-md"
          >
            <h3 className="text-2xl font-bold text-red-400 mb-2">Prediction Failed</h3>
            <p className="text-slate-300">{result.error}</p>
          </motion.div>
        </div>
      </section>
    );
  }

  const isSelected = result.prediction === "Selected";
  const confidencePercent = result.confidence?.toFixed(1) || 0;
  const selectionProbability = result.selection_probability || (isSelected ? confidencePercent : 100 - Number(confidencePercent));

  // Map UI names to formData keys to extract values
  const getFactorValue = (factorName: string) => {
    if (!formData) return "";
    
    // exact matches
    if (factorName === "Experience") return `${formData.YearsExperience || formData.Experience} Years`;
    if (factorName === "Age") return formData.Age;
    if (factorName === "Education") return formData.Education;
    if (factorName === "Previous Experience") return formData.PreviousJobExperience || formData.PreviousExperience;
    
    // score matches
    if (factorName === "Technical Score") return formData.TechnicalSkillScore || formData.TechnicalScore;
    if (factorName === "Communication") return formData.CommunicationScore;
    if (factorName === "Aptitude Score") return formData.AptitudeTestScore || formData.AptitudeScore;
    
    return "";
  };

  return (
    <section id="prediction-result" className="bg-black pb-24 px-4 relative z-20">
      <div className="max-w-5xl mx-auto">
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ willChange: "transform, opacity" }}
            className={`relative overflow-hidden p-8 md:p-12 rounded-3xl border backdrop-blur-xl shadow-2xl ${
              isSelected 
                ? 'bg-emerald-500/10 border-emerald-500/30 shadow-[0_0_50px_rgba(16,185,129,0.15)]' 
                : 'bg-rose-500/10 border-rose-500/30 shadow-[0_0_50px_rgba(244,63,94,0.15)]'
            }`}
          >
            {/* Background glowing orb */}
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] opacity-50 ${
              isSelected ? 'bg-emerald-500' : 'bg-rose-500'
            }`} />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Primary Decision Column */}
              <div className="flex flex-col">
                <div className="text-center md:text-left">
                  <h3 className="text-sm font-bold tracking-widest uppercase text-slate-400 mb-2">AI Verdict</h3>
                  <h2 className={`text-5xl md:text-6xl font-bold tracking-tight mb-8 ${
                    isSelected ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {result.prediction} {isSelected ? '✅' : '❌'}
                  </h2>
                  
                  {/* Circular Selection Probability */}
                  <div className="flex items-center gap-6 bg-black/40 p-6 rounded-2xl border border-white/5 inline-flex mb-8">
                    <CircularProgress percentage={Number(selectionProbability)} color={isSelected ? 'text-emerald-400' : 'text-rose-400'} />
                    <div className="text-left">
                      <div className="text-sm text-slate-400 font-bold uppercase tracking-widest mb-1">Selection Probability</div>
                      <div className="text-slate-300 text-sm">
                        Based on internal Decision Tree evaluation.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidate Insights Card */}
                {result.candidate_insights && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-blue-900/20 border border-blue-500/20 rounded-2xl p-6 mt-4"
                  >
                    <h4 className="text-sm font-bold tracking-widest text-blue-400 uppercase mb-4 flex items-center gap-2">
                      <span>📊</span> Candidate Summary
                    </h4>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-4xl font-bold text-white">{result.candidate_insights.overall_rating} <span className="text-lg text-slate-500">/ 10</span></div>
                      <div className="text-xs text-slate-400 uppercase tracking-widest">Overall Rating</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                      <div>
                        <div className="text-emerald-400 font-bold mb-2">Strengths</div>
                        <ul className="space-y-1">
                          {result.candidate_insights.strengths.length > 0 
                            ? result.candidate_insights.strengths.map((s, i) => <li key={i} className="text-slate-300 flex gap-2"><span className="text-emerald-400">✓</span> {s}</li>)
                            : <li className="text-slate-500 italic">None highlighted</li>}
                        </ul>
                      </div>
                      <div>
                        <div className="text-amber-400 font-bold mb-2">Weak Areas</div>
                        <ul className="space-y-1">
                          {result.candidate_insights.weaknesses.length > 0 
                            ? result.candidate_insights.weaknesses.map((w, i) => <li key={i} className="text-slate-300 flex gap-2"><span className="text-amber-400">⚠</span> {w}</li>)
                            : <li className="text-slate-500 italic">None highlighted</li>}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-blue-500/20">
                      <div className="text-xs text-slate-400 uppercase tracking-widest mb-1">Recommendation</div>
                      <div className="text-white font-medium">{result.candidate_insights.recommendation}</div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Explanations Column */}
              <div className="flex flex-col gap-8">
                
                {/* Reasoning Block */}
                {result.top_factors && result.top_factors.length > 0 && (
                  <div className="bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
                    <h4 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-4">
                      Why Was This Candidate {isSelected ? 'Selected' : 'Rejected'}?
                    </h4>
                    <ul className="space-y-4">
                      {result.top_factors.map((factor: string, index: number) => {
                        const val = getFactorValue(factor);
                        const displayValue = val !== "" ? `: ${val}` : "";
                        
                        return (
                          <motion.li 
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + (index * 0.1), duration: 0.5 }}
                            className="flex items-center gap-3 text-white"
                          >
                            <span className={`flex items-center justify-center w-6 h-6 rounded-full text-sm font-bold flex-shrink-0 ${
                              isSelected ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
                            }`}>
                              {isSelected ? '✓' : '✗'}
                            </span>
                            <span className="font-medium text-slate-200">
                              {factor}<span className={isSelected ? 'text-emerald-300' : 'text-rose-300'}>{displayValue}</span>
                            </span>
                          </motion.li>
                        );
                      })}
                    </ul>

                    {/* What-If Analysis (For Rejected) */}
                    {!isSelected && result.what_if && result.what_if.length > 0 && (
                      <div className="mt-8 pt-6 border-t border-white/10">
                        <div className="text-xs text-amber-500 uppercase tracking-widest mb-4 font-bold flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                          To Improve Chances:
                        </div>
                        <ul className="space-y-3">
                          {result.what_if.map((item: { factor: string; increase: number }, idx: number) => (
                            <motion.li 
                              key={`whatif-${idx}`}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 + (idx * 0.1) }}
                              className="text-sm flex justify-between items-center bg-amber-500/10 border border-amber-500/20 px-4 py-3 rounded-xl"
                            >
                              <span className="text-amber-100 font-medium">{item.factor}</span>
                              <span className="font-bold text-amber-400 tracking-wider">+{item.increase} pts</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* Decision Path Visualization */}
                {result.decision_path && result.decision_path.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-black/40 p-8 rounded-3xl border border-white/5 backdrop-blur-md"
                  >
                    <h4 className="text-sm font-bold tracking-widest text-purple-400 uppercase mb-6 flex items-center gap-2">
                      <span>🧠</span> Decision Tree Path
                    </h4>
                    <div className="relative pl-6 space-y-6 before:absolute before:inset-y-2 before:left-[11px] before:w-[2px] before:bg-white/10">
                      {result.decision_path.map((step, idx) => (
                        <motion.div 
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.8 + (idx * 0.1) }}
                          className="relative"
                        >
                          <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-black" />
                          <span className="text-slate-300 font-mono text-sm">{step}</span>
                        </motion.div>
                      ))}
                      <motion.div 
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + (result.decision_path.length * 0.1) }}
                        className="relative pt-2"
                      >
                        <div className={`absolute -left-[34px] top-3.5 w-4 h-4 rounded-full flex items-center justify-center ring-4 ring-black ${isSelected ? 'bg-emerald-500' : 'bg-rose-500'}`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-white" />
                        </div>
                        <span className={`font-bold uppercase tracking-widest text-sm ${isSelected ? 'text-emerald-400' : 'text-rose-400'}`}>
                          Result: {result.prediction}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
