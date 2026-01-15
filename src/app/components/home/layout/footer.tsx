"use client";

import { Github, Linkedin, Instagram } from "lucide-react";

const socialLinks = [
  { name: "GitHub", icon: Github, href: "https://github.com/tsubametaa" },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/alvinfputra12/",
  },
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://www.instagram.com/_alvinfputra_/",
  },
];

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a0a0a] text-white border-t border-white/5 pt-12 pb-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-white/40 text-sm mt-2 flex items-center gap-1">
              &copy; {new Date().getFullYear()} Alvin Putra. All rights
              reserved.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#111] border border-white/5 rounded-xl text-white/60 hover:text-green-500 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 group"
                aria-label={social.name}
              >
                <social.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
