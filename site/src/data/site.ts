import type { NavItem, SocialLink } from "@/types";

/**
 * Single source of truth for site-wide content.
 * Edit this file to change name, copy, links and SEO.
 */
export const site = {
  name: "Qiyen",
  handle: "QIYEN",
  url: "https://qiyen.me", // ← change to your real domain (used for SEO / sitemap)
  locale: "zh-Hant",
  title: "Qiyen — Building My Own Future.",
  titleTemplate: "%s · Qiyen",
  description:
    "Qiyen（李騏言）的個人網站。持續探索技術、累積能力，並有意識地建構自己的未來。",
  keywords: ["Qiyen", "個人網站", "AI Agent", "自動化", "李騏言", "台北商業大學"],
  city: "Taipei, Taiwan",
  timezone: "Asia/Taipei",
  school: "台北商業大學",
  year: 2026,
} as const;

export const hero = {
  eyebrow: "PERSONAL DIGITAL IDENTITY",
  tagline: "Building my own *future.*",
  zhLines: ["探索技術。", "理解世界。", "累積真正有價值的能力。"],
  intro:
    "台北商業大學一年級。對人工智慧、程式設計與自動化工具充滿好奇，正一步一步建立自己的能力與作品。",
  quote: ["I don't just want to understand the world.", "I want to understand how it works."],
  primaryCta: { label: "Explore My World", href: "#about" },
  secondaryCta: { label: "View My Projects", href: "#projects" },
} as const;

export const nav: NavItem[] = [
  { id: "home", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "projects", label: "PROJECTS" },
  { id: "tech", label: "TECH" },
  { id: "contact", label: "CONTACT" },
];

export const about = {
  paragraphs: [
    "我是李騏言，台北商業大學一年級的學生，我對科技、投資與自我成長抱持著高度興趣。我相信，真正有價值的成長，不只是累積知識，更是培養獨立思考的能力，理解事物運作的原理，並將想法轉化為實際成果。",
    "在科技領域，我持續探索人工智慧、程式設計與自動化工具，希望透過技術突破限制，讓想法不再只是想法，而是能夠真正實現的作品。在投資與理財方面，我關注資產配置、風險管理與長期複利，相信時間與紀律能夠為未來創造更多可能。",
    "我重視理性、效率與持續進步，也習慣反思自己的選擇與不足。我不認為自己已經找到所有答案，但我始終相信，保持好奇、勇於嘗試，並持續修正自己的方向，是讓自己變得更好的重要方式。",
    "對我而言，人生不只是追求某個終點，而是一場持續累積的過程。我希望在未來的日子裡，逐步建立自己的技術能力、思考體系與財務基礎，拓展視野，也保有探索未知的勇氣。",
  ],
  motto: {
    en: "Stay curious. Think independently. Build relentlessly.",
    zh: "保持好奇，獨立思考，持續創造。",
  },
  directions: [
    {
      index: "01",
      title: "Technology",
      zh: "探索人工智慧、程式設計、軟體工具與技術原理。",
      keywords: ["AI Agent", "Automation", "Software Tools", "Reverse Engineering"],
      icon: "cpu",
    },
    {
      index: "02",
      title: "Growth",
      zh: "持續累積知識、建立技能、測試想法，並將學習轉化為實際成果。",
      keywords: ["Learning", "Skills", "Reflection", "Execution"],
      icon: "trend",
    },
  ],
  principles: [
    { en: "Logic", zh: "邏輯思考" },
    { en: "Efficiency", zh: "效率優先" },
    { en: "Judgment", zh: "獨立判斷" },
    { en: "Execution", zh: "實際執行" },
  ],
  now: [
    { label: "Studying", value: "台北商業大學 · 一年級" },
    { label: "Exploring", value: "AI Agent 與自動化工具" },
    { label: "Building", value: "一套自己的線上工具與個人系統" },
    { label: "Reading", value: "投資學 - 長期投入" },
  ],
} as const;

export const contact = {
  heading: "LET'S BUILD SOMETHING *MEANINGFUL.*",
  mantra: ["Always exploring.", "Always building.", "Always becoming."],
} as const;

/** All outbound profile links live here. */
export const socials: SocialLink[] = [
  {
    id: "github",
    label: "GitHub",
    handle: "@Qiyen1229",
    href: "https://github.com/Qiyen1229",
  },
  {
    id: "email",
    label: "Email",
    handle: "giter003@gmail.com",
    href: "mailto:giter003@gmail.com",
  },
  {
    id: "instagram",
    label: "Instagram",
    handle: "@qiyen_1229",
    href: "https://url.qiyen.me/myig",
  },
  {
    id: "threads",
    label: "Threads",
    handle: "@qiyen_1229",
    href: "https://www.threads.com/@qiyen_1229",
  },
];

export const email = socials.find((s) => s.id === "email")!.handle;
