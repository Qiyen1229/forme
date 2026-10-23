/** Pure-CSS intro curtain: no JS, no flash, skipped on repeat visits. */
export function Loader() {
  return (
    <div className="loader" aria-hidden="true">
      <div className="flex w-[min(78vw,360px)] flex-col gap-6">
        <div className="flex items-end justify-between">
          <span className="font-script text-4xl italic text-snow">Qiyen</span>
          <span className="loader-count font-mono text-xs tracking-[0.2em] text-gold" />
        </div>
        <div className="h-px w-full bg-line-strong">
          <div className="loader-line h-full bg-gold" />
        </div>
        <span className="mono-label">Building my own future</span>
      </div>
    </div>
  );
}
