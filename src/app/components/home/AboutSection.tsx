"use client";

import { motion } from "motion/react";
import { GraduationCap, Eye } from "lucide-react";
import Link from "next/link";
import TechStack from "./ux/language";
import Count from "./ux/count";
import MostLang from "./ux/most-lang";
import { useTranslation } from "../language/switch-lang";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-20 px-6 border-t border-gray-900">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
        >
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              {t("about")} <span className="text-[#61dca3]">{t("me")}</span>
            </h2>
            <div className="h-1 w-20 bg-[#61dca3] rounded-full"></div>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("aboutText1")}
            </p>
            <p className="text-gray-400 text-lg leading-relaxed">
              {t("aboutText2")}
            </p>

            <div className="pt-4">
              <Link
                href="/cv"
                className="group relative inline-flex items-center gap-3 px-8 py-3 bg-[#61dca3]/5 text-[#61dca3] border border-[#61dca3]/20 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#61dca3] hover:shadow-[0_0_20px_rgba(97,220,163,0.3)]"
              >
                <span className="absolute inset-0 bg-[#61dca3] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></span>

                <span className="relative z-10 flex items-center gap-2 font-mono font-bold group-hover:text-black transition-colors duration-300">
                  <Eye className="h-5 w-5 hover:animate-none" />
                  <span>{t("viewCV")}</span>
                </span>

                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#61dca3] -translate-x-1 -translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#61dca3] translate-x-1 translate-y-1 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-300"></span>
              </Link>
            </div>
          </div>

          <div className="space-y-6 bg-[#111] p-8 rounded-2xl border border-gray-800 hover:border-[#61dca3]/50 transition-colors duration-300">
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-[#61dca3]" />
              {t("education")}
            </h3>

            <div className="space-y-4">
              <div className="border-l-2 border-[#61dca3] pl-4">
                <h4 className="text-xl font-semibold text-white">
                  {t("degree")}
                </h4>
                <p className="text-[#61dca3] font-mono text-sm mt-1">
                  {t("university")}
                </p>
                <p className="text-gray-400 mt-2">{t("educationDesc")}</p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-white font-mono tracking-tight">
              Tech <span className="text-[#61dca3]">Stack</span>
            </h3>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              {t("techStackDesc")}
            </p>
          </motion.div>

          <div className="rounded-3xl p-8 transition-colors duration-300">
            <TechStack />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Count />
            <MostLang />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
