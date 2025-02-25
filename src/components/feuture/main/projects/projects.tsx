import PostCard from "@/components/const/post/PostCard"
import SectionLayout from "@/components/layouts/section/SectionLayout";

export default function Projects() {

  return (
    <>
        <SectionLayout title="Projects" background="none">
            <PostCard category="project"/>
        </SectionLayout>
    </>
  );
}
