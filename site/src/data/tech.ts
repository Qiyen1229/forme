import type { TechGroup, TechStatus } from "@/types";

/**
 * Honest self-assessment, not a skill meter.
 * exploring → learning → building → proficient
 * Only raise a status when there is real work to point at.
 */
export const techGroups: TechGroup[] = [
  {
    id: "ai",
    short: "AI",
    code: "A",
    title: "AI & Automation",
    blurb: "讓機器處理重複的事，把時間留給判斷。",
    items: [
      { id: "agents", short: "Agents", name: "AI Agents", note: "能自主規劃與使用工具的系統", status: "exploring" },
      { id: "workflow", short: "Workflows", name: "Workflow Automation", note: "把流程串成可重複執行的自動化", status: "exploring" },
      { id: "llm", short: "LLM Apps", name: "LLM Applications", note: "以大型語言模型為核心的應用", status: "exploring" },
    ],
  },
  {
    id: "dev",
    short: "DEV",
    code: "B",
    title: "Development",
    blurb: "把想法變成能實際運作的東西。",
    items: [
      { id: "js", short: "JS / TS", name: "JavaScript / TypeScript", note: "Web 世界的共通語言", status: "exploring" },
      { id: "python", short: "Python", name: "Python", note: "腳本、資料與自動化", status: "exploring" },
      { id: "web", short: "Web", name: "Web Development", note: "前端介面到可上線的網站", status: "building" },
    ],
  },
  {
    id: "systems",
    short: "SYS",
    code: "C",
    title: "Systems & Research",
    blurb: "往下一層，理解東西到底怎麼運作。",
    items: [
      { id: "analysis", short: "Analysis", name: "Software Analysis", note: "閱讀並理解既有軟體的行為", status: "exploring" },
      { id: "re", short: "Reverse Eng.", name: "Reverse Engineering", note: "從成品推回原理", status: "exploring" },
      { id: "devtools", short: "Dev Tools", name: "Developer Tools", note: "替自己打造順手的工具", status: "building" },
    ],
  },
  {
    id: "infra",
    short: "INFRA",
    code: "D",
    title: "Infra & Self-Hosting",
    blurb: "自己的服務，自己架、自己顧。",
    items: [
      { id: "docker", short: "Docker", name: "Docker", note: "容器化部署與 Compose 編排", status: "building" },
      { id: "nas", short: "Synology", name: "Synology DSM", note: "在自己的 NAS 上自架服務", status: "building" },
      { id: "tailscale", short: "Tailscale", name: "Tailscale", note: "安全的私有網路與遠端存取", status: "learning" },
    ],
  },
];

export const techStatusMeta: Record<TechStatus, { label: string; zh: string }> = {
  exploring: { label: "Exploring", zh: "探索中" },
  learning: { label: "Learning", zh: "學習中" },
  building: { label: "Building", zh: "實作中" },
  proficient: { label: "Proficient", zh: "熟練" },
};
