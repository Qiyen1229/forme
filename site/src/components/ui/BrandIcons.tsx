import { AtSign, GitBranch, Mail } from "lucide-react";
import type { SocialLink } from "@/types";

function Instagram({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function SocialIcon({ id, className }: { id: SocialLink["id"]; className?: string }) {
  switch (id) {
    case "github":
      return <GitBranch className={className} aria-hidden="true" strokeWidth={1.6} />;
    case "email":
      return <Mail className={className} aria-hidden="true" strokeWidth={1.6} />;
    case "instagram":
      return <Instagram className={className} />;
    case "threads":
      return <AtSign className={className} aria-hidden="true" strokeWidth={1.6} />;
  }
}
