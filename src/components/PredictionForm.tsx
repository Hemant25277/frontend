"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PredictionForm({ onResult }: { onResult: (res: Record<string, unknown>, formData: Record<string, unknown>) => void }) {
  const [formData, setFormData] = useState({
    Age: 28,
    Education: "Bachelors",
    YearsExperience: 4,
    TechnicalSkillScore: 75,
    AptitudeTestScore: 80,
    CommunicationScore: 85,
    Certifications: 2,
    PreviousJobExperience: 2,
  });
  
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.name === 'Education' ? e.target.value : Number(e.target.value);
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  }, []);

  const handleSliderChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: Number(e.target.value) }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Sequential Loading Sequence
    const sequence = [
      "Resume Analysis",
      "Skills Evaluation",
      "Decision Tree Processing",
      "Generating Recommendation..."
    ];
    
    let step = 0;
    setLoadingText(sequence[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < sequence.length) {
        setLoadingText(sequence[step]);
      } else {
        clearInterval(interval);
      }
    }, 450); // Total ~1.8 seconds artificial delay for sequence
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
      const response = await fetch(`${apiUrl}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      
      // Wait for sequence to at least almost finish
      setTimeout(() => {
        clearInterval(interval);
        onResult(result, formData);
        setLoading(false);
        // Scroll to result slightly down
        setTimeout(() => {
          document.getElementById('prediction-result')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 100);
      }, Math.max(0, 1800 - (step * 450)));
      
    } catch (err) {
      console.error(err);
      clearInterval(interval);
      setLoading(false);
      onResult({ error: "Failed to connect to ML pipeline." }, formData);
    }
  }, [formData, onResult]);

  return (
    <section id="prediction" className="py-24 px-4 bg-black relative z-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4"
          >
            Candidate Evaluation
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            Adjust the candidate metrics below to see how the Decision Tree model scores their profile.
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Panel 1: Candidate Profile */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Candidate Profile</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Age</label>
                <input type="number" name="Age" min="18" max="100" required value={formData.Age} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-accent-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Education</label>
                <select name="Education" required value={formData.Education} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-accent-primary transition-colors appearance-none cursor-pointer">
                  <option value="Bachelors">Bachelors</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="High School">High School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Experience (Years)</label>
                <input type="number" name="YearsExperience" min="0" max="50" required value={formData.YearsExperience} onChange={handleChange} className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-accent-primary transition-colors" />
              </div>
            </div>
          </motion.div>

          {/* Panel 2: Assessment Scores */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Assessment Scores</h3>
            </div>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-400">Technical Score</label>
                  <span className="text-sm font-bold text-white">{formData.TechnicalSkillScore}%</span>
                </div>
                <input type="range" name="TechnicalSkillScore" min="0" max="100" value={formData.TechnicalSkillScore} onChange={handleSliderChange} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-primary" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-400">Aptitude Score</label>
                  <span className="text-sm font-bold text-white">{formData.AptitudeTestScore}%</span>
                </div>
                <input type="range" name="AptitudeTestScore" min="0" max="100" value={formData.AptitudeTestScore} onChange={handleSliderChange} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-primary" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-sm font-medium text-slate-400">Communication Score</label>
                  <span className="text-sm font-bold text-white">{formData.CommunicationScore}%</span>
                </div>
                <input type="range" name="CommunicationScore" min="0" max="100" value={formData.CommunicationScore} onChange={handleSliderChange} className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-accent-primary" />
              </div>
            </div>
          </motion.div>

          {/* Panel 3: Professional Background */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-white">Professional Background</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Certifications</label>
                <input type="number" name="Certifications" required value={formData.Certifications} onChange={handleChange} min="0" max="20" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-accent-primary transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-400 mb-2">Previous Experience (Companies)</label>
                <input type="number" name="PreviousJobExperience" required value={formData.PreviousJobExperience} onChange={handleChange} min="0" max="20" className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-accent-primary transition-colors" />
              </div>
            </div>
          </motion.div>

          {/* Submit Action */}
          <div className="lg:col-span-3 mt-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <button 
                type="submit" 
                disabled={loading} 
                className="group relative inline-flex items-center justify-center px-12 py-4 font-bold text-white bg-accent-primary rounded-full overflow-hidden shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:bg-accent-hover hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] disabled:opacity-80 disabled:cursor-wait"
              >
                <span className="relative z-10 tracking-widest uppercase text-sm font-medium">
                  {loading ? "Analyzing Candidate..." : "Run ML Pipeline"}
                </span>
                {!loading && (
                  <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                )}
              </button>
            </motion.div>

            {/* Sequential Loading Steps UI */}
            <AnimatePresence>
              {loading && (
                <motion.div 
                  initial={{ opacity: 0, scaleY: 0 }}
                  animate={{ opacity: 1, scaleY: 1 }}
                  exit={{ opacity: 0, scaleY: 0 }}
                  style={{ transformOrigin: "top" }}
                  className="mt-6 flex flex-col items-start space-y-2 bg-slate-900/80 border border-white/10 rounded-xl p-6 overflow-hidden"
                >
                  {[
                    "Resume Analysis",
                    "Skills Evaluation",
                    "Decision Tree Processing"
                  ].map((stepText, idx) => {
                    const stepStatus = loadingText === stepText ? 'loading' : 
                                      ["Resume Analysis", "Skills Evaluation", "Decision Tree Processing"].indexOf(loadingText) > idx ? 'complete' : 'pending';
                    
                    if (stepStatus === 'pending' && loadingText !== "Generating Recommendation...") return null; // Don't show future steps yet

                    return (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-3"
                      >
                        {stepStatus === 'complete' || loadingText === "Generating Recommendation..." ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-blue-500 border-t-transparent animate-spin" />
                        )}
                        <span className={`text-sm ${stepStatus === 'complete' || loadingText === "Generating Recommendation..." ? 'text-slate-300' : 'text-blue-400 font-medium'}`}>
                          {stepText}
                        </span>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </form>
      </div>
    </section>
  );
}
