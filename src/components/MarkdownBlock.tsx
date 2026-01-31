import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkdownBlock(props: { markdown: string }) {
  if (!props.markdown.trim()) {
    return null;
  }

  return (
    <div className="prose prose-invert max-w-none text-white/80">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{props.markdown}</ReactMarkdown>
    </div>
  );
}
