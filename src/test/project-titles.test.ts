import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

const typeOf = (slug: string) => projects.find((p) => p.slug === slug)?.type ?? "";

describe("Project titles", () => {
  it("read as what the client does, then what Oscar worked on", () => {
    for (const project of projects) {
      const parts = project.type.split(" - ");
      expect(parts.length, project.slug).toBe(2);
      expect(parts[0].trim().length, project.slug).toBeGreaterThan(0);
      expect(parts[1].trim().length, project.slug).toBeGreaterThan(0);
      expect(parts[0].trim().toLowerCase(), project.slug).not.toBe(parts[1].trim().toLowerCase());
    }
  });

  it("keeps the work Oscar actually did on each project", () => {
    expect(typeOf("dsb")).toContain("AUDIO STORY");
    expect(typeOf("dsb")).not.toMatch(/AUDIO LOGO|IDENTITY/);
    expect(typeOf("wavell")).toContain("UI SOUND DESIGN");
    expect(typeOf("wavell")).not.toContain("IDENTITY");
    expect(typeOf("dividandy")).toContain("UX SOUND DESIGN");
    expect(typeOf("xellia")).toContain("AUDIO LOGO");
    expect(typeOf("tiimo")).toContain("PLANNING APP");
    expect(typeOf("betano-easter")).toContain("SPORTS BETTING");
    expect(typeOf("evil-moon-unspoken")).toBe("INDIE GAME - SOUND DESIGN AND AUDIO DIRECTION");
  });
});
