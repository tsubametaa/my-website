import LetterGlitch from "./components/LetterGlitch";

const HomePage = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center">
      <LetterGlitch
        glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
        glitchSpeed={50}
        centerVignette={false}
        outerVignette={true}
        smooth={true}
        characters="UTAKOTOBUKI!@<SCRIPT/>#$%^&*()-_+=/[]{};:<>.,0123456789"
      />
    </main>
  );
};

export default HomePage;
