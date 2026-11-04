import { useRef } from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ExternalLink, X } from "lucide-react";
import type { Project } from "@/data/projects";
import { getBrandAsset } from "@/data/brandAssets";
import ProjectArtwork from "@/components/ProjectArtwork";
import ProjectVideo from "@/components/ProjectVideo";

interface Props {
  project: Project | null;
  fallbackSrc?: string | null;
  onClose: () => void;
}

const linkClass =
  "btn-puffy inline-flex items-center gap-2 px-5 py-2.5 font-body text-xs tracking-[0.15em] uppercase rounded-xl";

const ProjectModal = ({ project: current, fallbackSrc, onClose }: Props) => {
  // Keep the last project rendered while the pop-up fades out.
  const lastRef = useRef<Project | null>(null);
  if (current) lastRef.current = current;
  const project = current ?? lastRef.current;
  const links = project
    ? [
        { href: project.gameLink, label: "Play the Game" },
        { href: project.steamLink, label: "View on Steam" },
        { href: project.websiteLink, label: "Visit Website" },
        { href: project.episodeLink, label: "Watch Episode" },
      ].filter((l): l is { href: string; label: string } => Boolean(l.href))
    : [];
  const image = project?.imageUrl ?? fallbackSrc ?? null;

  return (
    <DialogPrimitive.Root open={Boolean(current)} onOpenChange={(open) => !open && onClose()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="project-modal-overlay fixed inset-0 z-50 bg-background/60 backdrop-blur-md" />
        <DialogPrimitive.Content
          className="project-modal fixed inset-x-0 bottom-0 z-50 max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-3xl border border-border bg-card shadow-2xl focus:outline-none sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-[min(92vw,56rem)] sm:max-h-[88dvh] sm:rounded-3xl"
          aria-describedby={undefined}
        >
          {project && (
            <>
              <div className="sticky top-0 z-10 flex justify-end bg-gradient-to-b from-card via-card/90 to-transparent p-3 sm:p-4">
                <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-border sm:hidden" />
                <DialogPrimitive.Close
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </DialogPrimitive.Close>
              </div>

              <div className="px-5 pb-8 sm:px-10 sm:pb-10">
                {project.videoUrl ? (
                  <ProjectVideo project={project} className="mb-8" />
                ) : image ? (
                  <div className="mx-auto mb-8 w-full max-w-2xl">
                    {getBrandAsset(project.slug)?.kind === "logo" ? (
                      <div className="aspect-[16/10] w-full overflow-hidden rounded-xl border border-border">
                        <ProjectArtwork slug={project.slug} alt={project.title} className="h-full w-full" />
                      </div>
                    ) : (
                      <ProjectArtwork
                        slug={project.slug}
                        alt={project.title}
                        fallbackSrc={image}
                        fit="natural"
                        className="rounded-xl border border-border"
                      />
                    )}
                  </div>
                ) : null}

                <p className="mb-3 font-body text-xs uppercase tracking-[0.3em] text-primary">
                  {project.category}
                </p>
                <DialogPrimitive.Title className="mb-5 font-display text-2xl text-foreground sm:text-4xl">
                  {project.title}
                </DialogPrimitive.Title>
                <p className="mb-7 font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
                  {project.description}
                </p>

                <div className="mb-7 flex flex-wrap gap-2">
                  <span className="border border-border px-3 py-1.5 font-body text-xs tracking-wide text-foreground">
                    {project.role}
                  </span>
                  <span className="border border-primary/30 px-3 py-1.5 font-body text-xs uppercase tracking-[0.15em] text-primary">
                    {project.type}
                  </span>
                  <span className="border border-border px-3 py-1.5 font-body text-xs text-muted-foreground">
                    {project.year}
                  </span>
                </div>

                {links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {links.map((l) => (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                        <ExternalLink className="h-4 w-4" />
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default ProjectModal;
