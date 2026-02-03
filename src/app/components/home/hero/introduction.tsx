"use client";

import React, { useState, useEffect, useMemo } from "react";
import { motion } from "motion/react";
import LetterGlitch from "../design/LetterGlitch";
import DecryptedText from "../design/DecryptedText";
import { useTranslation } from "../../language/switch-lang";
import { MoveRight } from "lucide-react";
import Card from "../design/Card";

const Introduction = () => {
  const { t } = useTranslation();
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = useMemo(() => [t("role1"), t("role2")], [t]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [roles]);

  return (
    <div className="relative w-full min-h-screen lg:h-screen overflow-hidden bg-[#0a0a0a] text-white font-sans">
      <div className="absolute inset-0 z-0 opacity-25">
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={true}
          smooth={true}
          characters="UTAKOTOBUKI!@<SCRIPT/>#$%^&*()-_+=/[]{};:<>.,0123456789"
        />
      </div>

      <div className="relative z-10 w-full h-full px-6 flex items-center justify-center pt-28 lg:pt-0">
        <div className="container mx-auto max-w-6xl w-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl w-full"
          >
            <div className="inline-flex items-center space-x-2 bg-[#61dca3]/10 px-4 py-2 rounded-full border border-[#61dca3]/20 backdrop-blur-md">
              <span className="relative flex h-3 w-3">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#61dca3]"></span>
              </span>
              <span className="text-sm text-[#61dca3] font-mono tracking-wider">
                {t("availableForHire")}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-tight">
              Alvin{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#61dca3] to-[#61b3dc]">
                Putra
              </span>
            </h1>

            <div className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light flex items-center gap-2 h-10">
              <span>{t("iAm")}</span>
              <span className="text-[#61dca3]">
                <DecryptedText
                  key={roles[roleIndex]}
                  text={roles[roleIndex]}
                  speed={100}
                  maxIterations={20}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*_"
                  className="font-bold text-[#61dca3]"
                  encryptedClassName="text-gray-500"
                  sequential={true}
                  animateOn="view"
                />
              </span>
            </div>

            <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
              {t("introText")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
              <a
                href="#contact"
                className="px-8 py-4 bg-[#61dca3] text-black font-bold rounded-full hover:bg-[#4fd192] transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(97,220,163,0.3)]"
              >
                {t("contactMe")}
              </a>
              <a
                href="#projects"
                className="px-8 py-4 bg-transparent border border-gray-700 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center gap-2 group"
              >
                {t("viewProjects")}
                <span className="group-hover:translate-x-1 transition-transform">
                  <MoveRight size={16} />
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex items-center justify-center w-full lg:w-auto relative order-first lg:order-last mb-8 lg:mb-0"
          >
            <div className="relative w-full max-w-[320px] aspect-[2/3] md:w-[320px] md:h-[480px]">
              <Card />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
