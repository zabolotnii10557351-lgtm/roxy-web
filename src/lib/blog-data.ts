import type { Locale } from "@/i18n/locales";
import { type BlogPostContent } from "@/i18n/content";
import { getMarketingContent } from "@/server/content/getMarketingContent";

export type BlogPost = BlogPostContent;

export async function getBlogPosts(locale: Locale) {
  const content = await getMarketingContent(locale);
  return content.blogPosts;
}

export async function getBlogPost(locale: Locale, slug: string) {
  const content = await getMarketingContent(locale);
  return content.blogPosts.find((post) => post.slug === slug);
}
