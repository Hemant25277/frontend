"use client";

import { motion } from "framer-motion";

const factors = [
  {
    title: "Technical Skills",
    desc: "Code quality and problem-solving proficiency.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    score: 85
  },
  {
    title: "Experience",
    desc: "Years of relevant industry exposure.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    score: 92
  },
  {
    title: "Communication",
    desc: "Clarity, teamwork, and behavioral traits.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
      </svg>
    ),
    score: 78
  },
  {
    title: "Certifications",
    desc: "Verified continuous learning achievements.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
    score: 65
  }
];

export default function HowAiDecides() {
  return (
    <section className="relative z-20 bg-slate-900 pb-32 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight"
          >
            How AI Decides
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our model evaluates thousands of historical hiring decisions to identify patterns across key criteria, ensuring objective and consistent candidate selection.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {factors.map((factor, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeOut" }}
              whileHover={{ y: -6 }}
              className="group relative flex flex-col p-8 rounded-2xl bg-black/40 border border-white/5 backdrop-blur-md transition-shadow hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
            >
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-accent-primary mb-6 transition-colors group-hover:bg-accent-primary/10 group-hover:text-accent-primary">
                {factor.icon}
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-2">{factor.title}</h3>
              <p className="text-sm text-slate-400 mb-8 flex-grow">{factor.desc}</p>
              
              <div className="w-full">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Weight</span>
                  <span className="text-xs font-bold text-white">{factor.score}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${factor.score}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + (idx * 0.1), ease: "easeOut" }}
                    className="h-full bg-accent-primary"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
