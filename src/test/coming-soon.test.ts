import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

describe("Coming soon cases", () => {
  it("marks Xellia as coming soon", () => {
    const xellia = projects.find((project) => project.slug === "xellia");
    expect(xellia?.comingSoon).toBe(true);
  });

  it("teases an unannounced UI/UX sound design project", () => {
    const teaser = projects.find(
      (project) => project.comingSoon && project.category === "UI/UX Sound Design",
    );
    expect(teaser?.slug).toBe("unannounced-ui");
    expect(teaser?.title).toBe("UNANNOUNCED PROJECT");
  });

  it("teases an unannounced game audio project", () => {
    const teaser = projects.find(
      (project) =>
        project.comingSoon && project.category === "Game Audio Implementation & Design",
    );
    expect(teaser?.slug).toBe("unannounced-game");
    expect(teaser?.title).toBe("UNANNOUNCED PROJECT");
  });

  it("gives every coming soon project a still thumbnail and no playable video", () => {
    for (const project of projects.filter((p) => p.comingSoon)) {
      expect(project.imageUrl, project.slug).toBeDefined();
      expect(project.videoUrl, project.slug).toBeUndefined();
    }
  });

  it("never shows a coming soon project's real brand artwork", () => {
    for (const project of projects.filter((p) => p.comingSoon)) {
      const asset = getBrandAsset(project.slug);
      if (!asset) continue;
      expect(project.teaserImage, project.slug).toBeDefined();
      expect(project.teaserImage, project.slug).not.toBe(asset.src);
    }
  });

  it("keeps Xellia's name off the teaser tiles", () => {
    const xellia = projects.find((project) => project.slug === "xellia");
    expect(xellia?.comingSoon).toBe(true);
    expect(xellia?.teaserImage).toContain("teaser-brand.jpg");
  });
});
