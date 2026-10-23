import type { CoverMotif } from "@/types";

const G = "var(--color-gold)";
const P = "var(--color-pink)";
const M = "var(--color-mist)";

/** Each motif is a tiny abstract diagram of what the project does. */
const motifs: Record<CoverMotif, React.ReactNode> = {
  // long url → short url
  link: (
    <g fill="none" strokeLinecap="round">
      <line x1="46" y1="84" x2="354" y2="84" stroke={M} strokeWidth="1.2" strokeDasharray="1 7" />
      <path d="M200 106 v26 m-8 -8 l8 8 l8 -8" stroke={M} strokeWidth="1.2" />
      <line x1="150" y1="170" x2="250" y2="170" stroke={G} strokeWidth="2.4" />
      <circle cx="262" cy="170" r="4" fill={P} />
      <circle cx="138" cy="170" r="2.5" fill={G} />
    </g>
  ),
  // allocation rings
  rings: (
    <g fill="none">
      {[28, 52, 76, 100].map((r, i) => (
        <circle key={r} cx="200" cy="125" r={r} stroke={G} strokeOpacity={0.75 - i * 0.15} strokeWidth="1" />
      ))}
      <circle cx="200" cy="125" r="3.5" fill={G} />
      <circle cx={200 + 76 * Math.cos(-0.7)} cy={125 + 76 * Math.sin(-0.7)} r="5" fill={P} />
      <circle cx={200 + 100 * Math.cos(2.4)} cy={125 + 100 * Math.sin(2.4)} r="3" fill={G} />
    </g>
  ),
  // candlesticks
  candle: (
    <g fill="none" strokeLinecap="round">
      {[
        [60, 150, 118, 138, 0],
        [92, 142, 108, 128, 1],
        [124, 136, 112, 122, 0],
        [156, 130, 98, 118, 1],
        [188, 120, 96, 106, 1],
        [220, 116, 92, 100, 0],
        [252, 104, 74, 90, 1],
        [284, 94, 70, 78, 1],
        [316, 86, 58, 68, 1],
      ].map(([x, hi, lo, mid, up], i) => (
        <g key={i}>
          <line x1={x} y1={Math.min(hi, lo) - 8} x2={x} y2={Math.max(hi, lo) + 12} stroke={up ? G : M} strokeWidth="1" />
          <rect
            x={Number(x) - 6}
            y={Number(mid) - 6}
            width="12"
            height="22"
            rx="1.5"
            stroke={up ? G : M}
            fill={up ? G : "none"}
            fillOpacity={up ? 0.25 : 0}
          />
        </g>
      ))}
      <path d="M52 168 L120 150 L188 128 L256 104 L330 70" stroke={P} strokeWidth="1.2" strokeDasharray="3 5" />
      <circle cx="330" cy="70" r="4" fill={P} />
    </g>
  ),
  // toolbox grid
  grid: (
    <g fill="none">
      {Array.from({ length: 8 }, (_, i) => {
        const x = 98 + (i % 4) * 54;
        const y = 80 + Math.floor(i / 4) * 54;
        const hot = i === 2;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width="40"
            height="40"
            rx="9"
            stroke={hot ? G : M}
            strokeOpacity={hot ? 1 : 0.55}
            fill={hot ? G : "none"}
            fillOpacity={hot ? 0.14 : 0}
          />
        );
      })}
      <circle cx="244" cy="86" r="3.5" fill={P} />
    </g>
  ),
  // stacked storage layers
  layers: (
    <g fill="none" strokeLinejoin="round">
      {[0, 1, 2].map((i) => (
        <path
          key={i}
          d={`M200 ${64 + i * 30} L290 ${96 + i * 30} L200 ${128 + i * 30} L110 ${96 + i * 30} Z`}
          stroke={i === 0 ? G : M}
          strokeOpacity={i === 0 ? 1 : 0.6}
          fill={i === 0 ? G : "none"}
          fillOpacity={0.1}
        />
      ))}
      <circle cx="200" cy="96" r="4" fill={P} />
    </g>
  ),
  // cross-device relay
  relay: (
    <g fill="none" strokeLinecap="round">
      <rect x="62" y="84" width="58" height="92" rx="9" stroke={M} />
      <rect x="86" y="164" width="10" height="2" rx="1" fill={M} stroke="none" />
      <rect x="258" y="72" width="100" height="64" rx="6" stroke={G} />
      <path d="M244 146 H372" stroke={G} />
      <path d="M72 104 H108 M72 116 H98 M72 128 H104" stroke={M} strokeOpacity="0.6" />
      <path d="M270 90 H330 M270 102 H316 M270 114 H322" stroke={G} strokeOpacity="0.7" />
      <path d="M126 128 C 170 128, 200 104, 252 104" stroke={G} strokeDasharray="3 6" />
      <circle cx="188" cy="116" r="4.5" fill={P} />
    </g>
  ),
  // stacked pages
  pages: (
    <g fill="none" strokeLinejoin="round">
      <rect x="132" y="52" width="130" height="164" rx="8" stroke={M} strokeOpacity="0.4" transform="rotate(-8 197 134)" />
      <rect x="126" y="46" width="130" height="164" rx="8" stroke={M} strokeOpacity="0.65" transform="rotate(-3 191 128)" />
      <rect x="130" y="40" width="130" height="164" rx="8" stroke={G} />
      <path d="M152 74 H238 M152 92 H226 M152 110 H238 M152 128 H210" stroke={M} strokeLinecap="round" />
      <path d="M236 40 v26 h24" stroke={G} />
      <circle cx="238" cy="172" r="5" fill={P} />
    </g>
  ),
  // winding route
  route: (
    <g fill="none" strokeLinecap="round">
      <path
        d="M52 178 C 110 178, 120 92, 178 100 S 250 190, 300 140 S 330 72, 352 76"
        stroke={G}
        strokeWidth="1.6"
      />
      <path
        d="M52 178 C 110 178, 120 92, 178 100 S 250 190, 300 140 S 330 72, 352 76"
        stroke={M}
        strokeWidth="1"
        strokeDasharray="1 8"
        transform="translate(0 12)"
      />
      <circle cx="52" cy="178" r="4" fill={G} />
      <circle cx="352" cy="76" r="5" fill={P} />
      <circle cx="178" cy="100" r="2.5" fill={G} />
      <circle cx="300" cy="140" r="2.5" fill={G} />
    </g>
  ),
};

export function ProjectCover({ motif }: { motif: CoverMotif }) {
  return (
    <svg
      viewBox="0 0 400 250"
      className="absolute inset-0 size-full transition-transform duration-[1100ms] ease-[var(--ease-expo)] group-hover:scale-[1.07] group-focus-within:scale-[1.07]"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="cover-grid" width="25" height="25" patternUnits="userSpaceOnUse">
          <path d="M25 0H0V25" fill="none" stroke="rgb(245 245 247)" strokeOpacity="0.045" />
        </pattern>
        <radialGradient id="cover-glow" cx="50%" cy="48%" r="55%">
          <stop offset="0%" stopColor="#C8A96B" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#C8A96B" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="250" fill="url(#cover-grid)" />
      <rect width="400" height="250" fill="url(#cover-glow)" />
      {motifs[motif]}
    </svg>
  );
}
