"use client";

import FlowingMenu from "./FlowingMenu";

export default function ExploreMenu() {
  const items = [
    { 
      link: '#', 
      text: 'Source Code', 
      image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=600&auto=format&fit=crop' 
    },
    { 
      link: '#how-it-works', 
      text: 'Architecture', 
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop' 
    },
    { 
      link: '#prediction-form', 
      text: 'Live Model', 
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=600&auto=format&fit=crop' 
    },
    { 
      link: '#prediction-result', 
      text: 'XAI Engine', 
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=600&auto=format&fit=crop' 
    }
  ];

  return (
    <section className="relative z-20 bg-slate-900 border-t border-white/5 py-16">
      <div className="max-w-7xl mx-auto px-4 mb-10 text-center md:text-left">
        <h2 className="text-sm font-bold tracking-widest text-emerald-400 uppercase">System Directory</h2>
        <h3 className="text-3xl font-bold text-white mt-2">Explore The Platform</h3>
      </div>
      <div className="w-full h-[500px] relative border-y border-white/5">
        <FlowingMenu 
          items={items} 
          bgColor="#0f172a" 
          marqueeBgColor="#10b981" 
          marqueeTextColor="#0f172a"
          textColor="#ffffff"
          borderColor="rgba(255,255,255,0.05)"
        />
      </div>
    </section>
  );
}
