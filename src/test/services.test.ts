import { describe, expect, it } from "vitest";
import { services } from "@/data/services";
import { projects } from "@/data/projects";

const expectedSlugs = [
  "ui-ux-sound-design",
  "game-sound-design",
  "sonic-branding",
  "audio-post-production",
];

describe("Services drawer content", () => {
  it("offers the four services in the drawer", () => {
    expect(services.map((service) => service.slug)).toEqual(expectedSlugs);
  });

  it("gives every service copy to read", () => {
    for (const service of services) {
      expect(service.tab.length, service.slug).toBeGreaterThan(0);
      expect(service.tagline.length, service.slug).toBeGreaterThan(0);
      expect(service.intro.join(" ").length, service.slug).toBeGreaterThan(80);
      expect(service.includes.length, service.slug).toBeGreaterThanOrEqual(3);
    }
  });

  it("links only to projects that exist", () => {
    for (const service of services) {
      for (const slug of service.projectSlugs) {
        expect(
          projects.some((project) => project.slug === slug),
          `${service.slug} -> ${slug}`,
        ).toBe(true);
      }
    }
  });
});
