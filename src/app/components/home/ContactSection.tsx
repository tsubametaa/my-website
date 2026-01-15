"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Send, Mail, User, Type, MessageSquare, Terminal } from "lucide-react";
import { useTranslation } from "../language/switch-lang";
import { sanitizeInput } from "../../utils/sanitize";

export default function ContactSection() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, subject, message } = formData;
    const recipient = "alvinferinaputra2023@student.unas.ac.id";
    const body = `Hello Alvin, I'm ${name}. ${message}`;

    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&su=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setTimeout(() => {
      window.open(gmailLink, "_blank");
      setIsSubmitting(false);
    }, 800);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    const sanitizedValue = sanitizeInput(value);
    setFormData((prev) => ({
      ...prev,
      [id]: sanitizedValue,
    }));
  };

  return (
    <section
      className="w-full bg-[#0a0a0a] text-white py-20 px-6 overflow-hidden"
      id="contact"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <span className="text-[#61dca3] font-mono text-sm tracking-widest uppercase">
                &lt;/{t("startConversation")}&gt;
              </span>
              <h2 className="text-4xl md:text-5xl font-bold">
                {t("contact")} <span className="text-[#61dca3]">{t("me")}</span>
              </h2>
              <div className="h-1 w-20 bg-[#61dca3] rounded-full"></div>
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                {t("contactDesc")}
              </p>
            </div>

            <div className="bg-[#111] p-6 rounded-2xl border border-gray-800 font-mono text-sm relative group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                <Terminal size={48} className="text-[#61dca3]" />
              </div>
              <p className="text-gray-500 mb-2">
                {" "}
                {t("contactInfo") || "Contact Details"}
              </p>
              <div className="space-y-2 text-gray-300">
                <p>
                  <span className="text-purple-400">const</span>{" "}
                  <span className="text-yellow-200">contact</span>{" "}
                  <span className="text-purple-400">=</span>{" "}
                  <span className="text-yellow-400">{"{"}</span>
                </p>
                <div className="pl-6 space-y-1">
                  <p>
                    <span className="text-blue-300">email</span>:{" "}
                    <span className="text-green-300">
                      &quot;alvinferinaputra2023@student.unas.ac.id&quot;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">github</span>:{" "}
                    <span className="text-green-300">
                      &quot;@tsubametaa&quot;
                    </span>
                    ,
                  </p>
                  <p>
                    <span className="text-blue-300">status</span>:{" "}
                    <span className="text-green-300">
                      &quot;Available for hire&quot;
                    </span>
                  </p>
                </div>
                <p className="text-yellow-400">{"}"};</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#111] border border-gray-800 rounded-3xl p-8 shadow-2xl relative"
          >
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-mono text-gray-400 ml-1"
                  >
                    {t("name") || "Name"}:
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#61dca3] transition-colors" />
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t("namePlaceholder") || "John Doe"}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#61dca3] focus:ring-1 focus:ring-[#61dca3] transition-all font-mono text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-mono text-gray-400 ml-1"
                  >
                    {t("email") || "Email"}:
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#61dca3] transition-colors" />
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t("emailPlaceholder") || "john@example.com"}
                      className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#61dca3] focus:ring-1 focus:ring-[#61dca3] transition-all font-mono text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subject"
                  className="text-sm font-mono text-gray-400 ml-1"
                >
                  {t("subject") || "Subject"}:
                </label>
                <div className="relative group">
                  <Type className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#61dca3] transition-colors" />
                  <input
                    type="text"
                    id="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder={t("subjectPlaceholder") || "Project Details"}
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#61dca3] focus:ring-1 focus:ring-[#61dca3] transition-all font-mono text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="message"
                  className="text-sm font-mono text-gray-400 ml-1"
                >
                  {t("message") || "Message"}:
                </label>
                <div className="relative group">
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-500 group-focus-within:text-[#61dca3] transition-colors" />
                  <textarea
                    id="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={
                      t("messagePlaceholder") || "Describe your project..."
                    }
                    className="w-full bg-[#0a0a0a] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#61dca3] focus:ring-1 focus:ring-[#61dca3] transition-all font-mono text-sm resize-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-xl bg-[#61dca3] disabled:bg-gray-700 disabled:cursor-not-allowed font-medium text-black transition-all duration-300 hover:bg-[#58c994] shadow-[0_0_20px_rgba(97,220,163,0.3)] hover:shadow-[0_0_30px_rgba(97,220,163,0.5)] cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-wide">
                      {isSubmitting
                        ? "Opening Email Client..."
                        : t("sendMessage") || "Send Message"}
                    </span>
                    {!isSubmitting && (
                      <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    )}
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
