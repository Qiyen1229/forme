"use client";

import { motion } from "motion/react";
import {
  ArrowUpRight,
  Bike,
  Cloud,
  Clipboard,
  FileText,
  GitBranch,
  Link2,
  LineChart,
  Wallet,
  Wrench,
} from "lucide-react";
import type { PointerEvent } from "react";
import type { IconName, Project } from "@/types";
import { ProjectCover } from "./ProjectCover";

const icons: Record<IconName, typeof Link2> = {
  link: Link2,
  wallet: Wallet,
  chart: LineChart,
  wrench: Wrench,
  cloud: Cloud,
  clipboard: Clipboard,
  file: FileText,
  bike: Bike,
};

const statusLabel: Record<Project["status"], string> = {
  live: "LIVE",
  building: "BUILDING",
  prototype: "PROTOTYPE",
  archived: "ARCHIVED",
};

const categoryLabel: Record<Project["category"], string> = {
  finance: "FINANCE",
  tools: "TOOLS",
  life: "LIFE",
};

function host(url: string) {
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Icon = icons[project.icon];

  const onMove = (e: PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: "0px 0px -6% 0px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="list-none"
    >
      <article
        onPointerMove={onMove}
        className="group spotlight relative flex h-full flex-col overflow-hidden rounded-2xl border border-line transition-[transform,border-color] duration-500 ease-[var(--ease-expo)] hover:-translate-y-1 hover:border-transparent focus-within:border-transparent"
      >
        {/* cover */}
        <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-ink-3">
          <ProjectCover motif={project.motif} />
          <span className="absolute left-4 top-4 font-mono text-[0.6875rem] tracking-[0.2em] text-mist">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-line-strong bg-ink/60 px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.18em] text-snow backdrop-blur">
            <span
              className={`size-1.5 rounded-full ${
                project.status === "live" ? "animate-pulse-soft bg-pink" : "bg-gold"
              }`}
              aria-hidden="true"
            />
            {statusLabel[project.status]}
          </span>
          <span className="absolute bottom-4 left-4 grid size-10 place-items-center rounded-xl border border-line-strong bg-ink/70 text-gold backdrop-blur transition-colors duration-500 group-hover:border-gold">
            <Icon size={18} strokeWidth={1.5} aria-hidden="true" />
          </span>
        </div>

        {/* body */}
        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mono-label">{categoryLabel[project.category]}</p>
          <h3 className="mt-3 flex items-start justify-between gap-4 text-2xl font-medium tracking-tight">
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="after:absolute after:inset-0 after:z-[1] after:content-[''] focus-visible:outline-offset-[-4px]"
            >
              {project.name}
              <span className="sr-only"> — open {host(project.demo)} in a new tab</span>
            </a>
            <ArrowUpRight
              aria-hidden="true"
              size={22}
              strokeWidth={1.5}
              className="mt-1 shrink-0 text-mist transition-all duration-500 ease-[var(--ease-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold"
            />
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-snow/70">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags and stack">
            {project.tags.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-snow/70"
              >
                {t}
              </li>
            ))}
            {project.stack.length > 0 ? (
              project.stack.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-gold/30 px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-gold"
                >
                  {s}
                </li>
              ))
            ) : (
              <li className="rounded-full border border-dashed border-line-strong px-2.5 py-1 font-mono text-[0.625rem] tracking-wider text-mist">
                STACK · TBA
              </li>
            )}
          </ul>

          <div className="mt-auto flex items-center justify-between gap-4 pt-6">
            <span className="truncate font-mono text-xs text-mist transition-colors duration-500 group-hover:text-snow">
              {host(project.demo)}
            </span>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.name} on GitHub`}
                className="relative z-[2] grid size-9 place-items-center rounded-full border border-line-strong text-mist transition-colors hover:border-gold hover:text-gold"
              >
                <GitBranch size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </article>
    </motion.li>
  );
}
