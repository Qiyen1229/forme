"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";
import { useActiveSection } from "@/hooks/useActiveSection";
import { LiveClock } from "./LiveClock";

const IDS = nav.map((n) => n.id);

function NavLink({
  id,
  onHome,
  onNavigate,
  className,
  children,
}: {
  id: string;
  onHome: boolean;
  onNavigate: () => void;
  className?: string;
  children: React.ReactNode;
}) {
  if (onHome) {
    return (
      <a href={`#${id}`} className={className} onClick={onNavigate}>
        {children}
      </a>
    );
  }
  return (
    <Link href={id === "home" ? "/" : `/#${id}`} className={className} onClick={onNavigate}>
      {children}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const active = useActiveSection(IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled || open
            ? "border-b border-line bg-ink/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-16 items-center justify-between md:h-[4.5rem]">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="font-script text-[1.7rem] italic leading-none text-snow"
          >
            Qiyen
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((n) => {
                const isActive = onHome && active === n.id;
                return (
                  <li key={n.id}>
                    <NavLink
                      id={n.id}
                      onHome={onHome}
                      onNavigate={close}
                      className={`relative block rounded-full px-3.5 py-2 font-mono text-[0.6875rem] tracking-[0.18em] transition-colors duration-300 ${
                        isActive ? "text-snow" : "text-mist hover:text-snow"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 -z-10 rounded-full border border-line-strong bg-white/[0.04]"
                          transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        />
                      )}
                      {n.label}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <p className="mono-label hidden items-center gap-2 xl:flex">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-pink" aria-hidden="true" />
              TPE <LiveClock className="text-snow/80 tabular-nums" />
            </p>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border border-line-strong text-snow transition-colors hover:border-gold hover:text-gold lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/[0.97] px-[clamp(1.25rem,4vw,3rem)] pb-10 pt-24 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile">
              <ul className="flex flex-col">
                {nav.map((n, i) => (
                  <motion.li
                    key={n.id}
                    className="border-b border-line"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.045, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <NavLink
                      id={n.id}
                      onHome={onHome}
                      onNavigate={close}
                      className="flex min-h-14 items-baseline justify-between py-3.5 text-[1.65rem] font-medium tracking-tight"
                    >
                      <span className={onHome && active === n.id ? "text-gold" : "text-snow"}>{n.label}</span>
                      <span className="mono-label">{String(i + 1).padStart(2, "0")}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <p className="mono-label mt-auto flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-pink" aria-hidden="true" />
              {site.city} · <LiveClock className="tabular-nums" />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
