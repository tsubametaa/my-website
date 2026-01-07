"use client";

import { motion, useInView, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { useTranslation } from "../../language/switch-lang";

const AnimatedNumber = ({ value }: { value: number }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const spring = useSpring(0, { mass: 0.8, stiffness: 75, damping: 15 });

  useEffect(() => {
    if (inView) {
      spring.set(value);
    }
  }, [spring, value, inView]);

  useEffect(() => {
    return spring.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [spring]);

  return <span ref={ref} />;
};

const Count = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: 2,
      label: t("statsYears"),
      suffix: "+",
    },
    {
      value: 5,
      label: t("statsProjects"),
      suffix: "",
    },
    {
      value: 5,
      label: t("statsClients"),
      suffix: "+",
    },
  ];

  return (
    <div className="w-full py-8 mt-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-800 bg-[#111] rounded-3xl p-8 md:p-12 border border-gray-800/50 shadow-2xl relative overflow-hidden">
        {/* Decorative background glow */}

        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center space-y-4 pt-8 md:pt-0 first:pt-0"
          >
            <div className="flex items-baseline gap-1 font-bold text-4xl md:text-5xl lg:text-6xl text-white font-mono">
              <AnimatedNumber value={stat.value} />
              <span className="text-[#61dca3] text-2xl md:text-3xl">
                {stat.suffix}
              </span>
            </div>

            <p className="text-gray-400 font-medium tracking-wider uppercase text-sm md:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Count;
