import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

const evilMoon = () => projects.find((project) => project.slug === "evil-moon-unspoken");

describe("Evil Moon: Unspoken portfolio entry", () => {
  it("embeds the Demo trailer Oscar mixed", () => {
    expect(evilMoon()?.videoUrl).toBe("https://www.youtube.com/watch?v=BFgBI9dHu8I");
  });

  it("credits the Demo trailer sound effects and mix", () => {
    const description = evilMoon()?.description ?? "";
    expect(description).toMatch(/sound effects/i);
    expect(description).toMatch(/mixed/i);
    expect(description).toMatch(/Demo trailer/i);
  });

  it("is a direct Neckbolt collaboration, not a Sonic Minds case", () => {
    const project = evilMoon();
    expect(project?.description).toMatch(/Neckbolt/);
    expect(project?.description).not.toMatch(/Sonic Minds/i);
    expect(project?.websiteLink).toBeUndefined();
  });
});
