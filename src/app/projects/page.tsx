"use client";

import { motion } from "motion/react";
import Navbar from "../components/home/layout/navbar";
import BackToTop from "../components/home/ui/back-to-top";
import Footer from "../components/home/layout/footer";
import Contribute from "../components/projects/Contribute";
import Experiment from "../components/projects/Experiment";
import { useTranslation } from "../components/language/switch-lang";
import Projects from "../components/projects/Projects";
import Task from "../components/projects/Task";

export default function ProjectsPage() {
  const { t } = useTranslation();

  return (
    <main className="bg-[#0a0a0a] min-h-screen relative">
      <Navbar />

      <div className="pt-32 pb-20 px-6 container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center space-y-4"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            {t("myProjects") || "My Projects"}
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            {t("projectsDesc")}
          </p>
        </motion.div>

        <Projects />

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-12" />
        <Contribute />

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-12" />

        <Task />

        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-800 to-transparent mb-12" />

        <Experiment />
      </div>

      <BackToTop />

      <Footer />
    </main>
  );
}
