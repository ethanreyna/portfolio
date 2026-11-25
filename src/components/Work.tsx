import { caseStudies, type CaseStudy, type Feature } from "../data/content";
import { Gallery } from "./Gallery";
import { Dashes, Icon, Reveal, Section, TechList } from "./ui";

/** A feature with screenshots: copy on one side, gallery on the other. */
function FeatureBlock({ feature, study, flip }: { feature: Feature; study: CaseStudy; flip: boolean }) {
  return (
    <Reveal className="grid items-start gap-8 lg:grid-cols-12 lg:gap-12">
      <div className={`lg:col-span-5 lg:pt-4 ${flip ? "lg:order-2" : ""}`}>
        <h4 className="text-xl font-semibold tracking-tight sm:text-2xl">{feature.title}</h4>
        <p className="mt-3 leading-relaxed text-pretty text-fg/80">{feature.summary}</p>
        <Dashes points={feature.points} className="mt-5 text-sm" />
        <div className="mt-5">
          <TechList items={feature.tags} />
        </div>
      </div>
      <div className={`min-w-0 lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
        <Gallery shots={feature.shots} label={`${study.company.toLowerCase()} · ${feature.title.toLowerCase()}`} />
      </div>
    </Reveal>
  );
}

/** A feature without screenshots yet: a compact card. */
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  return (
    <Reveal delay={(index % 2) * 80} className="h-full">
      <div className="flex h-full flex-col rounded-xl border border-line bg-bg/50 p-6">
        <h4 className="text-lg font-semibold tracking-tight">{feature.title}</h4>
        <p className="mt-2 text-sm leading-relaxed text-pretty text-fg/80">{feature.summary}</p>
        <Dashes points={feature.points} className="mt-5 flex-1 text-sm" />
        <div className="mt-5">
          <TechList items={feature.tags} />
        </div>
      </div>
    </Reveal>
  );
}

function Study({ study }: { study: CaseStudy }) {
  const withShots = study.features.filter((f) => f.shots.length);
  const withoutShots = study.features.filter((f) => !f.shots.length);
  return (
    <article id={study.id} className="scroll-mt-24">
      <Reveal>
        <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-5">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {study.company}
            <span className="font-display font-normal text-muted italic"> / {study.product}</span>
          </h3>
          <p className="font-mono text-sm text-faint">
            {study.role} · {study.period}
          </p>
        </div>
        <p className="mt-5 max-w-3xl leading-relaxed text-pretty text-fg/80">{study.blurb}</p>
        {withShots.length === 0 && (
          <p className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-cmt">
            <Icon.Image width={13} height={13} /> // screenshots coming soon
          </p>
        )}
      </Reveal>

      {withShots.length > 0 && (
        <div className="mt-14 space-y-20 sm:mt-16 sm:space-y-24">
          {withShots.map((f, i) => (
            <FeatureBlock key={f.title} feature={f} study={study} flip={i % 2 === 1} />
          ))}
        </div>
      )}

      {withoutShots.length > 0 && (
        <div className={`mt-14 grid gap-4 sm:mt-16 ${withoutShots.length > 1 ? "md:grid-cols-2" : ""}`}>
          {withoutShots.map((f, i) => (
            <FeatureCard key={f.title} feature={f} index={i} />
          ))}
        </div>
      )}
    </article>
  );
}

export default function Work() {
  return (
    <Section
      id="work"
      eyebrow="work"
      title="Things I've built"
      intro="Most of this lives behind a login, so here's a tour with screenshots. Other people's names are blurred out."
    >
      <div className="space-y-24 sm:space-y-32">
        {caseStudies.map((s) => (
          <Study key={s.id} study={s} />
        ))}
      </div>
    </Section>
  );
}
