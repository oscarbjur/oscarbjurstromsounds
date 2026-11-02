import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

const selectedSlugs = [
  "4am",
  "evil-moon-unspoken",
  "tiimo",
  "wavell",
  "betano-easter",
  "xellia",
];

describe("Selected works section", () => {
  it("includes all six selected projects", () => {
    const slugs = selectedSlugs.map((slug) =>
      projects.find((project) => project.slug === slug)?.slug,
    );
    expect(slugs).toEqual(selectedSlugs);
  });

  it("gives every selected project a thumbnail", () => {
    for (const slug of selectedSlugs) {
      const project = projects.find((p) => p.slug === slug);
      expect(project, slug).toBeDefined();
      expect(
        project?.imageUrl || project?.videoUrl,
        `${slug} thumbnail`,
      ).toBeDefined();
    }
  });
});
