"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Maximize2,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import ProjectModal, { ProjectData } from "./ux/project/modals";
import { useTranslation } from "../language/switch-lang";
import { useProjects } from "../../hooks/useProjects";

const ProjectSection = () => {
  const { t } = useTranslation();
  const { projects } = useProjects();

  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevSlide();
      } else if (e.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  const getVisibleProjects = () => {
    const visible: ProjectData[] = [];
    for (let i = 0; i < 3; i++) {
      if (projects.length > 0) {
        visible.push(projects[(currentIndex + i) % projects.length]);
      }
    }
    return visible;
  };

  return (
    <section className="w-full bg-[#0a0a0a] py-20 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent pointer-events-none z-10" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t("featuredWork")}
            </h2>
            <div className="h-1 w-20 bg-[#61dca3] rounded-full"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("projectDesc")}
            </p>
          </div>

          <div className="hidden lg:flex gap-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full border border-gray-800 bg-[#111] text-white hover:border-[#61dca3] hover:text-[#61dca3] transition-all active:scale-95 group cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-1" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full border border-gray-800 bg-[#111] text-white hover:border-[#61dca3] hover:text-[#61dca3] transition-all active:scale-95 group cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>

        <div className="hidden lg:grid grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" initial={false} custom={direction}>
            {getVisibleProjects().map((project, idx) => (
              <motion.div
                key={`${project.id}-${currentIndex + idx}`} // Unique key for animation stability
                layout
                initial={{ opacity: 0, x: direction * 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -100 }}
                transition={{
                  x: { type: "spring", stiffness: 200, damping: 25 },
                  opacity: { duration: 0.2 },
                }}
                className="group relative bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#61dca3]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#61dca3]/10 h-full flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-80" />

                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-[2px]">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-[#61dca3] hover:text-black hover:border-[#61dca3] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer"
                      title={t("viewDetails")}
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-[#61dca3] hover:text-black hover:border-[#61dca3] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 cursor-pointer"
                      title={t("visitSite")}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow relative">
                  <div className="absolute -top-6 right-4 flex gap-1">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <div
                        key={i}
                        className="bg-[#111] p-1.5 rounded-lg border border-gray-800 shadow-lg"
                        title={tech.name}
                      >
                        <Image
                          src={tech.src}
                          alt={tech.name}
                          width={18}
                          height={18}
                          className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity"
                        />
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#61dca3] transition-colors font-mono tracking-tight mt-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#61dca3] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                    <span>{t("viewProject")}</span>
                    <div className="h-[1px] w-8 bg-[#61dca3]" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="lg:hidden flex overflow-x-auto gap-6 pb-12 snap-x snap-mandatory scroll-smooth [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="min-w-[85%] md:min-w-[48%] snap-center group relative bg-[#111] rounded-2xl overflow-hidden border border-gray-800 transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 to-transparent" />

                <button
                  onClick={() => setSelectedProject(project)}
                  className="absolute inset-0 w-full h-full flex items-center justify-center group-active:bg-black/20 transition-colors"
                >
                  <Maximize2 className="w-8 h-8 text-white/40 group-active:text-[#61dca3] group-active:scale-110 transition-all" />
                </button>

                {/* Tech Stack Overlay (Mobile) */}
                <div className="absolute top-4 right-4 flex gap-1">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <div
                      key={i}
                      className="bg-[#111]/80 backdrop-blur-sm p-1.5 rounded-lg border border-gray-800"
                    >
                      <Image
                        src={tech.src}
                        alt={tech.name}
                        width={14}
                        height={14}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 font-mono group-active:text-[#61dca3] transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-[#61dca3] text-sm font-mono font-bold flex items-center gap-2"
                  >
                    <span>{t("viewDetails") || "View Details"}</span>
                    <div className="h-[1px] w-6 bg-[#61dca3]/50" />
                  </button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-gray-500 hover:text-[#61dca3] transition-colors"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12 relative z-10">
          <Link href="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#61dca3] text-black font-bold rounded-full hover:bg-[#4bc28d] transition-all shadow-[0_0_20px_rgba(97,220,163,0.3)] hover:shadow-[0_0_30px_rgba(97,220,163,0.5)] flex items-center gap-2 text-sm uppercase tracking-wider cursor-pointer"
            >
              {t("viewAllProjects")}
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </Link>
        </div>
      </div>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        project={selectedProject}
      />
    </section>
  );
};

export default ProjectSection;
