import Link from "next/link";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import { getBlogPosts } from "@/lib/blog-data";
import { getMarketingContent } from "@/server/content/getMarketingContent";
import { getLocaleFromRequest } from "@/i18n/server";

export default async function BlogPage() {
  const locale = await getLocaleFromRequest();
  const content = await getMarketingContent(locale);
  const blogPosts = await getBlogPosts(locale);
  const eyebrow = content.blog.eyebrow === content.blog.title ? undefined : content.blog.eyebrow;

  return (
    <div className="space-y-20 pb-20 pt-16">
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={content.blog.title}
          subtitle={content.blog.subtitle}
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="glass-card rounded-3xl p-6 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-white/50">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
              <h3 className="mt-3 text-xl font-semibold text-white">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-white/70">{post.summary}</p>
              <p className="mt-4 text-xs text-white/50">{post.date}</p>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
