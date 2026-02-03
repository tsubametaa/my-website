"use client";

import { motion } from "motion/react";
import {
  Download,
  ExternalLink,
  FileText,
  Printer,
  Share2,
} from "lucide-react";
import Breadcrumbs from "../ui/breadcrumbs";
import { useTranslation } from "../../language/switch-lang";

const CvSection = () => {
  const cvUrl = "/Alvin_Ferina_Putra_CV.pdf";
  const { t } = useTranslation();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.download = "Alvin_Ferina_Putra_CV.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    const iframe = document.getElementById("cv-frame") as HTMLIFrameElement;
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print();
    }
  };

  const title = t("cvTitle");
  const titleParts = title.split(" ");
  const hasMultipleParts = titleParts.length > 1;

  return (
    <section
      className="min-h-screen w-full bg-[#0a0a0a] pt-28 pb-16 px-4 md:px-8 lg:px-16"
      id="cv-preview"
    >
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Breadcrumbs items={[{ label: t("cvTitle"), active: true }]} />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
                {hasMultipleParts ? (
                  <>
                    {titleParts.slice(0, -1).join(" ")}{" "}
                    <span className="text-[#2b4539]">
                      {titleParts[titleParts.length - 1]}
                    </span>
                  </>
                ) : (
                  title
                )}
              </h1>
              <p className="text-gray-400 max-w-xl">{t("cvSummary")}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleDownload}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#2b4539] hover:bg-[#1a2c24] text-white rounded-lg font-medium transition-colors shadow-lg shadow-[#2b4539]/20"
              >
                <Download className="w-4 h-4" />
                <span>{t("downloadPDF")}</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#1a1a1a] border border-white/10 hover:border-white/30 text-gray-300 hover:text-white rounded-lg font-medium transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                <span className="hidden sm:inline">{t("openNewTab")}</span>
              </motion.a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#2b4539]/40 to-cyan-900/40 rounded-xl blur-md opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="relative w-full h-[100vh] bg-[#111] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            <div className="h-12 bg-[#1a1a1a] border-b border-white/5 flex items-center justify-between px-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="h-4 w-[1px] bg-white/10 mx-2" />
                <span className="text-xs text-gray-500 font-mono">
                  {t("cvTitle").replace(/ /g, "_")}.pdf
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrint}
                  className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
                  title={t("print")}
                >
                  <Printer className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Content (Iframe) */}
            <div className="flex-1 w-full bg-white relative">
              <iframe
                id="cv-frame"
                src={`${cvUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-full block"
                title="CV Preview"
              />
              {/* Fallback for browsers that don't support iframes (rare) */}
              <div className="absolute inset-0 flex items-center justify-center bg-[#111] text-white pointer-events-none -z-10">
                <div className="text-center">
                  <FileText className="w-16 h-16 mx-auto mb-4 text-[#2b4539]" />
                  <p>{t("noPDFSupport")}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CvSection;
