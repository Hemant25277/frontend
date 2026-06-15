"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Candidate {
  candidate_id: string;
  decision: string;
  confidence: number;
}

export default function CandidateHistory() {
  const [history, setHistory] = useState<Candidate[]>([]);

  // Fetch history periodically or on mount
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
        const res = await fetch(`${apiUrl}/history`);
        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("Failed to fetch history:", err);
      }
    };
    
    fetchHistory();
    const interval = setInterval(fetchHistory, 5000); // refresh every 5s to stay updated
    return () => clearInterval(interval);
  }, []);

  if (history.length === 0) return null;

  return (
    <section className="bg-black pb-24 px-4 relative z-20">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white tracking-tight">Candidate History</h3>
            <div className="px-3 py-1 rounded-full bg-white/5 text-slate-400 text-xs tracking-widest uppercase font-semibold border border-white/10">
              Live DB
            </div>
          </div>
          
          <div className="space-y-4">
            {history.map((candidate, idx) => {
              const isSelected = candidate.decision === "Selected";
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  className={`flex items-center justify-between p-4 rounded-xl border ${
                    isSelected ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                    <span className="font-medium text-white">{candidate.candidate_id}</span>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <span className={`text-sm font-bold tracking-widest uppercase ${
                      isSelected ? 'text-emerald-400' : 'text-rose-400'
                    }`}>
                      {candidate.decision}
                    </span>
                    <div className="w-16 text-right">
                      <span className="text-slate-400 text-sm">{candidate.confidence.toFixed(1)}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
