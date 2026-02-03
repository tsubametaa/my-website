"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { ExternalLink, Maximize2 } from "lucide-react";
import { useTranslation } from "../language/switch-lang";
import { useProjects } from "../../hooks/useProjects";
import { useState } from "react";
import ProjectModal, { ProjectData } from "../home/ux/project/modals";

const Task = () => {
  const { tasks } = useProjects();
  const { t } = useTranslation();
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(
    null,
  );

  return (
    <section className="w-full py-16 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6"
        >
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
              {t("collegeTasks")}
            </h2>
            <div className="h-1 w-20 bg-[#f59e0b] rounded-full"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("collegeTasksDesc")}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#111] rounded-2xl overflow-hidden border border-gray-800 hover:border-[#f59e0b]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#f59e0b]/10 flex flex-col"
            >
              <div className="relative h-60 w-full overflow-hidden">
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
                    className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-[#f59e0b] hover:text-black hover:border-[#f59e0b] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 cursor-pointer"
                    title={t("viewDetails")}
                  >
                    <Maximize2 className="w-5 h-5" />
                  </button>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-white/10 border border-white/20 rounded-full text-white hover:bg-[#f59e0b] hover:text-black hover:border-[#f59e0b] transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 cursor-pointer"
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

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f59e0b] transition-colors font-mono tracking-tight mt-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-2 text-xs font-mono text-[#f59e0b] opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-[-10px] group-hover:translate-x-0">
                  <span>{t("viewProject")}</span>
                  <div className="h-[1px] w-8 bg-[#f59e0b]" />
                </div>
              </div>
            </motion.div>
          ))}
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

export default Task;
