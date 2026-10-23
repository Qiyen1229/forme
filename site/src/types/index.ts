export type ProjectStatus = "live" | "building" | "prototype" | "archived";
export type ProjectCategory = "finance" | "tools" | "life";
export type CoverMotif =
  | "link"
  | "rings"
  | "candle"
  | "grid"
  | "layers"
  | "relay"
  | "pages"
  | "route";
export type IconName =
  | "link"
  | "wallet"
  | "chart"
  | "wrench"
  | "cloud"
  | "clipboard"
  | "file"
  | "bike";

export interface Project {
  id: string;
  name: string;
  /** One-line zh-TW description. */
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  motif: CoverMotif;
  icon: IconName;
  /** What it is, in a few words (always shown). */
  tags: string[];
  /** Real tech stack — leave empty until filled in; the card shows a TBA placeholder. */
  stack: string[];
  demo: string;
  github?: string;
}

export type TechStatus = "exploring" | "learning" | "building" | "proficient";

export interface TechItem {
  id: string;
  name: string;
  /** Short label used inside the constellation graph. */
  short: string;
  note: string;
  status: TechStatus;
}

export interface TechGroup {
  id: string;
  code: string;
  /** Short label for the hub node. */
  short: string;
  title: string;
  blurb: string;
  items: TechItem[];
}

export interface SocialLink {
  id: "github" | "email" | "instagram" | "threads";
  label: string;
  handle: string;
  href: string;
}

export interface NavItem {
  id: string;
  label: string;
}

