"use client";

import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export interface ProjectData {
  id: number;
  title: string;
  images: string[];
  techStack: { name: string; src: string }[];
  description: string;
  link: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: ProjectData | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!isOpen || !project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        setCurrentImageIndex((prev) =>
          prev === 0 ? project.images.length - 1 : prev - 1
        );
      } else if (e.key === "ArrowRight") {
        setCurrentImageIndex((prev) =>
          prev === project.images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, project]);

  if (!project) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] w-full max-w-5xl rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative flex flex-col max-h-[90vh]"
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full backdrop-blur-md transition-all cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative h-64 md:h-96 w-full bg-black/50 group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative w-full h-full"
                  >
                    <Image
                      src={project.images[currentImageIndex]}
                      alt={`${project.title} screenshot ${
                        currentImageIndex + 1
                      }`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                {project.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#61dca3] text-white hover:text-black rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-[#61dca3] text-white hover:text-black rounded-full transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {project.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            idx === currentImageIndex
                              ? "bg-[#61dca3]"
                              : "bg-white/50"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8 overflow-y-auto">
                <div className="flex-1 space-y-6">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">
                      {project.title}
                    </h2>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[#61dca3] hover:underline font-mono text-sm"
                    >
                      Visit Website <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="space-y-4">
                    <p className="text-gray-400 leading-relaxed text-lg">
                      {project.description}
                    </p>
                  </div>
                </div>

                <div className="w-full md:w-1/3 space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-800 pb-2">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-4">
                    {project.techStack.map((tech) => (
                      <div
                        key={tech.name}
                        className="flex items-center gap-2 bg-[#0a0a0a] border border-gray-800 px-3 py-2 rounded-lg"
                        title={tech.name}
                      >
                        <div className="relative w-6 h-6">
                          <Image
                            src={tech.src}
                            alt={tech.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-sm text-gray-300 font-mono">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
