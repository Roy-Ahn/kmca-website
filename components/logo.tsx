import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
  wordmark?: string;
};

export function Logo({ className, withWordmark = true, wordmark = "KMCA" }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-8 w-8 shrink-0"
        fill="none"
      >
        <rect
          x="1.25"
          y="1.25"
          width="37.5"
          height="37.5"
          rx="9"
          stroke="currentColor"
          strokeWidth="2.5"
        />
        <text
          x="20"
          y="18"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          KM
        </text>
        <text
          x="20"
          y="32"
          textAnchor="middle"
          fill="currentColor"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.5"
        >
          CA
        </text>
      </svg>
      {withWordmark ? (
        <span className="text-lg font-extrabold tracking-tight">{wordmark}</span>
      ) : null}
      <span className="sr-only">한국메디코스아카데미</span>
    </span>
  );
}
