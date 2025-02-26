import ThreeArea from "@/libs//three/ThreeArea";
import Title from "@/components/features/main/title/Title";
import About from "@/components/features/main/about/About"
import Skills from "@/components/features/main/skills/Skills";
import Awards from "@/components/features/main/awards/Awards";
import Projects from "@/components/features/main/projects/Projects";
import Active from "./active/Active";


export default function Main() {
  return (
    <>
      
      <ThreeArea />
      <Title />
      <About />
      <Skills/>
      <Awards/>
      <Active/>
      <Projects/>
    </>
  );
}
