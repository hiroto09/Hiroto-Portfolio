import SectionLayout from "@/components/layouts/section/SectionLayout";
import PostCard from "@/components/const/post/PostCard";

export default function Active() {
    return (
        <>
            <SectionLayout title="Active">
                <PostCard category="active"/>
            </SectionLayout>
        </>
        
    )
}