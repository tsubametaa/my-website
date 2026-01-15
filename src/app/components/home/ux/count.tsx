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
    <div className="h-full w-full bg-[#111] rounded-3xl p-6 md:p-8 flex items-center justify-center border border-gray-800/50 shadow-2xl">
      <div className="flex items-center justify-between w-full max-w-2xl px-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center flex-1 justify-center relative"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center text-center"
            >
              <div className="flex items-baseline font-bold text-4xl md:text-5xl text-white font-sans">
                <AnimatedNumber value={stat.value} />
                {stat.suffix && (
                  <span className="text-[#61dca3]">{stat.suffix}</span>
                )}
              </div>
              <p className="text-[10px] md:text-xs text-slate-500 font-bold tracking-widest uppercase mt-2">
                {stat.label}
              </p>
            </motion.div>

            {index < stats.length - 1 && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 h-16 w-[1px] bg-gray-800 hidden md:block" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Count;
