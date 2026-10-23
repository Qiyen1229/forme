"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Char({
  ch,
  progress,
  range,
}: {
  ch: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{ch}</motion.span>;
}

/** Paragraphs that "read themselves" as you scroll through them. */
export function ScrollText({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.6"] });

  if (reduce) {
    return (
      <div className={className}>
        {paragraphs.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    );
  }

  const lengths = paragraphs.map((p) => Array.from(p).length);
  const total = lengths.reduce((a, b) => a + b, 0);
  const starts = lengths.map((_, i) => lengths.slice(0, i).reduce((a, b) => a + b, 0));

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((p, pi) => {
        const chars = Array.from(p);
        const start = starts[pi];
        return (
          <p key={p}>
            <span className="sr-only">{p}</span>
            <span aria-hidden="true">
              {chars.map((ch, i) => (
                <Char
                  key={i}
                  ch={ch}
                  progress={scrollYProgress}
                  range={[(start + i) / total, Math.min(1, (start + i + 10) / total)]}
                />
              ))}
            </span>
          </p>
        );
      })}
    </div>
  );
}
