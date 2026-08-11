import Link from "next/link";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

type Tone = "light" | "dark";

/* ---------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "text-eyebrow flex items-center gap-2.5",
        tone === "light" ? "text-brand-500" : "text-accent",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "h-1 w-1 rounded-full",
          tone === "light" ? "bg-brand-500" : "bg-accent",
        )}
      />
      {children}
    </p>
  );
}

/* ----------------------------------------------------------------- Button */

type ButtonVariant = "primary" | "outline";

const buttonBase =
  "group inline-flex items-center justify-center gap-2 rounded-pill px-6 py-3.5 text-sm font-bold transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px";

const buttonStyles: Record<Tone, Record<ButtonVariant, string>> = {
  light: {
    primary: "bg-ink-950 text-white hover:bg-brand-600",
    outline: "text-ink-900 ring-1 ring-inset ring-ink-200 hover:bg-ink-50 hover:ring-ink-300",
  },
  dark: {
    primary: "bg-white text-ink-950 hover:bg-brand-50",
    outline: "text-white ring-1 ring-inset ring-white/30 hover:bg-white/10 hover:ring-white/50",
  },
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  tone = "light",
  arrow = false,
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  tone?: Tone;
  arrow?: boolean;
  className?: string;
} & Omit<ComponentProps<"a">, "href" | "className" | "children">) {
  const classes = cn(buttonBase, buttonStyles[tone][variant], className);
  const content = (
    <>
      {children}
      {arrow ? (
        <ArrowRightIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
    </>
  );

  // Internal routes go through next/link; tel: and external links stay anchors.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...rest}>
      {content}
    </a>
  );
}

/* ------------------------------------------------------------------- Card */

export function Card({
  children,
  as: Tag = "div",
  interactive = false,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  interactive?: boolean;
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        "rounded-card border border-[var(--hairline)] bg-white",
        interactive &&
          "transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-transparent hover:shadow-lift",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function Tag({ children, tone = "light" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-2.5 py-1 text-xs font-semibold",
        tone === "light" ? "bg-brand-50 text-brand-600" : "bg-white/10 text-brand-100",
      )}
    >
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------- Section */

export function Section({
  children,
  className,
  id,
  tone = "light",
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  tone?: Tone;
  size?: "default" | "compact";
}) {
  return (
    <section
      id={id}
      className={cn(
        size === "compact" ? "py-16 lg:py-20" : "py-20 lg:py-32",
        tone === "dark" && "bg-ink-950 text-white",
        className,
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "light",
  align = "start",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  tone?: Tone;
  align?: "start" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto flex flex-col items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn("text-title-1 mt-5", tone === "light" ? "text-ink-950" : "text-white")}
      >
        {title}
      </h2>
      {description ? (
        <div
          className={cn(
            "text-lede mt-5",
            tone === "light" ? "text-ink-600" : "text-ink-300",
          )}
        >
          {description}
        </div>
      ) : null}
    </Reveal>
  );
}

/* --------------------------------------------------------------- PageHero */

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
    <section className="relative overflow-hidden bg-ink-950 pb-16 pt-32 lg:pb-24 lg:pt-44">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-40 h-[34rem] w-[34rem] rounded-full bg-brand-600/25 blur-[130px]"
      />
      <div className="container-page relative">
        <Reveal className="max-w-3xl">
          <Eyebrow tone="dark">{eyebrow}</Eyebrow>
          <h1 className="text-title-1 mt-6 text-white">{title}</h1>
          {description ? (
            <div className="text-lede mt-6 max-w-2xl text-ink-300">{description}</div>
          ) : null}
        </Reveal>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </section>
  );
}

/* ------------------------------------------------------------- ContactCta */

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-ink-950">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-600/25 blur-[130px]"
      />
      <div className="container-page relative flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-24">
        <Reveal className="max-w-xl">
          <Eyebrow tone="dark">Consulting</Eyebrow>
          <h2 className="text-title-2 mt-5 text-white">
            브랜딩부터 환자유입까지,
            <br />
            지금 상담받으세요
          </h2>
          <p className="mt-4 text-ink-300">
            {site.hours} · 병의원 상황에 맞는 맞춤 플랜을 제안해 드립니다.
          </p>
        </Reveal>
        <Reveal delay={80} className="flex flex-wrap gap-3">
          <ButtonLink href={site.phoneHref} tone="dark">
            {site.phone}
          </ButtonLink>
          <ButtonLink href="/contact" tone="dark" variant="outline" arrow>
            오시는 길 보기
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
