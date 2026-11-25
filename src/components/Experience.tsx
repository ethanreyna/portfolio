import { education, experience } from "../data/content";
import { Dashes, Reveal, Section } from "./ui";

function Entry({
  title,
  subtitle,
  period,
  current,
  children,
}: {
  title: string;
  subtitle: string;
  period: string;
  current?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <li className="relative">
      <Reveal>
        <span
          aria-hidden="true"
          className={`absolute -left-[31px] top-2 size-3.5 rounded-full border-2 sm:-left-[47px] ${
            current ? "border-accent bg-accent" : "border-accent bg-bg"
          }`}
        />
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight">
            {title} <span className="font-normal text-muted">· {subtitle}</span>
          </h3>
          <p className="font-mono text-sm text-faint">{period}</p>
        </div>
        {children}
      </Reveal>
    </li>
  );
}

export default function Experience() {
  return (
    <Section id="experience" eyebrow="experience" title="Where I've worked">
      <ol className="relative space-y-12 border-l border-line pl-6 sm:pl-10">
        {experience.map((job, i) => (
          <Entry key={job.company} title={job.company} subtitle={job.role} period={job.period} current={i === 0}>
            <Dashes points={job.points} className="mt-4 max-w-3xl text-fg/80" />
          </Entry>
        ))}
        <Entry title={education.school} subtitle={education.degree} period={education.year} />
      </ol>
    </Section>
  );
}
