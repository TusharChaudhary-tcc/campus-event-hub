"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { CLUB } from "@/lib/constants";

const links = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/admin", label: "Admin" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-neon-cyan/30 bg-[#050505]/80 backdrop-blur-md shadow-[0_4px_30px_rgba(0,240,255,0.05)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          {/* Cyberpunk Logo Icon */}
          <span className="grid h-10 w-10 place-items-center border-2 border-neon-cyan bg-neon-cyan/10 font-display text-xl font-bold text-neon-cyan shadow-[0_0_10px_var(--color-neon-cyan)] transition-all group-hover:bg-neon-cyan group-hover:text-black">
            C
          </span>
          <span className="leading-tight">
            <span className="block font-display text-base font-bold uppercase tracking-wider text-white transition-colors group-hover:text-neon-cyan sm:text-lg">
              {CLUB.name}
            </span>
            <span className="hidden text-xs font-bold uppercase tracking-widest text-neon-pink sm:block">
              {CLUB.chapter}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-2 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative overflow-hidden px-5 py-2 font-display text-sm font-bold uppercase tracking-widest transition-all ${
                  active
                    ? "border border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.2)]"
                    : "border border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/50 hover:text-white"
                }`}
              >
                {/* Active Terminal Cursor Indicator */}
                {active && (
                  <span className="absolute left-0 top-0 h-full w-1 animate-pulse bg-neon-cyan"></span>
                )}
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="p-2 text-neon-cyan transition-all hover:text-neon-purple hover:drop-shadow-[0_0_8px_var(--color-neon-purple)] sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {open ? (
        <nav className="border-t border-neon-cyan/30 bg-[#050505] px-4 py-4 sm:hidden">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`mb-2 block border-l-4 px-4 py-3 font-display text-sm font-bold uppercase tracking-widest transition-all ${
                  active
                    ? "border-neon-cyan bg-neon-cyan/10 text-neon-cyan shadow-[inset_10px_0_20px_-10px_rgba(0,240,255,0.3)]"
                    : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-900 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      ) : null}
    </header>
  );
}