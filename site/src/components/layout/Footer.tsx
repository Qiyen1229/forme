import Link from "next/link";
import { nav, site } from "@/data/site";
import { LiveClock } from "./LiveClock";

export function Footer() {
  return (
    <footer className="relative border-t border-line">
      <div className="shell flex flex-col gap-10 py-12 md:flex-row md:items-end md:justify-between">
        <div className="space-y-3">
          <p className="font-script text-3xl italic">Qiyen</p>
          <p className="max-w-xs text-sm leading-relaxed text-mist">
            Build My Own Future. 持續探索、持續建構、持續成為。
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {nav.map((n) => (
              <li key={n.id}>
                <Link
                  href={n.id === "home" ? "/" : `/#${n.id}`}
                  className="mono-label transition-colors hover:text-gold"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-3 md:text-right">
          <p className="mono-label flex items-center gap-2 md:justify-end">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-pink" aria-hidden="true" />
            {site.city} · <LiveClock className="tabular-nums text-snow/80" />
          </p>
          <p className="mono-label">© {site.year} {site.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
