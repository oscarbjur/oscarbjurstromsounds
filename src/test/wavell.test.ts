import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

describe("Wavell portfolio entry", () => {
  it("appears under UI/UX Sound Design", () => {
    expect(projects.find((project) => project.slug === "wavell")?.category).toBe("UI/UX Sound Design");
  });

  it("links to the supplied case and listening examples", () => {
    expect(projects.find((project) => project.slug === "wavell")?.websiteLink).toBe("https://sonicmindsagency.com/work/wavell/");
  });

  it("shows Wavell's own wordmark, served from the site itself", () => {
    const project = projects.find((entry) => entry.slug === "wavell");
    expect(project?.imageUrl).toMatch(/^\/images\/wavell-wordmark\.png$/);
  });
});