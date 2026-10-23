"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { LiveClock } from "@/components/layout/LiveClock";
import { OrbCanvas } from "@/components/hero/OrbCanvas";
import { hero, site } from "@/data/site";

function Tagline({ text }: { text: string }) {
  // "*FUTURE.*" → serif accent with pink full stop
  return (
    <>
      {text.split(" ").map((w, i) => {
        const em = w.startsWith("*");
        const clean = w.replaceAll("*", "");
        const dot = clean.endsWith(".");
        const word = dot ? clean.slice(0, -1) : clean;
        return (
          <span key={i} className="mr-[0.4em] inline-block last:mr-0">
            {em ? <em className="text-gold not-italic">{word}</em> : word}
            {dot && "."}
          </span>
        );
      })}
    </>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const orbY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const copyY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      aria-label="Introduction"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* backdrop: orb + faint grid + vignette */}
      <motion.div
        aria-hidden="true"
        style={{ y: orbY, scale: orbScale }}
        className="intro-fade pointer-events-none absolute -right-[42%] top-[36%] -z-10 aspect-square w-[128vw] max-w-[1180px] sm:right-[-14%] sm:top-1/2 sm:-translate-y-1/2 sm:w-[84vw] lg:-right-[6%] lg:w-[68vw]"
      >
        <OrbCanvas className="size-full opacity-60 sm:opacity-100" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.5] [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_30%_50%,#000_10%,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-ink to-transparent"
      />

      <motion.div
        style={{ y: copyY, opacity: copyOpacity }}
        className="shell flex min-h-[100svh] flex-col justify-between pb-8 pt-24 md:pt-28"
      >
        {/* top meta */}
        <div className="intro flex items-center justify-between gap-6" style={{ ["--d" as string]: "0.1s" }}>
          <p className="mono-label flex items-center gap-3">
            <span className="hairline hidden w-10 sm:block" />
            {hero.eyebrow}
          </p>
          <p className="mono-label hidden items-center gap-2 sm:flex">
            {site.city}
            <span className="text-snow/30">/</span>
            <LiveClock className="tabular-nums text-snow/80" />
          </p>
        </div>

        {/* headline block */}
        <div className="py-10 md:py-12">
          <h1 className="text-balance">
            <span className="sr-only">
              {site.handle} — Building my own future.
            </span>
            <span aria-hidden="true" className="block">
              <span className="intro block py-[0.1em] pr-[0.2em] font-script text-[clamp(3.5rem,min(11vw,17svh),8rem)] font-normal italic leading-[1.1] tracking-normal text-snow" style={{ ["--d" as string]: "0s" }}>
                  Qiyen
                </span>
              <span className="intro mt-2 block pb-[0.2em] pr-[0.2em] md:mt-4 font-script text-[clamp(1.5rem,3.4vw,2.6rem)] italic leading-[1.25] tracking-normal text-snow/90" style={{ ["--d" as string]: "0.18s" }}>
                  <Tagline text={hero.tagline} />
                </span>
            </span>
          </h1>

          <div className="mt-8 grid gap-10 md:mt-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="space-y-1 text-[clamp(1.25rem,2.2vw,1.75rem)] font-light leading-snug tracking-[0.06em] text-snow">
                {hero.zhLines.map((line, i) => (
                  <span
                    key={line}
                    className="intro block"
                    style={{ ["--d" as string]: `${0.4 + i * 0.12}s` }}
                  >
                    {line}
                  </span>
                ))}
              </p>
              <p
                className="intro mt-6 max-w-md text-[0.95rem] leading-[1.9] text-mist"
                style={{ ["--d" as string]: "0.85s" }}
              >
                {hero.intro}
              </p>

              <div
                className="intro mt-9 flex flex-wrap gap-3"
                style={{ ["--d" as string]: "1s" }}
              >
                <a href={hero.primaryCta.href} className="btn btn-primary">
                  {hero.primaryCta.label}
                  <ArrowUpRight size={16} className="arrow" aria-hidden="true" />
                </a>
                <a href={hero.secondaryCta.href} className="btn btn-ghost">
                  {hero.secondaryCta.label}
                  <ArrowUpRight size={16} className="arrow" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="flex items-end justify-between gap-6">
          <blockquote
            className="intro-fade max-w-xs font-serif text-[1.05rem] italic leading-snug text-snow/70 sm:max-w-sm sm:text-lg"
            style={{ ["--d" as string]: "1.2s" }}
          >
            {hero.quote[0]}
            <br />
            <span className="text-gold">{hero.quote[1]}</span>
          </blockquote>

          <a
            href="#about"
            aria-label="Scroll to About"
            className="intro-fade group flex flex-col items-center gap-3"
            style={{ ["--d" as string]: "1.4s" }}
          >
            <span className="mono-label transition-colors group-hover:text-gold [writing-mode:vertical-rl]">
              SCROLL
            </span>
            <span className="relative block h-14 w-px overflow-hidden bg-line-strong">
              <span className="absolute inset-0 animate-scroll-dot bg-gold" />
            </span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
