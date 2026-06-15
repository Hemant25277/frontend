"use client";

import { motion } from "framer-motion";
import RotatingText from "./RotatingText";

export default function HowItWorks() {
  const steps = [
    { title: "Resume" },
    { title: "Skills" },
    { title: "Experience" },
    { title: "Decision Tree" },
    { title: "Selection" }
  ];

  return (
    <section className="relative z-20 bg-slate-900 py-32 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-white mb-6 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-4"
          >
            <span>The Future of Recruitment is</span>
            <RotatingText
              texts={['Objective.', 'Data-Driven.', 'Intelligent.', 'Fast.']}
              mainClassName="px-4 bg-emerald-500/10 text-emerald-400 overflow-hidden py-1 rounded-xl border border-emerald-500/30"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            AI analyzes candidate profiles using objective evaluation criteria instead of manual filtering.
          </motion.p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 relative">
          {/* Subtle Connecting Line - Hidden on Mobile for better stacking */}
          <div className="hidden md:block absolute top-1/2 left-[10%] w-[80%] h-[1px] bg-white/10 -translate-y-1/2 z-0" />
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col md:flex-row items-center">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
                className="relative z-10 flex items-center justify-center w-40 h-24 bg-black border border-white/10 rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.15)] group hover:shadow-[0_0_25px_rgba(59,130,246,0.3)] transition-shadow duration-500"
              >
                <h3 className="text-sm font-semibold text-white tracking-widest uppercase">{step.title}</h3>
              </motion.div>

              {/* Arrow for mobile (vertical) or desktop (horizontal) if not the last item */}
              {idx < steps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: (idx * 0.15) + 0.1, ease: "easeOut" }}
                  className="my-4 md:my-0 md:mx-4 text-slate-600 relative z-10"
                >
                  <svg className="w-6 h-6 md:-rotate-90 rotate-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
