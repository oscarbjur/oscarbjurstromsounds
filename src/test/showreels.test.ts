import { describe, expect, it } from "vitest";
import {
  showreels,
  showreelEmbedUrl,
  showreelThumb,
} from "@/data/showreels";

describe("Showreel entries", () => {
  it("keeps at least three reels to browse through", () => {
    expect(showreels.length).toBeGreaterThanOrEqual(3);
  });

  it("gives every reel a title and a valid YouTube id", () => {
    for (const reel of showreels) {
      expect(reel.title.length, reel.videoId).toBeGreaterThan(0);
      expect(reel.videoId, reel.title).toMatch(/^[A-Za-z0-9_-]{11}$/);
    }
  });

  it("points the embed and the preview image at the same video", () => {
    for (const reel of showreels) {
      expect(showreelEmbedUrl(reel.videoId)).toContain(reel.videoId);
      const thumb = showreelThumb(reel.videoId);
      expect(thumb.startsWith("https://img.youtube.com/vi/"), reel.title).toBe(
        true,
      );
      expect(thumb).toContain(reel.videoId);
    }
  });

  it("has no duplicate reels", () => {
    const ids = showreels.map((reel) => reel.videoId);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
