import Introduction from "./components/home/hero/introduction";
import AboutSection from "./components/home/AboutSection";
import ProjectSection from "./components/home/ProjectSection";
import ContactSection from "./components/home/ContactSection";
import Navbar from "./components/home/layout/navbar";
import Footer from "./components/home/layout/footer";

const HomePage = () => {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a]">
      <Navbar />

      <section id="home">
        <Introduction />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="projects">
        <ProjectSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>

      <Footer />
    </main>
  );
};

export default HomePage;
