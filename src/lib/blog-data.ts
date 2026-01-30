import type { Locale } from "@/i18n/locales";
import { getContent, type BlogPostContent } from "@/i18n/content";

export type BlogPost = BlogPostContent;

export function getBlogPosts(locale: Locale) {
  return getContent(locale).blogPosts;
}

export function getBlogPost(locale: Locale, slug: string) {
  return getContent(locale).blogPosts.find((post) => post.slug === slug);
}
