import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { projects } from "@/data/projects";
import ProjectVideo from "@/components/ProjectVideo";

const xellia = () => projects.find((project) => project.slug === "xellia");

const renderFilm = () => {
  render(<ProjectVideo project={xellia()!} />);
  return document.querySelector("video");
};

describe("Xellia audio logo film", () => {
  it("streams Oscar's own clip from the media library instead of a YouTube embed", () => {
    const url = xellia()?.videoUrl ?? "";
    expect(url).toMatch(
      /^https:\/\/oscarbjurstromsounds\.lovable\.app\/__l5e\/assets-v1\/[0-9a-f-]+\/xellia-audio-logo\.mp4$/,
    );
  });

  it("shows the Xellia logo as the picture before anyone presses play", () => {
    const video = renderFilm();
    expect(video, "no video player rendered").not.toBeNull();
    expect(document.querySelector("iframe")).toBeNull();
    expect(video?.getAttribute("poster")).toMatch(/xellia-wordmark\.png$/);
    expect(video?.getAttribute("preload")).toBe("none");
  });

  it("gives the public no download button, no picture-in-picture and no right-click save", () => {
    const video = renderFilm();
    expect(video?.getAttribute("controlslist")).toContain("nodownload");
    expect(video?.hasAttribute("disablepictureinpicture")).toBe(true);
    expect(video?.hasAttribute("disableremoteplayback")).toBe(true);
  });

  it("keeps every other case's YouTube video playing as an embed", () => {
    render(<ProjectVideo project={projects.find((p) => p.slug === "evil-moon-unspoken")!} />);
    expect(document.querySelector("iframe")?.getAttribute("src")).toBe(
      "https://www.youtube.com/embed/BFgBI9dHu8I",
    );
    expect(document.querySelector("video")).toBeNull();
  });
});
