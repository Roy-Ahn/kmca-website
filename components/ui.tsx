import type { ComponentProps, ElementType, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
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
  // The site is a single page, so every destination is a fragment, a tel:
  // link or an external URL — a plain anchor covers all three.
  return (
    <a href={href} className={cn(buttonBase, buttonStyles[tone][variant], className)} {...rest}>
      {children}
      {arrow ? (
        <ArrowRightIcon
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
        />
      ) : null}
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

/* --------------------------------------------------------- SectionHeading */

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

