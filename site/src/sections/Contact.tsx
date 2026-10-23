"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { SocialIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { contact, email, socials } from "@/data/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — the mailto link still works */
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="relative overflow-hidden py-28 md:py-44">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[70%] bg-[radial-gradient(ellipse_60%_80%_at_50%_100%,rgb(200_169_107/0.09),transparent_70%)]" />
      <div className="shell">
        <SectionHeader index="04" label="CONTACT" heading={contact.heading} />

        <div className="mt-10 flex flex-wrap gap-x-6 gap-y-1">
          {contact.mantra.map((m, i) => (
            <Reveal key={m} delay={0.15 + i * 0.12}>
              <p className="font-serif text-[clamp(1.25rem,2.4vw,1.9rem)] italic text-snow/70">{m}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-14 lg:mt-24 lg:grid-cols-12 lg:gap-10">
          {/* links */}
          <div className="lg:col-span-8">
            <Reveal>
              <ul className="border-t border-line">
                {socials.map((s) => {
                  const isMail = s.id === "email";
                  return (
                    <li key={s.id} className="border-b border-line">
                      <div className="group relative flex items-center gap-4 py-5 transition-[padding] duration-500 ease-[var(--ease-expo)] hover:pl-3">
                        <a
                          href={s.href}
                          {...(isMail ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                          className="flex min-w-0 flex-1 items-center gap-4 after:absolute after:inset-0 after:content-['']"
                        >
                          <SocialIcon id={s.id} className="size-5 shrink-0 text-gold" />
                          <span className="min-w-0">
                            <span className="block text-xl font-medium tracking-tight transition-colors duration-500 group-hover:text-gold sm:text-2xl">
                              {s.label}
                            </span>
                            <span className="mt-0.5 block truncate font-mono text-xs text-mist">{s.handle}</span>
                          </span>
                          <ArrowUpRight
                            aria-hidden="true"
                            size={22}
                            strokeWidth={1.4}
                            className="ml-auto shrink-0 text-mist transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold"
                          />
                        </a>
                        {isMail && (
                          <button
                            type="button"
                            onClick={copyEmail}
                            aria-label="Copy email address"
                            className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full border border-line-strong text-mist transition-colors hover:border-gold hover:text-gold"
                          >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
              <p className="sr-only" role="status">
                {copied ? "Email address copied" : ""}
              </p>
            </Reveal>
          </div>

        </div>
      </div>
    </section>
  );
}
