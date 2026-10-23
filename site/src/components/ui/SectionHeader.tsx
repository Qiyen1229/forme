import type { ReactNode } from "react";
import { Reveal } from "./Reveal";
import { SplitHeading } from "./SplitHeading";

interface Props {
  index: string;
  label: string;
  heading: string;
  children?: ReactNode;
  className?: string;
}

/** Consistent section opener: mono index + hairline + large editorial heading. */
export function SectionHeader({ index, label, heading, children, className = "" }: Props) {
  return (
    <header className={className}>
      <Reveal className="mb-10 flex items-center gap-4 md:mb-14">
        <span className="mono-label text-gold">{index}</span>
        <span className="hairline w-12 md:w-24" />
        <span className="mono-label">{label}</span>
      </Reveal>
      <SplitHeading text={heading} className="text-[clamp(2.35rem,6.4vw,5.75rem)]" />
      {children}
    </header>
  );
}
