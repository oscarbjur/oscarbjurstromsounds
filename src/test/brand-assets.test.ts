import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { brandAssets } from "@/data/brandAssets";
import { projects } from "@/data/projects";

const partnerSlugs = [
  "4am",
  "evil-moon-unspoken",
  "tiimo",
  "wavell",
  "betano-easter",
  "dsb",
  "xellia",
  "dividandy",
];

describe("Partner brand artwork", () => {
  it("uses each company's own official file, never a redrawn or reframed one", () => {
    const officialFiles: Record<string, string> = {
      "4am": "/images/4am.jpg",
      "evil-moon-unspoken": "/images/evil-moon-capsule.jpg",
      tiimo: "/images/tiimo-icon.png",
      wavell: "/images/wavell-wordmark.png",
      "betano-easter": "/images/betano-wordmark.svg",
      dsb: "/images/dsb-logo-official.png",
      xellia: "/images/xellia-wordmark.png",
      dividandy: "/images/dividandy-logo-official.webp",
    };
    for (const slug of partnerSlugs) {
      expect(brandAssets[slug]?.src, slug).toBe(officialFiles[slug]);
    }
  });

  it("keeps every partner brand file in the site's own image folder", () => {
    for (const slug of partnerSlugs) {
      const src = brandAssets[slug]?.src ?? "";
      const onDisk = existsSync(resolve("public", src.replace(/^\//, "")));
      expect(onDisk, `${slug}: ${src}`).toBe(true);
    }
  });

  it("never points a partner project at a derived tile or reframed selection", () => {
    for (const slug of partnerSlugs) {
      const project = projects.find((entry) => entry.slug === slug);
      expect(project?.imageUrl ?? "", slug).not.toMatch(/(-tile|-selected|logo\.webp)/);
    }
  });
});
