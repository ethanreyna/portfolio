import { useEffect, useState } from "react";
import { profile } from "../data/content";
import { Icon } from "./ui";

const links = [
  { href: "#top", label: "ethan" },
  { href: "#work", label: "work" },
  { href: "#experience", label: "experience" },
  { href: "#skills", label: "skills" },
  { href: "#contact", label: "contact" },
];

const THEME_COLOR = { light: "#f8f5f0", dark: "#1a1816" };

function storedTheme() {
  try {
    return localStorage.getItem("theme");
  } catch {
    return null;
  }
}

/**
 * The initial class is set by /theme.js before first paint. The site follows the OS
 * setting until the visitor picks a theme; only an explicit toggle is saved.
 */
function useTheme() {
  const [light, setLight] = useState(() => document.documentElement.classList.contains("light"));

  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", light ? THEME_COLOR.light : THEME_COLOR.dark);
  }, [light]);

  useEffect(() => {
    const mq = matchMedia("(prefers-color-scheme: light)");
    const onChange = () => {
      if (!storedTheme()) setLight(mq.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = () => {
    const next = !light;
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      /* storage unavailable: the choice just won't persist */
    }
    setLight(next);
  };

  return [light, toggle] as const;
}

/** Tracks which nav section is in view. */
function useScrollSpy() {
  const [active, setActive] = useState(links[0].href);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const atBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 4;
      let current = links[0].href;
      if (atBottom && window.scrollY > 0) {
        current = links[links.length - 1].href;
      } else {
        for (const l of links) {
          const el = document.querySelector(l.href);
          if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) current = l.href;
        }
      }
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return active;
}

export default function Nav() {
  const [light, toggle] = useTheme();
  const active = useScrollSpy();

  return (
    <nav
      aria-label="Main"
      className="side-nav fixed inset-x-3 top-3 z-40 flex items-center justify-between gap-1 rounded-xl border border-line/70 bg-panel px-2 py-1.5 font-mono text-xs shadow-sm backdrop-blur-md sm:inset-x-auto sm:right-4 sm:top-4 lg:sticky lg:top-8 lg:right-auto lg:w-40 lg:shrink-0 lg:flex-col lg:items-start lg:self-start lg:border-0 lg:bg-transparent lg:p-0 lg:text-sm lg:shadow-none lg:backdrop-blur-none"
    >
      <ul className="flex items-center gap-0.5 lg:flex-col lg:items-start lg:gap-1.5">
        {links.map((l, i) => {
          const on = active === l.href;
          return (
            <li key={l.href} className={i === 0 ? "hidden lg:block" : undefined}>
              <a
                href={l.href}
                aria-current={on ? "location" : undefined}
                className={`flex items-center rounded-md px-1.5 py-1 transition-colors lg:px-0 ${
                  on ? "text-accent" : "text-muted hover:text-fg"
                }`}
              >
                <span aria-hidden="true" className={`hidden w-4 lg:inline ${on ? "" : "opacity-0"}`}>
                  &gt;
                </span>
                {l.label}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="flex items-center gap-1 lg:mt-5 lg:flex-col lg:items-start lg:gap-2">
        <a
          href={profile.resume}
          target="_blank"
          rel="noreferrer"
          className="hidden items-center gap-1 rounded-md py-1 text-muted transition-colors hover:text-fg lg:inline-flex lg:pl-4"
        >
          resume.pdf <Icon.ArrowUpRight width={13} height={13} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
        <button
          type="button"
          onClick={toggle}
          className="grid size-8 place-items-center rounded-md text-muted transition hover:bg-raised hover:text-fg lg:ml-2.5"
          aria-label={light ? "Switch to dark theme" : "Switch to light theme"}
        >
          {light ? <Icon.Moon width={16} height={16} /> : <Icon.Sun width={16} height={16} />}
        </button>
      </div>
    </nav>
  );
}
