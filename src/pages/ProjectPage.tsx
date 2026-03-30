import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Navbar from "@/components/Navbar";
import { motion } from "framer-motion";
import myEpicNightmareImg from "@/assets/my-epic-nightmare.png";
import bubbleBurstImg from "@/assets/bubble-burst.png";

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
};

const imageMap: Record<string, string> = {
  "/src/assets/my-epic-nightmare.png": myEpicNightmareImg,
  "/src/assets/bubble-burst.png": bubbleBurstImg,
};

const ProjectPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Project not found</h1>
          <Link to="/#portfolio" className="btn-puffy inline-block px-6 py-3 font-body text-sm">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const resolvedImage = project.imageUrl ? imageMap[project.imageUrl] || project.imageUrl : null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-6 pt-28 pb-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/#portfolio"
            className="btn-puffy inline-flex items-center gap-2 px-5 py-2.5 font-body text-xs tracking-[0.15em] uppercase rounded-xl mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>

          {project.videoUrl && (
            <div className="aspect-video w-full max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden border border-border">
              <iframe
                src={getYouTubeEmbedUrl(project.videoUrl)}
                title={project.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          )}

          {!project.videoUrl && resolvedImage && (
            <div className="w-full max-w-4xl mx-auto mb-12 rounded-lg overflow-hidden border border-border">
              <img src={resolvedImage} alt={project.title} className="w-full h-auto" />
            </div>
          )}

          <div className="max-w-4xl mx-auto">
            <p className="text-primary font-body text-sm tracking-[0.3em] uppercase mb-3">
              {project.category}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-foreground mb-6">
              {project.title}
            </h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <span className="text-foreground font-body text-xs tracking-wide border border-border px-4 py-2">
                {project.role}
              </span>
              <span className="text-primary font-body text-xs tracking-[0.15em] uppercase border border-primary/30 px-4 py-2">
                {project.type}
              </span>
              <span className="text-muted-foreground font-body text-sm border border-border px-4 py-2">
                {project.year}
              </span>
            </div>

            {project.gameLink && (
              <a
                href={project.gameLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-puffy inline-flex items-center gap-2 px-6 py-3 font-body text-xs tracking-[0.15em] uppercase rounded-xl"
              >
                <ExternalLink className="w-4 h-4" />
                Play the Game
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPage;
