import { profile } from "../data/content";
import { ButtonLink, Icon, Reveal } from "./ui";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 border-t border-line pt-12 sm:pt-16">
      <Reveal>
        <p className="font-mono text-sm text-cmt">// contact</p>
        <h2 className="mt-2 font-display text-4xl tracking-tight text-balance sm:text-6xl">Want to talk?</h2>
        <p className="mt-5 max-w-xl leading-relaxed text-pretty text-fg/80">
          I'm always happy to hear about frontend roles or interesting problems. Email is the best way to reach me.
        </p>
        <p className="mt-8 font-mono text-base break-all sm:text-xl">
          <span className="text-kw">$</span> mail{" "}
          <a
            href={`mailto:${profile.email}`}
            className="text-str underline decoration-line-strong underline-offset-8 transition hover:decoration-current"
          >
            {profile.email}
          </a>
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={profile.linkedin} variant="ghost" external>
            <Icon.Linkedin width={16} height={16} /> LinkedIn
          </ButtonLink>
          <ButtonLink href={profile.github} variant="ghost" external>
            <Icon.Github width={16} height={16} /> GitHub
          </ButtonLink>
          <ButtonLink href={profile.resume} variant="ghost" external>
            <Icon.File width={16} height={16} /> Resume (PDF)
          </ButtonLink>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 px-2 pt-6 font-mono text-xs text-faint">
      <p>© {new Date().getFullYear()} {profile.name}</p>
      <p>
        <span className="text-cmt">//</span> built with React, TypeScript, and Tailwind
      </p>
    </footer>
  );
}
