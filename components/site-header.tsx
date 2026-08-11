"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

// Where the "current section" line sits, just below the fixed header.
const SPY_OFFSET = 140;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const line = window.scrollY + SPY_OFFSET;

      let current = "";
      for (const item of navigation) {
        const element = document.getElementById(item.id);
        if (element && element.getBoundingClientRect().top + window.scrollY <= line) {
          current = item.id;
        }
      }

      // The last section can be too short to ever cross the line.
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = navigation[navigation.length - 1].id;

      setScrolled(window.scrollY > 8);
      setActive(current);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  // The page opens on a dark hero, so the header starts transparent and only
  // takes on a surface once the content scrolls underneath it.
  const solid = scrolled || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
        !solid && "on-dark border-b border-transparent bg-transparent",
        // The open drawer is opaque, so the bar above it has to match.
        solid && !open && "border-b border-[var(--hairline)] bg-white/80 backdrop-blur-xl",
        open && "bg-white",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
        {/* Absolute fragments: a same-document scroll here, a real link from 404. */}
        <a href="/#top" className="shrink-0" aria-label={`${site.name} 맨 위로 이동`}>
          <Logo className={solid ? "text-ink-950" : "text-white"} />
        </a>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  className={cn(
                    "relative block px-3.5 py-2 text-sm font-semibold transition-colors duration-200",
                    solid
                      ? active === item.id
                        ? "text-ink-950"
                        : "text-ink-500 hover:text-ink-950"
                      : active === item.id
                        ? "text-white"
                        : "text-white/65 hover:text-white",
                  )}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-3.5 bottom-0 h-px origin-left transition-transform duration-300",
                      solid ? "bg-ink-950" : "bg-accent",
                      active === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-pill px-4 py-2 text-sm font-bold transition-colors duration-200 sm:inline-flex",
              solid
                ? "bg-ink-950 text-white hover:bg-brand-600"
                : "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10",
            )}
          >
            <PhoneIcon aria-hidden="true" className="h-3.5 w-3.5" />
            {site.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className={cn(
              "-mr-2 inline-flex h-10 w-10 items-center justify-center rounded-pill transition-colors lg:hidden",
              solid ? "text-ink-950 hover:bg-ink-100" : "text-white hover:bg-white/10",
            )}
          >
            <span className="relative block h-3 w-5">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-[1.5px] w-full rounded bg-current transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-full rounded bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Short phones have to be able to reach the last item. */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="max-h-[calc(100dvh-4rem)] overflow-y-auto bg-white lg:hidden"
      >
        <nav aria-label="모바일 메뉴" className="container-page pb-6 pt-2">
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  aria-current={active === item.id ? "true" : undefined}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-baseline justify-between border-b border-[var(--hairline)] py-4",
                    active === item.id ? "text-brand-600" : "text-ink-900",
                  )}
                >
                  <span className="text-title-3">{item.label}</span>
                  <span className="text-xs text-ink-500">{item.labelKo}</span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href={site.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 rounded-pill bg-ink-950 px-5 py-3.5 text-sm font-bold text-white"
          >
            <PhoneIcon aria-hidden="true" className="h-4 w-4" />
            {site.phone} · {site.hours}
          </a>
        </nav>
      </div>
    </header>
  );
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M2.5 4.2c0-.94.76-1.7 1.7-1.7h1.6c.73 0 1.38.47 1.6 1.17l.63 1.95c.2.6-.01 1.26-.51 1.65l-.9.7a9.6 9.6 0 0 0 4.26 4.26l.7-.9c.39-.5 1.05-.71 1.65-.51l1.95.63c.7.22 1.17.87 1.17 1.6v1.6c0 .94-.76 1.7-1.7 1.7h-.6C8.72 16.35 3.65 11.28 3.1 4.9l-.6-.7Z" />
    </svg>
  );
}
