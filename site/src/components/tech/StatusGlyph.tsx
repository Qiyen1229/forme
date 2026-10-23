import type { TechStatus } from "@/types";

/** Status is encoded by shape (dashed / ring+dot / ring+disc / solid), never colour alone. */
export function StatusGlyph({ status }: { status: TechStatus }) {
  const c = "var(--color-gold)";
  switch (status) {
    case "exploring":
      return <circle r="5" fill="none" stroke={c} strokeWidth="1.2" strokeDasharray="2 2.2" />;
    case "learning":
      return (
        <>
          <circle r="5" fill="none" stroke={c} strokeWidth="1.2" />
          <circle r="1.6" fill={c} />
        </>
      );
    case "building":
      return (
        <>
          <circle r="5.2" fill="none" stroke={c} strokeWidth="1.2" />
          <circle r="3" fill={c} />
        </>
      );
    case "proficient":
      return <circle r="5.6" fill={c} />;
  }
}

export function StatusIcon({ status, className }: { status: TechStatus; className?: string }) {
  return (
    <svg viewBox="-8 -8 16 16" width="16" height="16" className={className} aria-hidden="true">
      <StatusGlyph status={status} />
    </svg>
  );
}
