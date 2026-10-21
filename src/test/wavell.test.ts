import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

describe("Wavell portfolio entry", () => {
  it("appears under UI/UX Sound Design", () => {
    expect(projects.find((project) => project.slug === "wavell")?.category).toBe("UI/UX Sound Design");
  });

  it("links to the supplied case and listening examples", () => {
    expect(projects.find((project) => project.slug === "wavell")?.websiteLink).toBe("https://sonicmindsagency.com/work/wavell/");
  });

  it("uses a hosted image that also resolves outside Lovable", () => {
    const project = projects.find((entry) => entry.slug === "wavell");
    expect(project?.imageUrl).toMatch(/^https:\/\/oscarbjurstromsounds\.lovable\.app\/__l5e\/assets-v1\//);
  });
});