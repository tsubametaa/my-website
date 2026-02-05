import { useTranslation } from "../components/language/switch-lang";
import { ProjectData } from "../components/home/ux/project/modals";

export const useProjects = () => {
  const { t } = useTranslation();

  const projects: ProjectData[] = [
    {
      id: 1,
      title: t("p1Title"),
      images: ["/assets/img/sgw.png", "/assets/img/sgw.png"],
      techStack: [
        { name: "Astro", src: "/assets/astro.svg" },
        { name: "Typescript", src: "/assets/ts.svg" },
      ],
      description: t("p1Desc"),
      link: "https://sagawagroup.id",
    },
    {
      id: 2,
      title: t("p2Title"),
      images: ["/assets/img/7kaih.png", "/assets/img/7kaih.png"],
      techStack: [
        { name: "React", src: "/assets/react.svg" },
        { name: "Typescript", src: "/assets/ts.svg" },
      ],
      description: t("p2Desc"),
      link: "https://7kaih-smkn31.vercel.app/",
    },
    {
      id: 3,
      title: t("p3Title"),
      images: ["/assets/img/freelinkd.png", "/assets/img/freelinkd.png"],
      techStack: [
        { name: "Figma", src: "/assets/figma.svg" },
        { name: "React", src: "/assets/react.svg" },
        { name: "Typescript", src: "/assets/ts.svg" },
        { name: "MongoDB", src: "/assets/mongodb.svg" },
      ],
      description: t("p3Desc"),
      link: "https://freelinkd.com",
    },
    {
      id: 4,
      title: t("p4Title"),
      images: ["/assets/img/awacons.png", "/assets/img/awacons.png"],
      techStack: [
        { name: "Figma", src: "/assets/figma.svg" },
        { name: "React", src: "/assets/react.svg" },
        { name: "Tailwind", src: "/assets/tailwind.svg" },
      ],
      description: t("p4Desc"),
      link: "https://awa-construction.vercel.app/",
    },
    {
      id: 5,
      title: t("p5Title"),
      images: ["/assets/img/unyuls.png", "/assets/img/unyuls.png"],
      techStack: [
        { name: "React", src: "/assets/react.svg" },
        { name: "Node", src: "/assets/nodejs.svg" },
      ],
      description: t("p5Desc"),
      link: "https://unyul-yt.vercel.app/",
    },
    {
      id: 6,
      title: t("p6Title"),
      images: ["/assets/img/vending.png", "/assets/img/vending.png"],
      techStack: [
        { name: "MongoDB", src: "/assets/mongodb.svg" },
        { name: "Express", src: "/assets/expressjs.svg" },
        { name: "Astro", src: "/assets/astro.svg" },
        { name: "Node", src: "/assets/nodejs.svg" },
      ],
      description: t("p6Desc"),
      link: "https://vending-quest.vercel.app/",
    },
  ];

  const contributions: ProjectData[] = [
    {
      id: 1,
      title: t("p1Title"),
      images: ["/assets/img/sgw.png", "/assets/img/sgw.png"],
      techStack: [
        { name: "Astro", src: "/assets/astro.svg" },
        { name: "Typescript", src: "/assets/ts.svg" },
      ],
      description: t("p1Desc"),
      link: "https://sagawagroup.id",
    },
    {
      id: 2,
      title: t("p2Title"),
      images: ["/assets/img/7kaih.png", "/assets/img/7kaih.png"],
      techStack: [
        { name: "React", src: "/assets/react.svg" },
        { name: "Typescript", src: "/assets/ts.svg" },
      ],
      description: t("p2Desc"),
      link: "https://7kaih-smkn31.vercel.app/",
    },
    {
      id: 4,
      title: t("p4Title"),
      images: ["/assets/img/awacons.png", "/assets/img/awacons.png"],
      techStack: [
        { name: "Figma", src: "/assets/figma.svg" },
        { name: "React", src: "/assets/react.svg" },
        { name: "Tailwind", src: "/assets/tailwind.svg" },
      ],
      description: t("p4Desc"),
      link: "https://awa-construction.vercel.app/",
    },
  ];

  const tasks: ProjectData[] = [
    {
      id: 301,
      title: t("p6Title"),
      images: ["/assets/img/vending.png", "/assets/img/vending.png"],
      techStack: [
        { name: "MongoDB", src: "/assets/mongodb.svg" },
        { name: "Express", src: "/assets/expressjs.svg" },
        { name: "Astro", src: "/assets/astro.svg" },
        { name: "Node", src: "/assets/nodejs.svg" },
      ],
      description: t("p6Desc"),
      link: "https://vending-quest.vercel.app/",
    },
    {
      id: 302,
      title: t("t2Title"),
      images: ["/assets/img/web-spk.png", "/assets/img/web-spk.png"],
      techStack: [
        { name: "Express", src: "/assets/expressjs.svg" },
        { name: "Astro", src: "/assets/astro.svg" },
        { name: "Node", src: "/assets/nodejs.svg" },
      ],
      description: t("t2Desc"),
      link: "https://website-spk-web.vercel.app/",
    },
  ];

  const experiments: ProjectData[] = [
    {
      id: 5,
      title: t("p5Title"),
      images: ["/assets/img/unyuls.png", "/assets/img/unyuls.png"],
      techStack: [
        { name: "React", src: "/assets/react.svg" },
        { name: "Node", src: "/assets/nodejs.svg" },
      ],
      description: t("p5Desc"),
      link: "https://unyul-yt.vercel.app/",
    },
    {
      id: 203,
      title: t("e3Title"),
      images: ["/assets/img/neotreetion.png"],
      techStack: [
        { name: "Vue", src: "/assets/vue.svg" },
        { name: "Tailwind", src: "/assets/tailwind.svg" },
      ],
      description: t("e3Desc"),
      link: "https://neotreetion.vercel.app/",
    },
    {
      id: 204,
      title: t("e4Title"),
      images: ["/assets/img/personal-web.png"],
      techStack: [
        { name: "Solid", src: "/assets/solidjs.svg" },
        { name: "Tailwind", src: "/assets/tailwind.svg" },
      ],
      description: t("e4Desc"),
      link: "https://utaaa-web.vercel.app/",
    },
  ];

  return { projects, contributions, experiments, tasks };
};
