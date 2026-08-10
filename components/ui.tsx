import type { ReactNode } from "react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/cn";

export function Eyebrow({
  children,
  tone = "brand",
  className,
}: {
  children: ReactNode;
  tone?: "brand" | "light";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em]",
        tone === "brand" ? "text-brand-500" : "text-accent-cyan",
        className,
      )}
    >
      <span
        className={cn(
          "h-px w-8",
          tone === "brand" ? "bg-brand-500/50" : "bg-accent-cyan/50",
        )}
      />
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "brand",
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: "brand" | "light";
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "mt-5 text-3xl font-bold sm:text-4xl lg:text-[2.75rem]",
          tone === "brand" ? "text-navy-950" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={cn(
            "mt-5 text-base",
            tone === "brand" ? "text-navy-950/65" : "text-navy-100/80",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}

export function Section({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-20 lg:py-28", className)}>
      <div className="container-page">{children}</div>
    </section>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-950 pb-20 pt-32 lg:pb-28 lg:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 -top-40 h-[32rem] w-[32rem] rounded-full bg-brand-500/35 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-10 h-[26rem] w-[26rem] rounded-full bg-navy-600/40 blur-[120px]"
      />
      <div className="container-page relative">
        <Reveal className="max-w-3xl border-l-2 border-accent-cyan/70 pl-6 sm:pl-8">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-cyan">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <div className="mt-6 max-w-2xl text-base text-navy-100/80">{description}</div>
          ) : null}
        </Reveal>
      </div>
    </section>
  );
}

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-navy-900">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(125,243,255,0.18),transparent_55%),radial-gradient(circle_at_85%_80%,rgba(27,71,207,0.55),transparent_55%)]"
      />
      <div className="container-page relative flex flex-col items-start gap-8 py-16 lg:flex-row lg:items-center lg:justify-between lg:py-20">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-cyan">
            Consulting
          </p>
          <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
            브랜딩부터 환자유입까지, 지금 상담받으세요
          </h2>
          <p className="mt-3 text-navy-100/80">
            365일 상담 문의 가능 · 병의원 상황에 맞는 맞춤 플랜을 제안해 드립니다.
          </p>
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-3">
          <a
            href="tel:+82-10-9113-9786"
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-navy-950 transition hover:bg-navy-50"
          >
            010-9113-9786
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-bold text-white ring-1 ring-white/40 transition hover:bg-white/10"
          >
            오시는 길 보기
          </a>
        </Reveal>
      </div>
    </section>
  );
}
