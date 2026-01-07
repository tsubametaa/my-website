"use client";

import React, { useState, useEffect } from "react";
import LetterGlitch from "../design/LetterGlitch";
import { useTranslation } from "../../language/switch-lang";

const Typewriter = ({
  words,
  typingSpeed = 150,
  deletingSpeed = 100,
  pauseTime = 2000,
}: {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseTime?: number;
}) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [blink, setBlink] = useState(true);
  const [reverse, setReverse] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const timeout2 = setTimeout(() => {
      setBlink((prev) => !prev);
    }, 500);
    return () => clearTimeout(timeout2);
  }, [blink]);

  useEffect(() => {
    if (index >= words.length) {
      setIndex(0);
      return;
    }

    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(
      () => {
        setSubIndex((prev) => prev + (reverse ? -1 : 1));
      },
      reverse ? deletingSpeed : typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="font-mono">
      {words[index].substring(0, subIndex)}
      <span className={`${blink ? "opacity-100" : "opacity-0"} ml-1`}>|</span>
    </span>
  );
};

const Introduction = () => {
  const { t } = useTranslation();

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0a0a0a] text-white font-sans">
      {/* Background Glitch Effect - Dimmed for better readability */}
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

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col-reverse lg:flex-row items-center justify-center lg:justify-between gap-12">
        {/* Left: Text Content */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 max-w-2xl w-full">
          {/* Badge */}
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

          <div className="text-xl md:text-2xl lg:text-3xl text-gray-400 font-light flex items-center gap-2">
            <span>{t("iAm")}</span>
            <span className="text-[#61dca3]">
              <Typewriter
                words={[t("role1"), t("role2")]}
                typingSpeed={100}
                deletingSpeed={50}
                pauseTime={2000}
              />
            </span>
          </div>

          <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
            {t("introText")}
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="px-8 py-4 bg-[#61dca3] text-black font-bold rounded-full hover:bg-[#4fd192] transition-all transform hover:scale-105 flex items-center justify-center gap-2 group shadow-[0_0_20px_rgba(97,220,163,0.3)]"
            >
              {t("viewProjects")}
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent border border-gray-700 text-white font-medium rounded-full hover:bg-white/5 hover:border-white/30 transition-all flex items-center justify-center"
            >
              {t("contactMe")}
            </a>
          </div>
        </div>

        {/* Right: Photo Section */}
        <div className="flex items-center justify-center w-full lg:w-auto relative order-first lg:order-last mb-8 lg:mb-0">
          <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-[500px] lg:h-[500px]">
            {/* Decorative Elements */}
            <div className="absolute -inset-4 border border-[#61dca3]/20 rounded-[2rem] animate-[spin_10s_linear_infinite]" />
            <div className="absolute -inset-8 border border-[#61b3dc]/20 rounded-[2rem] animate-[spin_15s_linear_infinite_reverse] hidden md:block" />

            {/* Tech Decoration Corners */}
            <div className="absolute -top-2 -left-2 w-8 h-8 border-t-4 border-l-4 border-[#61dca3] z-20 pointer-events-none"></div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-4 border-r-4 border-[#61dca3] z-20 pointer-events-none"></div>

            {/* Image Container */}
            <div className="w-full h-full relative rounded-[2rem] overflow-hidden border-2 border-[#61dca3]/50 shadow-[0_0_50px_rgba(97,220,163,0.2)] bg-[#111]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              {/* 
                 TODO: Replace this div with your actual Image component
                 <Image src="/your-photo.jpg" alt="Alvin Putra" fill className="object-cover" />
              */}
              <div className="w-full h-full flex items-center justify-center bg-gray-900 text-gray-500 flex-col gap-4">
                <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <p className="text-sm font-mono uppercase tracking-widest">
                  Photo Placeholder
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
