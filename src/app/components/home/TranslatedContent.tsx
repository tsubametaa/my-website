"use client";

import { useLanguage } from "../language/switch-lang";
import LanguageSwitcher from "../language/implementing";

const TranslatedContent = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-end mb-4">
        <LanguageSwitcher />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Language Switching Demo</h1>

        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold">
              Current Language: {language}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">English Translation:</h3>
              <p>Current: {language === "en" ? "Active" : "Inactive"}</p>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Indonesian Translation:</h3>
              <p>Current: {language === "id" ? "Aktif" : "Non-aktif"}</p>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Malay Translation:</h3>
              <p>Current: {language === "ms" ? "Aktif" : "Tidak aktif"}</p>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Japanese Translation:</h3>
              <p>
                Current: {language === "jp" ? "アクティブ" : "非アクティブ"}
              </p>
            </div>

            <div className="border p-4 rounded">
              <h3 className="font-medium mb-2">Chinese Translation:</h3>
              <p>Current: {language === "ch" ? "激活" : "未激活"}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded">
            <h3 className="font-medium mb-2">Quick Language Switch:</h3>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded ${
                  language === "en" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("id")}
                className={`px-3 py-1 rounded ${
                  language === "id" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                ID
              </button>
              <button
                onClick={() => setLanguage("ms")}
                className={`px-3 py-1 rounded ${
                  language === "ms" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                MS
              </button>
              <button
                onClick={() => setLanguage("jp")}
                className={`px-3 py-1 rounded ${
                  language === "jp" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                JP
              </button>
              <button
                onClick={() => setLanguage("ch")}
                className={`px-3 py-1 rounded ${
                  language === "ch" ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                CH
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatedContent;
