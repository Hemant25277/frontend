"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use framer-motion useScroll to track scrolling through this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const isInView = useInView(containerRef, { margin: "100px" });

  // Headline mapping - smooth continuous travel
  const headlineY = useTransform(scrollYProgress, 
    [0, 0.15, 0.35, 0.75, 1], 
    [400, 250, 0, -50, -200]
  );
  const headlineOpacity = useTransform(scrollYProgress, 
    [0, 0.15, 0.35, 0.90, 1], 
    [0, 0,    1,    1,    0]
  );

  // Subtitle slightly delayed
  const subtitleY = useTransform(scrollYProgress, 
    [0, 0.18, 0.38, 0.78, 1], 
    [380, 230, 0, -30, -180]
  );
  const subtitleOpacity = useTransform(scrollYProgress, 
    [0, 0.18, 0.38, 0.88, 1], 
    [0, 0,    1,    1,    0]
  );

  // CTA slightly delayed
  const ctaY = useTransform(scrollYProgress, 
    [0, 0.21, 0.41, 0.81, 1], 
    [360, 210, 0, -10, -160]
  );
  const ctaOpacity = useTransform(scrollYProgress, 
    [0, 0.21, 0.41, 0.86, 1], 
    [0, 0,    1,    1,    0]
  );

  return (
    <section ref={containerRef} className="relative w-full h-[350vh] bg-slate-900 font-sans">
      
      {/* Navbar Layout - Minimal */}
      <header className="fixed top-0 left-0 w-full flex justify-center items-center py-6 px-4 z-50 pointer-events-none">
        <div className="text-[1.25rem] font-bold text-white/80 tracking-[0.05em] uppercase flex items-center gap-2 pointer-events-auto">
          <span className="w-[6px] h-[6px] bg-accent-primary rounded-full inline-block"></span>
          AI.Recruit
        </div>
      </header>

      {/* Spline Fixed Background */}
      <div className="fixed top-0 left-0 w-full h-screen z-0 pointer-events-auto">
        {/* Heavy dark overlay to mask Spline text and blend */}
        <div className="absolute inset-0 bg-slate-900/75 z-10 pointer-events-none" />
        <iframe 
          loading="lazy"
          style={{ visibility: isInView ? 'visible' : 'hidden' }}
          src="https://my.spline.design/theeternalarc-uK96TBmlPyBK12ZYsBobYDrV-16x/" 
          className="w-full h-full border-none scale-[1.05]" 
          title="AI Recruitment Spline Scene"
        />
      </div>

      {/* Sticky Text Container */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center pointer-events-none z-20">
        <div className="flex flex-col items-center justify-center text-center px-4 md:px-[5%] max-w-[1000px] w-full">
          
          <motion.h1 
            style={{ opacity: headlineOpacity, y: headlineY, willChange: "transform, opacity" }}
            className="text-[clamp(2.5rem,6vw,6.5rem)] font-[800] leading-[1.1] tracking-[-0.03em] bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent mb-6 max-w-4xl mx-auto drop-shadow-md"
          >
            AI Recruitment<br />Management System
          </motion.h1>
          
          <motion.p 
            style={{ opacity: subtitleOpacity, y: subtitleY, willChange: "transform, opacity" }}
            className="text-[clamp(1.25rem,2vw,1.75rem)] text-slate-300 font-normal leading-[1.5] max-w-[600px] mx-auto mb-12 drop-shadow-sm"
          >
            Predict candidate selection using Decision Tree Machine Learning.
          </motion.p>
          
          <motion.div 
            style={{ opacity: ctaOpacity, y: ctaY, willChange: "transform, opacity" }}
            className="pointer-events-auto"
          >
            <button 
              onClick={() => document.getElementById('prediction')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center justify-center bg-accent-primary text-white text-[1.125rem] font-semibold px-14 py-[1.25rem] rounded-full cursor-pointer transition-all duration-300 cubic-bezier(0.4, 0, 0.2, 1) shadow-[0_10px_30px_-5px_rgba(59,130,246,0.5)] hover:bg-accent-hover hover:-translate-y-[2px] hover:scale-[1.02] hover:shadow-[0_15px_40px_-5px_rgba(59,130,246,0.6)]"
            >
              Try Prediction
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
