import ThreeArea from "@/lib//three/ThreeArea";
import Title from "@/components/feuture/main/title/Title";
import About from "@/components/feuture/main/about/About"
import Skills from "@/components/feuture/main/skills/Skills";
import Awards from "@/components/feuture/main/awards/Awards";

export default function Main() {
  return (
    <>
      <ThreeArea />
      <Title />
      <About />
      <Skills/>
      <Awards/>
    </>
  );
}
