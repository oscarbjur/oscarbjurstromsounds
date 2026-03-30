import { useParams, Link } from "react-router-dom";
import { projects } from "@/data/projects";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const getYouTubeEmbedUrl = (url: string) => {
  const match = url.match(/(?:v=|\/embed\/|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
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

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-12">
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

            <div className="flex flex-wrap gap-3">
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
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectPage;
