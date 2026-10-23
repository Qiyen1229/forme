"use client";

import { motion, type Variants } from "motion/react";
import type { ElementType } from "react";

interface Props {
  /** Plain text. Wrap a word in *asterisks* for the serif accent; a trailing "." becomes the pink full stop. */
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
}

interface Word {
  text: string;
  em: boolean;
  dot: boolean;
}

function parse(text: string): Word[] {
  return text.split(/\s+/).map((raw) => {
    const em = raw.startsWith("*") || raw.endsWith("*");
    let t = raw.replaceAll("*", "");
    const dot = t.endsWith(".");
    if (dot) t = t.slice(0, -1);
    return { text: t, em, dot };
  });
}

/** Heading whose words slide up out of a mask when scrolled into view. */
const container: Variants = {
  hidden: {},
  show: (delay: number) => ({ transition: { staggerChildren: 0.07, delayChildren: delay } }),
};
const word: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

/**
 * Heading whose words slide up out of a mask when scrolled into view.
 * The observed element is the (unclipped) container — observing a child that
 * starts fully clipped by `overflow: hidden` would never intersect.
 */
export function SplitHeading({ text, as: Tag = "h2", className = "", delay = 0 }: Props) {
  const words = parse(text);
  const plain = text.replaceAll("*", "");
  return (
    <Tag className={`display ${className}`}>
      <span className="sr-only">{plain}</span>
      <motion.span
        aria-hidden="true"
        className="block"
        variants={container}
        custom={delay}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      >
        {words.map((w, i) => (
          <span
            key={i}
            className="mr-[0.14em] -ml-[0.1em] inline-block overflow-hidden px-[0.1em] pb-[0.12em] align-bottom -mb-[0.12em] last:mr-0"
          >
            <motion.span className="inline-block will-change-transform" variants={word}>
              {w.em ? <em>{w.text}</em> : w.text}
              {w.dot && "."}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
