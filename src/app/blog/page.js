import { BlogArticlePreviewSection } from "@/components/BlogArticlePreviewSection";
import { BlogIntroSection } from "@/components/BlogIntroSection";

export const metadata = {
  title: "Blog",
  description:
    "Marine Insights — articles on marine engineering, inspections, surveying, offshore operations, and maritime advisory topics.",
};

export default function BlogPage() {
  return (
    <main>
      <BlogIntroSection />
      <BlogArticlePreviewSection />
    </main>
  );
}
