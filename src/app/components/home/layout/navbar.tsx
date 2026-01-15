"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X, Globe, ChevronDown, Check } from "lucide-react";
import {
  useLanguage,
  LANGUAGE_LABELS,
  Language,
  useTranslation,
} from "../../language/switch-lang";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const navLinks = [
    { name: t("home"), href: "#home" },
    { name: t("about"), href: "#about" },
    { name: t("projects"), href: "#projects" },
    { name: t("contact"), href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold font-mono tracking-tighter hover:text-green-500 transition-colors z-50"
          >
            UTA<span className="text-green-500">.DEV</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className="text-sm font-medium text-white/70 hover:text-[#61dca3] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111] border border-white/10 hover:border-[#61dca3]/50 hover:bg-[#61dca3]/10 transition-all duration-300 group"
              >
                <Globe className="w-4 h-4 text-gray-400 group-hover:text-[#61dca3] transition-colors" />
                <span className="text-sm font-mono text-gray-300 group-hover:text-white uppercase">
                  {language}
                </span>
                <ChevronDown
                  className={`w-3 h-3 text-gray-500 transition-transform duration-300 ${
                    isLangMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {isLangMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden z-50 ring-1 ring-black/5"
                  >
                    <div className="p-1">
                      {(Object.keys(LANGUAGE_LABELS) as Language[]).map(
                        (lang) => (
                          <button
                            key={lang}
                            onClick={() => {
                              setLanguage(lang);
                              setIsLangMenuOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-all ${
                              language === lang
                                ? "bg-[#61dca3]/10 text-[#61dca3]"
                                : "text-gray-400 hover:bg-white/5 hover:text-white"
                            }`}
                          >
                            <span className="font-medium">
                              {LANGUAGE_LABELS[lang]}
                            </span>
                            {language === lang && <Check className="w-3 h-3" />}
                          </button>
                        )
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <button
            className="md:hidden z-50 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col justify-center items-center gap-8 md:hidden"
          >
            {navLinks.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-2xl font-bold text-white hover:text-[#61dca3] transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="flex flex-wrap justify-center gap-3 mt-4">
              {(Object.keys(LANGUAGE_LABELS) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-4 py-2 rounded-full text-sm font-mono border transition-all ${
                    language === lang
                      ? "bg-[#61dca3] text-black border-[#61dca3]"
                      : "bg-transparent text-gray-500 border-gray-800 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {LANGUAGE_LABELS[lang]}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
