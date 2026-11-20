import { describe, expect, it } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import { projects } from "@/data/projects";
import ProjectAudio from "@/components/ProjectAudio";

const betano = () => projects.find((project) => project.slug === "betano-easter");

describe("Betano Easter radio ad", () => {
  it("streams the ad from the media library as a 20 second clip", () => {
    const url = betano()?.audioUrl ?? "";
    expect(url).toMatch(
      /^https:\/\/oscarbjurstromsounds\.lovable\.app\/__l5e\/assets-v1\/[0-9a-f-]+\/betano-easter-radio-ad\.wav$/,
    );
    expect(betano()?.audioDuration).toBe(20);
  });

  it("shows a play button and the length before anything is fetched", () => {
    render(<ProjectAudio project={betano()!} />);
    const audio = document.querySelector("audio");
    expect(audio, "no audio element rendered").not.toBeNull();
    expect(audio?.getAttribute("preload")).toBe("none");
    expect(audio?.hasAttribute("controls")).toBe(false);
    expect(audio?.getAttribute("controlslist")).toContain("nodownload");
    expect(document.querySelector('button[aria-label="Play the audio"]')).not.toBeNull();
    expect(document.body.textContent).toContain("0:00 / 0:20");
  });

  it("refuses the right-click save menu on both the player and the audio file", () => {
    render(<ProjectAudio project={betano()!} />);
    const audio = document.querySelector("audio")!;
    const card = audio.closest("div")!;
    for (const node of [card, audio]) {
      const event = new MouseEvent("contextmenu", { bubbles: true, cancelable: true });
      node.dispatchEvent(event);
      expect(event.defaultPrevented).toBe(true);
    }
  });

  it("lets a visitor click the waveform to jump to a moment in the ad", () => {
    render(<ProjectAudio project={betano()!} />);
    const track = document.querySelector('[role="slider"]')!;
    // jsdom reports a zero-sized box, so give the track one before clicking.
    track.getBoundingClientRect = () =>
      ({ left: 0, right: 200, top: 0, bottom: 40, width: 200, height: 40, x: 0, y: 0, toJSON: () => ({}) }) as DOMRect;
    fireEvent(track, new MouseEvent("pointerdown", { clientX: 150, bubbles: true, cancelable: true }));
    expect(track.getAttribute("aria-valuenow")).toBe("15");
    expect(document.body.textContent).toContain("0:15 / 0:20");
  });

  it("renders nothing for a case with no audio", () => {
    const { container } = render(<ProjectAudio project={projects.find((p) => p.slug === "xellia")!} />);
    expect(container.firstChild).toBeNull();
  });
});
