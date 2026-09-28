import { CLUB } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-neon-cyan/30 bg-[#050505] text-slate-300 shadow-[0_-4px_20px_rgba(0,240,255,0.05)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        
        {/* Top Section: Club Info */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse bg-neon-purple"></span>
            <p className="font-display text-lg font-bold uppercase tracking-widest text-white">
              {CLUB.name}
            </p>
          </div>
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500 sm:text-right">
            <span className="text-neon-pink">{CLUB.chapter}</span> 
            <span className="mx-2 text-slate-700">|</span> 
            System Build: Campus Recruitment Task
          </p>
        </div>
        
        {/* Bottom Section: Developer Identity Log */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-slate-800/50 pt-6 sm:flex-row gap-4">
          <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest hidden sm:block">
            &gt;&nbsp;ENCRYPTED_CONNECTION_ESTABLISHED
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-3 font-mono text-xs uppercase tracking-wider text-slate-400">
            <span className="text-neon-cyan">sys.admin:</span>
            <span className="font-bold text-white">
              Tushar Chaudhary
            </span>
            <span className="text-slate-700 hidden sm:inline">|</span>
            
            <a 
              href="https://github.com/TusharChaudhary-tcc" 
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-neon-purple hover:drop-shadow-[0_0_5px_var(--color-neon-purple)]"
            >
              GitHub_Access
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href="https://www.linkedin.com/in/chaudharytushar01/" 
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-neon-pink hover:drop-shadow-[0_0_5px_var(--color-neon-pink)]"
            >
              Network_Profile
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}