export default function Footer() {
  return (
    <footer className="bg-black py-12 px-4 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-xl font-bold text-white tracking-widest uppercase flex items-center justify-center md:justify-start gap-2 mb-2">
            <span className="w-2 h-2 bg-accent-primary rounded-full inline-block"></span>
            AI.Recruit
          </div>
          <p className="text-slate-500 text-sm">
            AI Recruitment Management System using Decision Tree Machine Learning.
          </p>
        </div>
        
        <div className="flex flex-col items-center md:items-end gap-2 text-sm text-slate-400">
          <a 
            href="#" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub Repository
          </a>
          <p>Academic Project &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
