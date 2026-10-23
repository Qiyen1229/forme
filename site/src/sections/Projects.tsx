"use client";

import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projectFilters, projects } from "@/data/projects";

export function Projects() {
  const [filter, setFilter] = useState<string>("all");
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const count = (id: string) => (id === "all" ? projects.length : projects.filter((p) => p.category === id).length);

  return (
    <section id="projects" aria-label="Projects" className="relative py-28 md:py-44">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader index="02" label="PROJECTS" heading="SELECTED *PROJECTS.*" />
          <Reveal className="max-w-sm lg:pb-3">
            <p className="text-[0.95rem] leading-[1.9] text-mist">
              我為自己打造的工具與系統。每一個都是為了解決真實的小問題而開始的。
            </p>
          </Reveal>
        </div>

        <Reveal className="mt-14 md:mt-20">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y border-line py-4">
            <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-1">
              {projectFilters.map((f) => {
                const active = filter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={`relative rounded-full px-4 py-2.5 font-mono text-[0.6875rem] tracking-[0.18em] transition-colors ${
                      active ? "text-ink" : "text-mist hover:text-snow"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    <span className="relative">
                      {f.label} <span className="opacity-60">{String(count(f.id)).padStart(2, "0")}</span>
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mono-label" aria-live="polite">
              {visible.length} / {projects.length} SHOWN
            </p>
          </div>
        </Reveal>

        <LayoutGroup>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i} />
              ))}
            </AnimatePresence>
          </ul>
        </LayoutGroup>

      </div>
    </section>
  );
}
