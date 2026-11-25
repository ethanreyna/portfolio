import { profile, stats } from "../data/content";
import { ButtonLink, Icon, Reveal } from "./ui";

export default function Hero() {
  return (
    <header id="top" className="scroll-mt-24">
      <Reveal>
        <p className="inline-flex items-center gap-2 font-mono text-xs text-muted">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-50 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {profile.currently}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h1 className="mt-5 font-display text-5xl leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          {profile.greeting}
          <span className="cursor" aria-hidden="true" />
        </h1>
        <p className="mt-4 font-mono text-base sm:text-lg">
          <span className="text-kw">$</span> whoami <span className="text-cmt">// {profile.headline}</span>
        </p>
      </Reveal>
      <Reveal delay={160}>
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-pretty text-fg/80 sm:text-xl">
          {profile.intro.map((part, i) =>
            typeof part === "string" ? (
              part
            ) : "kw" in part ? (
              <span key={i} className="font-mono text-[0.9em] text-kw">{part.kw}</span>
            ) : (
              <span key={i} className="font-mono text-[0.9em] text-str">{part.str}</span>
            ),
          )}
        </p>
      </Reveal>
      <Reveal delay={240}>
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href="#work">
            See my work <Icon.ArrowRight width={16} height={16} />
          </ButtonLink>
          <ButtonLink href={`mailto:${profile.email}`} variant="ghost">
            <Icon.Mail width={16} height={16} /> Email me
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal delay={320}>
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="mt-1 text-sm text-pretty text-muted">{s.label}</dt>
              <dd className="order-first font-display text-4xl tracking-tight sm:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </header>
  );
}
