import CvSection from "../components/home/cv/cv_section";
import Navbar from "../components/home/layout/navbar";
import Footer from "../components/home/layout/footer";

export default function CvPage() {
  return (
    <main className="w-full min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <CvSection />
      <Footer />
    </main>
  );
}
