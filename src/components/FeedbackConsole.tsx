"use client";

import { useState } from "react";
import { MessageSquareWarning, X } from "lucide-react";

export function FeedbackConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    
    // Simulating an API call to a future feedback endpoint
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setPending(false);
    setSubmitted(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 3000);
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center border border-neon-pink bg-[#050505] text-neon-pink shadow-[0_0_15px_rgba(255,0,60,0.2)] transition-all hover:bg-neon-pink hover:text-black hover:shadow-[0_0_25px_rgba(255,0,60,0.5)]"
        aria-label="Open Diagnostics Console"
      >
        <MessageSquareWarning size={20} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 border border-slate-800 bg-[#0a0f1d]/95 p-5 shadow-[0_0_40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:w-96">
      {/* Cyber Decor */}
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-neon-pink via-neon-purple to-transparent"></div>
      
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-widest text-white">
          <span className="text-neon-pink">///</span> Diagnostics Console
        </h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-slate-500 transition-colors hover:text-neon-pink"
        >
          <X size={18} />
        </button>
      </div>

      {submitted ? (
        <div className="py-10 text-center">
          <p className="font-mono text-sm uppercase tracking-widest text-neon-cyan animate-pulse">
            &gt; Log transmitted successfully.
          </p>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-4 grid gap-4">
          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            [SYS.DEFECT_CLASS]
            <select
              name="category"
              required
              className="mt-1 h-10 rounded-none border border-slate-700 bg-[#050505] px-3 font-mono text-xs text-white outline-none transition-all focus:border-neon-pink"
            >
              <option value="ui_ux">UI/UX Interface Defect</option>
              <option value="form_data">Unsaved Form Data Loss</option>
              <option value="routing">Routing / 404 Error</option>
              <option value="other">Other System Anomaly</option>
            </select>
          </label>
          
          <label className="grid gap-1 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            [SYS.ERROR_LOG]
            <textarea
              name="description"
              required
              rows={4}
              placeholder="DESCRIBE THE ANOMALY..."
              className="mt-1 resize-none rounded-none border border-slate-700 bg-[#050505] p-3 font-mono text-xs text-white placeholder-slate-600 outline-none transition-all focus:border-neon-pink focus:shadow-[inset_0_0_10px_rgba(255,0,60,0.1)]"
            ></textarea>
          </label>
          
          <button
            type="submit"
            disabled={pending}
            className="mt-2 w-full border border-neon-pink bg-neon-pink/10 py-3 font-display text-xs font-bold uppercase tracking-widest text-neon-pink transition-all hover:bg-neon-pink hover:text-white hover:shadow-[0_0_15px_var(--color-neon-pink)] disabled:opacity-50 disabled:hover:bg-neon-pink/10 disabled:hover:text-neon-pink disabled:hover:shadow-none"
          >
            {pending ? "Transmitting..." : "Submit Log"}
          </button>
        </form>
      )}
    </div>
  );
}