import { skills } from "../data/content";
import { Reveal, Section } from "./ui";

/** "Platform & tools" -> "platformAndTools", so each group reads like a variable name. */
const toIdent = (s: string) =>
  s
    .replace(/&/g, "and")
    .split(/\s+/)
    .map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()))
    .join("");

export default function Skills() {
  return (
    <Section id="skills" eyebrow="skills" title="What I work with">
      <Reveal>
        <div className="overflow-x-auto rounded-xl border border-line bg-bg/60 p-5 font-mono text-sm leading-7 sm:p-6">
          {skills.map((g, i) => (
            <div key={g.group} className={i ? "mt-4" : undefined}>
              <p className="text-cmt">// {g.group}</p>
              <p>
                <span className="text-kw">const</span> {toIdent(g.group)} = [
              </p>
              <ul className="flex flex-wrap gap-x-1 pl-6">
                {g.items.map((s, j) => (
                  <li key={s}>
                    <span className="text-str">"{s}"</span>
                    {j < g.items.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <p>];</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
