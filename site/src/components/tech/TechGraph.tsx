"use client";

import { motion } from "motion/react";
import { techGroups } from "@/data/tech";
import { StatusGlyph } from "./StatusGlyph";

const C = 300;
const HUB_R = 104;
const LEAF_R = 200;
const rad = (d: number) => (d * Math.PI) / 180;
const polar = (deg: number, r: number) => ({ x: C + Math.cos(rad(deg)) * r, y: C + Math.sin(rad(deg)) * r });

const HUB_ANGLES = techGroups.map((_, i) => -90 + (i * 360) / techGroups.length);
const LEAF_OFFSETS = [-34, 0, 34];

interface Props {
  active: string | null;
  onActive: (id: string | null) => void;
}

/** Decorative constellation. The list beside it is the accessible source of truth. */
export function TechGraph({ active, onActive }: Props) {
  const activeGroup = techGroups.find((g) => g.items.some((i) => i.id === active))?.id ?? null;

  return (
    <svg
      viewBox="0 64 600 480"
      className="mx-auto block w-full max-w-[560px] overflow-visible"
      aria-hidden="true"
      onPointerLeave={() => onActive(null)}
    >
      {/* orbit guides */}
      <circle cx={C} cy={C} r={HUB_R} fill="none" stroke="rgb(245 245 247)" strokeOpacity="0.06" />
      <circle cx={C} cy={C} r={LEAF_R} fill="none" stroke="rgb(245 245 247)" strokeOpacity="0.06" strokeDasharray="2 7" />

      {techGroups.map((g, gi) => {
        const hub = polar(HUB_ANGLES[gi], HUB_R);
        const groupLive = activeGroup === g.id;
        return (
          <g key={g.id}>
            <motion.line
              x1={C}
              y1={C}
              x2={hub.x}
              y2={hub.y}
              stroke={groupLive ? "#E8A7BD" : "#C8A96B"}
              strokeOpacity={groupLive ? 0.8 : 0.35}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: 0.1 + gi * 0.15, ease: [0.16, 1, 0.3, 1] }}
            />
            {g.items.map((item, li) => {
              const p = polar(HUB_ANGLES[gi] + LEAF_OFFSETS[li], LEAF_R);
              const live = active === item.id;
              const cos = Math.cos(rad(HUB_ANGLES[gi] + LEAF_OFFSETS[li]));
              const anchor = cos > 0.35 ? "start" : cos < -0.35 ? "end" : "middle";
              const dx = anchor === "start" ? 24 : anchor === "end" ? -24 : 0;
              const dy = anchor === "middle" ? (p.y < C ? -24 : 34) : 5;
              return (
                <g key={item.id}>
                  <motion.line
                    x1={hub.x}
                    y1={hub.y}
                    x2={p.x}
                    y2={p.y}
                    stroke={live ? "#E8A7BD" : "#C8A96B"}
                    strokeOpacity={live ? 0.9 : 0.22}
                    strokeWidth="1"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5 + gi * 0.15 + li * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <g
                    transform={`translate(${p.x} ${p.y})`}
                    onPointerEnter={() => onActive(item.id)}
                    className="cursor-default"
                  >
                    <g className="animate-float" style={{ animationDelay: `${(gi * 3 + li) * -0.7}s` }}>
                      <circle r="24" fill="transparent" />
                      <circle
                        r={live ? 20 : 16}
                        fill="#09090B"
                        stroke={live ? "#E8A7BD" : "rgb(245 245 247)"}
                        strokeOpacity={live ? 1 : 0.14}
                        style={{ transition: "all .4s cubic-bezier(.16,1,.3,1)" }}
                      />
                      <g transform="scale(1.4)">
                        <StatusGlyph status={item.status} />
                      </g>
                      <text
                        x={dx}
                        y={dy}
                        textAnchor={anchor}
                        className={`font-mono text-[15px] transition-colors ${
                          live ? "fill-snow" : "fill-mist"
                        }`}
                      >
                        {item.short}
                      </text>
                    </g>
                  </g>
                </g>
              );
            })}

            <g transform={`translate(${hub.x} ${hub.y})`}>
              <circle
                r="29"
                fill="#0E0E12"
                stroke={groupLive ? "#E8A7BD" : "#C8A96B"}
                strokeOpacity={groupLive ? 1 : 0.6}
                style={{ transition: "stroke .4s" }}
              />
              <text textAnchor="middle" y="4.5" className="fill-snow font-mono text-[13px] tracking-[0.12em]">
                {g.short}
              </text>
            </g>
          </g>
        );
      })}

      {/* core */}
      <g transform={`translate(${C} ${C})`}>
        <circle r="48" fill="#E8A7BD" fillOpacity="0.05" className="animate-pulse-soft" />
        <circle r="34" fill="#09090B" stroke="#E8A7BD" strokeOpacity="0.75" />
        <circle r="4" fill="#E8A7BD" />
      </g>
      <text x={C} y={C + 64} textAnchor="middle" className="fill-mist font-mono text-[11px] tracking-[0.3em]">
        CURIOSITY
      </text>
    </svg>
  );
}
