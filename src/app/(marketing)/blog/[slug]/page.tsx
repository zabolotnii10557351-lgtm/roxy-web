import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getBlogPost } from "@/lib/blog-data";
import { getMarketingContent } from "@/server/content/getMarketingContent";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);
  const post = await getBlogPost(locale, params.slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <Link className="text-xs text-white/60 hover:text-white" href="/blog">
          ← {content.blog.backToBlog}
        </Link>
        <SectionHeading
          eyebrow={post.category}
          title={post.title}
          subtitle={post.summary}
        />
        <div className="mt-6 text-xs uppercase tracking-wider text-white/50">
          {post.date} • {post.readingTime}
        </div>
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-white/70">
          {post.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </Container>
    </div>
  );
}
