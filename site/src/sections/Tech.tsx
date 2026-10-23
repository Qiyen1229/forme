"use client";

import { useState } from "react";
import { StatusIcon } from "@/components/tech/StatusGlyph";
import { TechGraph } from "@/components/tech/TechGraph";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { techGroups, techStatusMeta } from "@/data/tech";
import type { TechStatus } from "@/types";

const STATUSES: TechStatus[] = ["exploring", "learning", "building", "proficient"];

export function Tech() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="tech" aria-label="Tech" className="relative py-28 md:py-44">
      <div className="shell">
        <SectionHeader index="03" label="TECH" heading="TOOLS, SYSTEMS & *CURIOSITY.*" />

        <div className="mt-8 flex flex-col gap-6 md:mt-12 md:flex-row md:items-end md:justify-between">
          <Reveal>
            <p className="max-w-xl text-[clamp(1.05rem,1.6vw,1.25rem)] font-light leading-relaxed text-snow/80">
              這不是技能條，而是我的探索地圖。每個節點都誠實標示我現在所在的位置。
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Status legend">
              {STATUSES.map((s) => (
                <li key={s} className="flex items-center gap-2 font-mono text-[0.625rem] tracking-[0.16em] text-mist">
                  <StatusIcon status={s} />
                  {techStatusMeta[s].label.toUpperCase()}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="mt-14 grid items-start gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal className="hidden lg:sticky lg:top-28 lg:col-span-6 lg:block lg:self-start">
            <TechGraph active={active} onActive={setActive} />
          </Reveal>

          <div className="lg:col-span-6">
            <div className="space-y-12">
              {techGroups.map((g, gi) => (
                <Reveal key={g.id} delay={gi * 0.08}>
                  <section aria-labelledby={`tech-${g.id}`}>
                    <div className="flex items-baseline gap-4 border-b border-line-strong pb-4">
                      <span className="font-mono text-xs text-gold">{g.code}</span>
                      <h3 id={`tech-${g.id}`} className="text-xl font-medium tracking-tight">
                        {g.title}
                      </h3>
                      <span className="ml-auto hidden text-sm text-mist sm:block">{g.blurb}</span>
                    </div>
                    <ul>
                      {g.items.map((item) => {
                        const live = active === item.id;
                        return (
                          <li
                            key={item.id}
                            onPointerEnter={() => setActive(item.id)}
                            onPointerLeave={() => setActive(null)}
                            className={`flex items-center gap-4 border-b border-line py-4 transition-[padding,background-color] duration-500 ease-[var(--ease-expo)] ${
                              live ? "bg-white/[0.025] pl-3" : ""
                            }`}
                          >
                            <StatusIcon status={item.status} className="shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="font-medium">{item.name}</p>
                              <p className="mt-0.5 text-sm text-mist">{item.note}</p>
                            </div>
                            <span className="shrink-0 font-mono text-[0.625rem] tracking-[0.16em] text-mist">
                              {techStatusMeta[item.status].label.toUpperCase()}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
