"use client";

import { motion } from "motion/react";
import Image from "next/image";

const tools = [
  {
    name: "Figma",
    src: "/assets/figma.svg",
    url: "https://www.figma.com",
  },
  {
    name: "Astro",
    src: "/assets/astro.svg",
    url: "https://astro.build",
  },
  {
    name: "React",
    src: "/assets/react.svg",
    url: "https://react.dev",
  },
  {
    name: "Vue",
    src: "/assets/vue.svg",
    url: "https://vuejs.org",
  },
  {
    name: "Express",
    src: "/assets/expressjs.svg",
    url: "https://expressjs.com",
  },
  {
    name: "TypeScript",
    src: "/assets/ts.svg",
    url: "https://www.typescriptlang.org",
  },
  {
    name: "Go",
    src: "/assets/go.svg",
    url: "https://go.dev",
  },
  {
    name: "Python",
    src: "/assets/python.svg",
    url: "https://www.python.org",
  },
  {
    name: "MongoDB",
    src: "/assets/mongodb.svg",
    url: "https://www.mongodb.com",
  },
  {
    name: "Github",
    src: "/assets/github.svg",
    url: "https://github.com",
  },
];

const duplicatedTools = [...tools, ...tools, ...tools, ...tools];

const TechStack = () => {
  return (
    <div className="w-full py-15 overflow-hidden relative">
      <div className="absolute left-0 top-0 w-20 md:w-40 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 w-20 md:w-40 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
        animate={{
          x: ["0%", "-250%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
      >
        {duplicatedTools.map((tool, index) => (
          <motion.a
            key={`${tool.name}-${index}`}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{
              scale: 1.1,
              filter:
                "brightness(1.2) drop-shadow(0 0 15px rgba(97,220,163,0.3))",
            }}
            className="flex-shrink-0 grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-300 cursor-pointer"
          >
            <div className="relative h-10 md:h-14 w-auto flex items-center justify-center px-4">
              <Image
                src={tool.src}
                alt={tool.name}
                width={0}
                height={0}
                className="w-auto h-full object-contain"
                style={{ width: "auto", height: "100%" }}
              />
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStack;
