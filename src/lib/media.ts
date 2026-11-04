// Media helpers for streamed files.
//
// The site is served from two places: Lovable's host and the GitHub Pages
// deployment at oscarbjurstromsound.com. CDN asset pointers hold a root-relative
// URL, which only resolves on Lovable's host, so every pointer used in project
// data is resolved against Lovable's origin here — that way the same file plays
// from both deployments.
const LOVABLE_ORIGIN = "https://oscarbjurstromsounds.lovable.app";

interface AssetPointer {
  url: string;
}

/** Absolute, streamable URL for a CDN asset pointer. */
export const streamUrl = (asset: AssetPointer): string =>
  asset.url.startsWith("http") ? asset.url : `${LOVABLE_ORIGIN}${asset.url}`;

/** True when the video lives on YouTube and has to be shown as an embed. */
export const isYouTubeUrl = (url: string): boolean =>
  /(?:youtube\.com|youtu\.be)/i.test(url);
