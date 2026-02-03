"use client";

import { useEffect, useState, useCallback, memo } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Rocket } from "lucide-react";

const BackToTop = memo(function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const { scrollYProgress } = useScroll();

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const radius = 18;
  const circumference = 2 * Math.PI * radius;

  const dashOffset = useTransform(smoothProgress, [0, 1], [circumference, 0]);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    if (isLaunching) return;
    setIsLaunching(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setTimeout(() => setIsLaunching(false), 1000);
  }, [isLaunching]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-[100] flex items-center justify-center w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/20 shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer group overflow-hidden"
          aria-label="Back to top"
        >
          <svg
            className="absolute w-full h-full -rotate-90 p-0.5"
            viewBox="0 0 44 44"
          >
            <circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="text-white/10"
            />
            <motion.circle
              cx="22"
              cy="22"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray={circumference}
              style={{ strokeDashoffset: dashOffset }}
              strokeLinecap="round"
              className="text-[#329467] drop-shadow-[0_0_2px_rgba(43,69,57,0.8)]"
            />
          </svg>

          <motion.div
            animate={
              isLaunching
                ? { y: -50, opacity: 0, scale: 0.5 }
                : { y: 0, opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.5, ease: "backIn" }}
            className="z-10 relative"
          >
            <Rocket className="w-5 h-5 text-white transition-transform duration-300 -rotate-45 group-hover:scale-110" />
          </motion.div>

          <div className="absolute inset-0 rounded-full bg-[#2b4539]/0 transition-colors duration-300 group-hover:bg-[#2b4539]/10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
});

export default BackToTop;
