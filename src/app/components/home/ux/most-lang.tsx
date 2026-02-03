"use client";

import { motion } from "motion/react";
import Image from "next/image";

const stack = [
  {
    name: "MongoDB",
    src: "/assets/mongodb.svg",
    url: "https://www.mongodb.com",
  },
  {
    name: "Express",
    src: "/assets/expressjs.svg",
    url: "https://expressjs.com",
  },
  {
    id: "framework-cycle",
    isRotating: true,
  },
  {
    name: "NodeJS",
    src: "/assets/nodejs.svg",
    url: "https://nodejs.org",
  },
];

const frameworks = [
  {
    name: "React",
    src: "/assets/react.svg",
    url: "https://react.dev",
  },
  {
    name: "Astro",
    src: "/assets/astro.svg",
    url: "https://astro.build",
  },
  {
    name: "Vue",
    src: "/assets/vue.svg",
    url: "https://vuejs.org",
  },
];

const duplicatedFrameworks = [
  ...frameworks,
  ...frameworks,
  ...frameworks,
  ...frameworks,
];

const MostLang = () => {
  return (
    <div className="h-full w-full bg-[#111] rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center border border-gray-800/50 shadow-2xl relative overflow-hidden">
      <div className="mb-6 md:mb-8 flex items-center gap-3 z-10">
        <span className="h-[1px] w-6 md:w-12 bg-gray-800"></span>
        <p className="text-[10px] md:text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
          My Favorite Stack
        </p>
        <span className="h-[1px] w-6 md:w-12 bg-gray-800"></span>
      </div>

      <div className="flex flex-wrap justify-center items-start gap-6 md:gap-14 w-full z-10">
        {stack.map((item, i) => {
          if (item.isRotating) {
            return (
              <div
                key="rotating-framework"
                className="relative w-16 md:w-20 h-24 md:h-28 overflow-hidden flex justify-center"
              >
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-[#111] via-transparent to-[#111] opacity-20" />
                <motion.div
                  className="flex flex-col gap-6 md:gap-10 pb-6 md:pb-10"
                  animate={{
                    y: ["0%", "-450%"],
                  }}
                  transition={{
                    y: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear",
                    },
                  }}
                >
                  {duplicatedFrameworks.map((framework, index) => (
                    <motion.a
                      key={`${framework.name}-${index}`}
                      href={framework.url}
                      target="_blank"
                      rel=""
                      whileHover={{
                        scale: 1.1,
                      }}
                      className="flex flex-col items-center gap-2 group cursor-pointer"
                    >
                      <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0 grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                        <div className="w-full h-full relative icon-container">
                          <Image
                            src={framework.src}
                            alt={framework.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-[#61dca3] transition-colors font-mono font-medium">
                        {framework.name}
                      </span>
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            );
          }

          return (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.1,
              }}
              className="flex flex-col items-center gap-2 group cursor-pointer"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0 grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-300">
                <div className="w-full h-full relative icon-container">
                  <Image
                    src={item.src!}
                    alt={item.name!}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <span className="text-[10px] md:text-xs text-gray-500 group-hover:text-[#61dca3] transition-colors font-mono font-medium">
                {item.name}
              </span>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
};

export default MostLang;
