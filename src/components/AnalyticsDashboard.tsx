/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef } from "react";
import Threads from "./Threads";

// Animated counter component
const AnimatedCounter = React.memo(function AnimatedCounter({ value, isPercentage = false }: { value: number, isPercentage?: boolean }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 1500; // 1.5 seconds
      const incrementTime = 30; // update every 30ms
      const steps = duration / incrementTime;
      const increment = end / steps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {isPercentage ? count.toFixed(1) : Math.floor(count)}
      {isPercentage && "%"}
    </span>
  );
});

interface MetricsData {
  accuracy: number;
  dataset_size: number;
  selected_candidates: number;
  rejected_candidates: number;
}

interface InsightsData {
  error?: boolean;
  most_influential?: string;
  least_influential?: string;
  averages?: {
    ExperienceYears?: number;
    SkillScore?: number;
    PersonalityScore?: number;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<MetricsData | null>(null);
  const [insights, setInsights] = useState<InsightsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5000";
    Promise.all([
      fetch(`${apiUrl}/metrics`, { signal: controller.signal }).then(res => res.json()),
      fetch(`${apiUrl}/insights`, { signal: controller.signal }).then(res => res.json()).catch(() => null)
    ])
    .then(([metricsData, insightsData]) => {
      setData(metricsData);
      setInsights(insightsData);
      setLoading(false);
    })
    .catch(err => {
      if (err.name === 'AbortError') return;
      console.error(err);
      setLoading(false);
    });
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <section className="bg-slate-900 py-32 text-center border-t border-white/5">
        <div className="animate-pulse text-slate-400">Loading Analytics...</div>
      </section>
    );
  }

  const metrics = data || {
    accuracy: 0,
    dataset_size: 0,
    selected_candidates: 0,
    rejected_candidates: 0
  };

  const metricCards = [
    { label: "Accuracy", value: metrics.accuracy * 100, isPercentage: true },
    { label: "Dataset Size", value: metrics.dataset_size, isPercentage: false },
    { label: "Selected", value: metrics.selected_candidates, isPercentage: false },
    { label: "Rejected", value: metrics.rejected_candidates, isPercentage: false }
  ];

  const graphList = [
    { title: "Feature Importance", path: "/outputs/feature_importance.png" },
    { title: "Confusion Matrix", path: "/outputs/confusion_matrix.png" },
    { title: "Decision Tree", path: "/outputs/decision_tree.png", expandable: true },
    { title: "Age Distribution", path: "/outputs/age_distribution.png" }
  ];

  const formatFeatureName = (name: string) => {
    const map: Record<string, string> = {
      "SkillScore": "Technical Score",
      "PersonalityScore": "Communication",
      "ExperienceYears": "Experience",
      "Age": "Age",
      "EducationLevel": "Education",
      "InterviewScore": "Aptitude Score"
    };
    return map[name] || name;
  };

  return (
    <section className="relative z-20 bg-slate-900 py-32 px-4 border-t border-white/5 overflow-hidden">
      
      {/* Background WebGL Threads Effect */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-screen pointer-events-none md:pointer-events-auto">
        <Threads 
          amplitude={1.5} 
          distance={0} 
          enableMouseInteraction={true} 
          color={[0.1, 0.4, 0.9]} 
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 pointer-events-none">
        
        {/* Reactivate pointer events for content elements */}
        <div className="text-center mb-20 pointer-events-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            Analytics Dashboard
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="text-slate-400 text-lg max-w-2xl mx-auto"
          >
            A high-level view of the dataset and the Decision Tree model&apos;s core insights.
          </motion.p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pointer-events-auto">
          {metricCards.map((metric, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="bg-black/40 border border-white/5 rounded-2xl p-8 text-center shadow-lg transition-shadow hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
            >
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold mb-3">{metric.label}</div>
              <div className="text-4xl font-bold text-white">
                <AnimatedCounter value={metric.value} isPercentage={metric.isPercentage} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Recruiter Insights Panel */}
        {insights && !insights.error && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20 rounded-3xl p-8 md:p-12 mb-24 shadow-2xl relative overflow-hidden pointer-events-auto"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full" />
            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <span className="text-blue-400">✨</span> Recruiter Insights
              <span className="text-sm font-normal text-slate-400 ml-2">(Based on 1,500+ historical records)</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Most Influential Factor</div>
                <div className="text-2xl font-bold text-emerald-400">{formatFeatureName(insights.most_influential || "")}</div>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-2">Least Influential Factor</div>
                <div className="text-2xl font-bold text-rose-400">{formatFeatureName(insights.least_influential || "")}</div>
              </div>
              <div className="bg-black/40 p-6 rounded-2xl border border-white/5">
                <div className="text-xs text-slate-400 uppercase tracking-widest mb-4">Average Selected Candidate</div>
                <ul className="space-y-2 text-sm text-slate-300">
                  <li className="flex justify-between"><span>Experience:</span> <span className="font-bold text-white">{insights.averages?.ExperienceYears?.toFixed(1)} years</span></li>
                  <li className="flex justify-between"><span>Technical Score:</span> <span className="font-bold text-white">{insights.averages?.SkillScore?.toFixed(1)}</span></li>
                  <li className="flex justify-between"><span>Communication:</span> <span className="font-bold text-white">{insights.averages?.PersonalityScore?.toFixed(1)}</span></li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* Graphs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pointer-events-auto">
          {graphList.map((graph, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden shadow-2xl flex flex-col group relative"
            >
              <div className="p-5 border-b border-white/5 bg-slate-900/50 flex justify-between items-center">
                <h3 className="text-lg font-semibold text-slate-300">{graph.title}</h3>
                {graph.expandable && (
                  <button 
                    onClick={() => setExpandedImage(graph.path)}
                    className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg text-white transition-colors"
                  >
                    Expand Tree
                  </button>
                )}
              </div>
              <div className="p-4 flex-1 flex items-center justify-center bg-white/5 transition-colors group-hover:bg-white/10 cursor-pointer" onClick={() => graph.expandable && setExpandedImage(graph.path)}>
                <img 
                  src={graph.path} 
                  alt={graph.title} 
                  className="w-full h-auto object-contain mix-blend-screen opacity-80 transition-opacity group-hover:opacity-100"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Expandable Image Modal */}
      <AnimatePresence>
        {expandedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-12 cursor-pointer"
            onClick={() => setExpandedImage(null)}
          >
            <button className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 rounded-full p-2 transition-colors">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <motion.img 
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              src={expandedImage} 
              alt="Expanded" 
              className="w-full h-full object-contain mix-blend-screen" 
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
