import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import AboutSection from "@/components/AboutSection";

describe("About portrait", () => {
  it("shows Oscar's own portrait, streamed from the media library by absolute URL", () => {
    render(<AboutSection />);
    const img = document.querySelector("#about img");
    expect(img, "no About portrait rendered").not.toBeNull();
    // Absolute, so the same picture loads from the GitHub Pages deployment too.
    expect(img?.getAttribute("src")).toMatch(
      /^https:\/\/oscarbjurstromsounds\.lovable\.app\/__l5e\/assets-v1\/[0-9a-f-]+\/website-portrait\.jpg$/,
    );
    expect(img?.getAttribute("alt")).toBe("Oscar Bjurström");
  });
});
