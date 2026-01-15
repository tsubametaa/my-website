"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Language = "en" | "id" | "ms" | "jp" | "ch";

export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  id: "Indonesia",
  ms: "Melayu",
  jp: "日本語",
  ch: "中文",
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

import { TRANSLATIONS } from "./translate";

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(LANGUAGE_LABELS).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      const browserLang = navigator.language.split("-")[0];
      const matchedLang = Object.keys(LANGUAGE_LABELS).find(
        (lang) => lang === browserLang
      ) as Language;

      setLanguage(matchedLang || "en");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const t = (key: string, lang?: Language): string => {
  const currentLang =
    lang ||
    (typeof window !== "undefined"
      ? (localStorage.getItem("language") as Language)
      : "en") ||
    "en";
  return TRANSLATIONS[currentLang][key] || key;
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return { t: (key: string) => TRANSLATIONS[language][key] || key, language };
};
