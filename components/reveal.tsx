"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type RevealVariant = "up" | "fade" | "scale";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  variant?: RevealVariant;
};

const variantClass: Record<RevealVariant, string> = {
  up: "reveal-up",
  fade: "reveal-fade",
  scale: "reveal-scale",
};

// One observer for the whole page rather than one per element.
const callbacks = new WeakMap<Element, () => void>();
let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        // `isIntersecting` alone misses elements that a fast scroll jumped
        // clean over, so anything already above the viewport counts too.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          callbacks.get(entry.target)?.();
        }
      }
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0 },
  );

  return observer;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      const timer = setTimeout(() => setVisible(true), 0);
      return () => clearTimeout(timer);
    }

    const io = getObserver();
    const reveal = () => {
      setVisible(true);
      io.unobserve(node);
      callbacks.delete(node);
    };

    callbacks.set(node, reveal);
    io.observe(node);

    return () => {
      io.unobserve(node);
      callbacks.delete(node);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-visible={visible}
      className={cn("reveal", variantClass[variant], className)}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
