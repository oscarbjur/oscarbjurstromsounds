import { getBrandAsset } from "@/data/brandAssets";

interface ProjectArtworkProps {
  slug: string;
  alt: string;
  /** Used when no official brand asset exists for this project. */
  fallbackSrc?: string | null;
  /** Classes for the artwork box itself. */
  className?: string;
  /** "cover" fills the box, "natural" keeps the file's own proportions. */
  fit?: "cover" | "natural";
}

/**
 * Shows a project's artwork. Partner brands are always shown with their own
 * official mark, contained intact instead of being reframed or redrawn.
 */
const ProjectArtwork = ({
  slug,
  alt,
  fallbackSrc,
  className = "w-full h-full",
  fit = "cover",
}: ProjectArtworkProps) => {
  const asset = getBrandAsset(slug);

  if (asset?.kind === "logo") {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden ${className}`}
        style={{ background: asset.surface ?? "hsl(var(--secondary))" }}
      >
        <img
          src={asset.src}
          alt={`${alt} logo`}
          loading="lazy"
          className="h-full w-full object-contain p-[14%]"
        />
      </div>
    );
  }

  const src = asset?.src ?? fallbackSrc ?? null;
  if (!src) {
    return (
      <div className={`bg-secondary flex items-center justify-center ${className}`}>
        <span className="text-muted-foreground font-body text-sm">{alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={fit === "cover" ? `h-full w-full object-cover ${className}` : `h-auto max-w-full ${className}`}
    />
  );
};

export default ProjectArtwork;
