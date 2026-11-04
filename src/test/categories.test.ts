import { describe, expect, it } from "vitest";
import { categories, projects } from "@/data/projects";

const categoryOf = (slug: string) =>
  projects.find((project) => project.slug === slug)?.category;

describe("Work categories", () => {
  it("lists the four categories in order", () => {
    expect([...categories]).toEqual([
      "Game Audio Implementation & Design",
      "UI/UX Sound Design",
      "Sonic Branding",
      "Audio Post",
    ]);
  });

  it("puts audio logo and identity work under Sonic Branding", () => {
    expect(categoryOf("xellia")).toBe("Sonic Branding");
  });

  it("puts DSB's audio story under Audio Post", () => {
    expect(categoryOf("dsb")).toBe("Audio Post");
  });

  it("puts commercial and film work under Audio Post", () => {
    expect(categoryOf("betano-easter")).toBe("Audio Post");
    expect(categoryOf("svt-familjefighten")).toBe("Audio Post");
  });

  it("no longer uses the retired category names", () => {
    for (const project of projects) {
      expect(
        ["Audio Logos & Identities", "Commercials", "Movies and Shows"],
        `${project.slug} category`,
      ).not.toContain(project.category);
    }
  });
});
