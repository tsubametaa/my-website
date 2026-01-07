"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define available languages
export type Language = "en" | "id" | "ms" | "jp" | "ch";

// Define language labels
export const LANGUAGE_LABELS: Record<Language, string> = {
  en: "English",
  id: "Indonesia",
  ms: "Melayu",
  jp: "日本語",
  ch: "中文",
};

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

import { TRANSLATIONS } from "./translate";

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Provider component
export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  // Load language preference from localStorage on initial render
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(LANGUAGE_LABELS).includes(savedLanguage)) {
      setLanguage(savedLanguage);
    } else {
      // Set default language based on browser preference or default to 'en'
      const browserLang = navigator.language.split("-")[0];
      const matchedLang = Object.keys(LANGUAGE_LABELS).find(
        (lang) => lang === browserLang
      ) as Language;

      setLanguage(matchedLang || "en");
    }
  }, []);

  // Update localStorage when language changes
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

// Custom hook to use the language context
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

// Helper function to get translation
export const t = (key: string, lang?: Language): string => {
  const currentLang =
    lang ||
    (typeof window !== "undefined"
      ? (localStorage.getItem("language") as Language)
      : "en") ||
    "en";
  return TRANSLATIONS[currentLang][key] || key;
};

// Custom hook to get translation function
export const useTranslation = () => {
  const { language } = useLanguage();
  return { t: (key: string) => TRANSLATIONS[language][key] || key, language };
};
