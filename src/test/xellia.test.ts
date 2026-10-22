import { describe, expect, it } from "vitest";
import { projects } from "@/data/projects";

const xellia = () => projects.find((project) => project.slug === "xellia");

describe("Xellia portfolio entry", () => {
  it("appears under Audio Logos & Identities", () => {
    expect(xellia()?.category).toBe("Audio Logos & Identities");
  });

  it("credits only the audio logo", () => {
    expect(xellia()?.role).toBe("Composer & Sound Designer - Audio Logo");
    expect(xellia()?.description).not.toMatch(/identity|sonic identity|audio story/i);
  });

  it("describes bubbles, classical instruments and the fermentation link", () => {
    const description = xellia()?.description ?? "";
    expect(description).toMatch(/bubbles/i);
    expect(description).toMatch(/classical instruments/i);
    expect(description).toMatch(/fermentation/i);
  });

  it("shows the brand logo card served from the site itself", () => {
    expect(xellia()?.imageUrl).toMatch(/images\/xellia-logo\.webp$/);
  });
});
