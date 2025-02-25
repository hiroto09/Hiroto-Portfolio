import  ProjectItems from "./project-items/ProjectItems"
import SectionLayout from "@/components/layouts/section/SectionLayout";

export default function Projects() {

  return (
    <>
        <SectionLayout title="Projects" background="none">
            <ProjectItems />
        </SectionLayout>
    </>
  );
}
