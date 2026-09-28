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
    <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--paper)]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-[var(--navy)] font-serif text-lg text-[var(--gold)]">
            C
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-base font-semibold text-[var(--navy)] sm:text-lg">
              {CLUB.name}
            </span>
            <span className="hidden text-xs text-[var(--muted)] sm:block">
              {CLUB.chapter}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[var(--navy)] text-white"
                    : "text-[var(--ink)] hover:bg-[var(--cream)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          className="rounded-md p-2 sm:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>
      {open ? (
        <nav className="border-t border-[var(--line)] bg-[var(--paper)] px-4 py-3 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-2 text-[var(--navy)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}
