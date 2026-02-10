interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: SectionHeadingProps) {
  const showEyebrow = eyebrow && eyebrow !== title;

  return (
    <div className="mx-auto max-w-2xl text-center">
      {showEyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base text-white/70 md:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
