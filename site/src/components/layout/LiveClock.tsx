"use client";

import { useSyncExternalStore } from "react";
import { site } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timezone,
  hour12: false,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
});

function subscribe(cb: () => void) {
  const id = setInterval(cb, 1000);
  return () => clearInterval(id);
}

/** Hydration-safe live clock for the owner's timezone. */
export function LiveClock({ className }: { className?: string }) {
  const time = useSyncExternalStore(
    subscribe,
    () => fmt.format(new Date()),
    () => "--:--:--",
  );
  return (
    <time className={className} suppressHydrationWarning>
      {time}
    </time>
  );
}
