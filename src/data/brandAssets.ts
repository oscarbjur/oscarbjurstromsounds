// Genuine brand artwork and official brand marks for the projects Oscar worked on
// for other companies. Brand marks are always the company's own files, shown
// unmodified and never cropped, stretched, recoloured or redrawn.
const img = (fileName: string) => `${import.meta.env.BASE_URL}images/${fileName}`;

export type BrandAsset =
  | { kind: "artwork"; src: string }
  | { kind: "logo"; src: string };

export const brandAssets: Record<string, BrandAsset> = {
  // Official key art from the game's Steam page.
  "4am": { kind: "artwork", src: img("4am.jpg") },
  // Official capsule artwork from the game's Steam page.
  "evil-moon-unspoken": { kind: "artwork", src: img("evil-moon-capsule.jpg") },
  // Official app icon published by tiimo ApS.
  tiimo: { kind: "logo", src: img("tiimo-icon.png") },
  // Official wordmark published by Wavell.
  wavell: { kind: "logo", src: img("wavell-wordmark.png") },
  // Official wordmark published by Betano.
  "betano-easter": { kind: "logo", src: img("betano-wordmark.svg") },
  // Official hexagon mark published by DSB.
  dsb: { kind: "logo", src: img("dsb-logo-official.png") },
  // Official wordmark published by Xellia Pharmaceuticals.
  xellia: { kind: "logo", src: img("xellia-wordmark.png") },
  // Official mark and wordmark published by Dividandy.
  dividandy: { kind: "logo", src: img("dividandy-logo-official.webp") },
};

export const getBrandAsset = (slug: string): BrandAsset | undefined => brandAssets[slug];
