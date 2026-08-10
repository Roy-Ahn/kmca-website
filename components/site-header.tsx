"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/logo";
import { navigation, site } from "@/content/site";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "border-b border-navy-950/10 bg-white/85 text-navy-950 backdrop-blur-xl"
          : "border-b border-white/10 bg-transparent text-white",
      )}
    >
      <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="shrink-0" aria-label={`${site.name} 홈으로 이동`}>
          <Logo />
        </Link>

        <nav aria-label="주요 메뉴" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "relative rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                      active
                        ? scrolled
                          ? "text-brand-500"
                          : "text-white"
                        : scrolled
                          ? "text-navy-950/60 hover:text-navy-950"
                          : "text-white/70 hover:text-white",
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full transition-opacity",
                        scrolled ? "bg-brand-500" : "bg-accent-cyan",
                        active ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className={cn(
              "hidden items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors sm:inline-flex",
              scrolled
                ? "bg-navy-900 text-white hover:bg-navy-950"
                : "bg-white/15 text-white ring-1 ring-white/30 backdrop-blur hover:bg-white/25",
            )}
          >
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
              scrolled || open
                ? "text-navy-950 hover:bg-navy-950/5"
                : "text-white hover:bg-white/10",
            )}
          >
            <span className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300",
                  open ? "top-1.5 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition-all duration-300",
                  open && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300",
                  open ? "top-1.5 -rotate-45" : "top-3",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="border-t border-navy-950/10 bg-white lg:hidden"
      >
        <nav aria-label="모바일 메뉴" className="container-page py-4">
          <ul className="flex flex-col">
            {navigation.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-baseline justify-between border-b border-navy-950/5 py-4",
                      active ? "text-brand-500" : "text-navy-950",
                    )}
                  >
                    <span className="text-base font-bold">{item.label}</span>
                    <span className="text-xs text-navy-950/50">{item.labelKo}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <a
            href={site.phoneHref}
            className="mt-6 flex items-center justify-center gap-2 rounded-full bg-navy-900 px-5 py-3.5 text-sm font-bold text-white"
          >
            <PhoneIcon className="h-4 w-4" />
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
