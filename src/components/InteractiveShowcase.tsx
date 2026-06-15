"use client";

import dynamic from 'next/dynamic';

const FluidGlass = dynamic(() => import('./FluidGlass'), { ssr: false });

export default function InteractiveShowcase() {
  return (
    <section className="relative z-20 bg-slate-900 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 mb-8 text-center md:text-left">
        <h2 className="text-sm font-bold tracking-widest text-blue-400 uppercase">Interactive Gallery</h2>
        <h3 className="text-3xl font-bold text-white mt-2">Vision & Capabilities</h3>
      </div>
      
      {/* The scrollable 3D container */}
      <div className="w-full h-[600px] md:h-[800px] relative border-y border-white/5 bg-slate-900">
        <FluidGlass 
          mode="lens" 
          lensProps={{
            scale: 0.35,
            ior: 1.15,
            thickness: 5,
            chromaticAberration: 0.1,
            anisotropy: 0.01,
            distortion: 0.1,
            distortionScale: 0.2
          }}
        />
      </div>
    </section>
  );
}
