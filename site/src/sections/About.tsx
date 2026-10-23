import { Cpu, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ScrollText } from "@/components/ui/ScrollText";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { about } from "@/data/site";

const icons = { cpu: Cpu, trend: TrendingUp } as const;

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="relative py-28 md:py-44">
      <div className="shell">
        <SectionHeader index="01" label="ABOUT" heading="A LITTLE *ABOUT* ME." />
        <h2 id="about-heading" className="sr-only">
          About Qiyen
        </h2>

        <div className="mt-14 grid gap-10 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-8 lg:col-start-5">
            <ScrollText
              paragraphs={about.paragraphs}
              className="space-y-6 text-[clamp(1.0625rem,1.35vw,1.2rem)] font-light leading-[2.05] tracking-[0.02em] text-snow md:space-y-7"
            />
            <Reveal className="mt-12 border-t border-line pt-8">
              <p className="font-serif text-[clamp(1.35rem,2.4vw,1.9rem)] italic leading-snug text-gold">
                {about.motto.en}
              </p>
              <p className="mt-3 text-[1.0625rem] tracking-[0.12em] text-snow/80">{about.motto.zh}</p>
            </Reveal>
          </div>
        </div>

        {/* two directions */}
        <div className="mt-20 grid border-t border-line md:mt-28 md:grid-cols-2">
          {about.directions.map((d, i) => {
            const Icon = icons[d.icon];
            return (
              <Reveal key={d.index} delay={i * 0.12}>
                <article
                  className={`group relative h-full overflow-hidden px-0 py-10 md:px-10 md:py-14 ${
                    i === 0 ? "md:pl-0 md:border-r md:border-line" : "md:pr-0"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-pink transition-transform duration-[900ms] ease-[var(--ease-expo)] group-hover:scale-x-100"
                  />
                  <div className="flex items-start justify-between">
                    <span className="outline-num text-[clamp(4rem,9vw,7.5rem)] leading-none transition-[color,-webkit-text-stroke-color] duration-700 group-hover:text-gold/10 group-hover:[-webkit-text-stroke-color:var(--color-gold)]">
                      {d.index}
                    </span>
                    <span className="grid size-12 place-items-center rounded-full border border-line-strong text-gold transition-all duration-500 group-hover:rotate-[18deg] group-hover:border-gold">
                      <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                  </div>
                  <h3 className="mt-8 text-3xl font-medium tracking-tight md:text-4xl">{d.title}</h3>
                  <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.9] text-snow/75">{d.zh}</p>
                  <ul className="mt-8 flex flex-wrap gap-2" aria-label={`${d.title} keywords`}>
                    {d.keywords.map((k) => (
                      <li
                        key={k}
                        className="rounded-full border border-line px-3 py-1.5 font-mono text-[0.6875rem] tracking-wider text-mist transition-colors duration-500 group-hover:border-line-strong group-hover:text-snow"
                      >
                        {k}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>

        {/* principles + now */}
        <div className="mt-6 grid gap-12 border-t border-line pt-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="mono-label mb-8">PRINCIPLES</p>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
              {about.principles.map((p, i) => (
                <li key={p.en} className="border-l border-line pl-4">
                  <span className="font-mono text-[0.6875rem] text-gold">0{i + 1}</span>
                  <p className="mt-3 text-lg font-medium tracking-tight">{p.en}</p>
                  <p className="mt-1 text-sm text-mist">{p.zh}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.1}>
            <p className="mono-label mb-8 flex items-center gap-2">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-pink" aria-hidden="true" />
              NOW
            </p>
            <dl className="divide-y divide-line border-y border-line">
              {about.now.map((n) => (
                <div key={n.label} className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 py-4">
                  <dt className="mono-label">{n.label}</dt>
                  <dd className="text-[0.95rem] text-snow/85">{n.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
