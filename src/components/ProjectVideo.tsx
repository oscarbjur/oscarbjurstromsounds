import type { Project } from "@/data/projects";
import { isYouTubeUrl } from "@/lib/media";

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

interface Props {
  project: Project;
  /** Classes for the framed box around the player. */
  className?: string;
}

const frame =
  "aspect-video w-full overflow-hidden rounded-xl border border-border bg-black";

/**
 * Plays a project's video. YouTube links stay as embeds; Oscar's own files
 * stream from the CDN with the logo as the poster and no download affordance —
 * the save button, picture-in-picture and right-click "Save video as" are all
 * turned off, and nothing is fetched until a visitor presses play.
 */
const ProjectVideo = ({ project, className = "" }: Props) => {
  const url = project.videoUrl;
  if (!url) return null;

  if (isYouTubeUrl(url)) {
    return (
      <div className={`${frame} ${className}`}>
        <iframe
          src={getYouTubeEmbedUrl(url)}
          title={project.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    );
  }

  return (
    <div
      className={`${frame} ${className}`}
      onContextMenu={(event) => event.preventDefault()}
    >
      <video
        src={url}
        poster={project.imageUrl ?? undefined}
        controls
        playsInline
        preload="none"
        controlsList="nodownload noremoteplayback"
        disablePictureInPicture
        disableRemotePlayback
        onContextMenu={(event) => event.preventDefault()}
        className="h-full w-full object-contain"
      />
    </div>
  );
};

export default ProjectVideo;
