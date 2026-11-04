import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { services } from "@/data/services";
import { projects } from "@/data/projects";
import { serviceIcons } from "@/components/serviceIcons";
import { useServicesDrawer } from "@/components/ServicesDrawerProvider";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const ServicesDrawer = () => {
  const { open, activeSlug, setActiveSlug, setOpen } = useServicesDrawer();
  const navigate = useNavigate();
  const location = useLocation();
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const activeIndex = Math.max(
    0,
    services.findIndex((service) => service.slug === activeSlug),
  );
  const active = services[activeIndex];

  const focusTab = (index: number) => {
    const next = services[(index + services.length) % services.length];
    setActiveSlug(next.slug);
    tabRefs.current[next.slug]?.focus();
  };

  const onTabListKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        event.preventDefault();
        focusTab(activeIndex + 1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        event.preventDefault();
        focusTab(activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(services.length - 1);
        break;
      default:
        break;
    }
  };

  const goToContact = () => {
    setOpen(false);
    // Ask the contact heading to fade softly once it is on screen,
    // so people see their click brought them here.
    window.dispatchEvent(new CustomEvent("obs:contact-pulse"));
    const scroll = () =>
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  const relatedWork = active.projectSlugs
    .map((slug) => projects.find((project) => project.slug === slug))
    .filter((project): project is (typeof projects)[number] => Boolean(project));

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-3xl p-0 gap-0 flex flex-col overflow-hidden bg-background"
      >
        <SheetHeader className="px-6 sm:px-10 pt-10 pb-6 text-left border-b border-border sm:pr-20">
          <SheetTitle className="font-display text-2xl md:text-3xl text-foreground">
            SERVICES
          </SheetTitle>
          <SheetDescription className="text-muted-foreground font-body text-sm">
            Choose a service to read what it covers and how the work is delivered.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 min-h-0 flex flex-col md:flex-row">
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Services"
            onKeyDown={onTabListKeyDown}
            className="shrink-0 md:w-72 lg:w-80 border-b md:border-b-0 md:border-r border-border p-3 md:p-4 flex flex-col gap-1"
          >
            {services.map((service, index) => {
              const Icon = serviceIcons[service.icon];
              const isActive = service.slug === active.slug;
              return (
                <button
                  key={service.slug}
                  ref={(node) => {
                    tabRefs.current[service.slug] = node;
                  }}
                  role="tab"
                  id={`service-tab-${service.slug}`}
                  aria-selected={isActive}
                  aria-controls="service-panel"
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveSlug(service.slug)}
                  className={`flex items-center gap-3 text-left px-3 py-2.5 md:py-3 border-l-2 transition-colors cursor-pointer bg-transparent ${
                    isActive
                      ? "border-primary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="font-body text-[10px] tabular-nums tracking-[0.2em] text-primary">
                    0{index + 1}
                  </span>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="font-body text-xs tracking-[0.14em] uppercase">
                    {service.tab}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`service-tab-${active.slug}`}
            tabIndex={-1}
            className="flex-1 min-h-0 overflow-y-auto px-6 sm:px-10 py-8 focus:outline-none"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-display text-xl md:text-2xl text-foreground mb-3">
                  {active.title}
                </p>
                <p className="text-primary font-body text-sm leading-relaxed mb-6">
                  {active.tagline}
                </p>

                <div className="space-y-4 text-muted-foreground font-body leading-relaxed mb-10">
                  {active.intro.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>

                <h4 className="font-body text-xs tracking-[0.24em] uppercase text-foreground mb-4">
                  What's included
                </h4>
                <ul className="space-y-3 mb-10">
                  {active.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-muted-foreground font-body text-sm leading-relaxed"
                    >
                      <Check className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {relatedWork.length > 0 && (
                  <>
                    <h4 className="font-body text-xs tracking-[0.24em] uppercase text-foreground mb-4">
                      Selected work
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {relatedWork.map((project) => (
                        <Link
                          key={project.slug}
                          to={`/project/${project.slug}`}
                          onClick={() => setOpen(false)}
                          className="inline-flex items-center gap-2 border border-border px-4 py-2 font-body text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-foreground hover:border-primary/60 transition-colors"
                        >
                          {project.title}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="shrink-0 border-t border-border px-6 sm:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Based in Malmö, Sweden
          </p>
          <button className="btn-puffy" onClick={goToContact}>
            Start a project
          </button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ServicesDrawer;
