export type Showreel = {
  title: string;
  videoId: string;
};

export const showreels: Showreel[] = [
  { title: "AAA Showreel", videoId: "svi802Kilek" },
  { title: "Indie Showreel", videoId: "qTXknLtPP94" },
];

export const showreelEmbedUrl = (videoId: string) =>
  `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;

export const showreelThumb = (videoId: string) =>
  `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
