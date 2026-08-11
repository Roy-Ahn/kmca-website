import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  withWordmark?: boolean;
};

export function Logo({ className, withWordmark = true }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        aria-hidden="true"
        className="h-[1.875rem] w-[1.875rem] shrink-0"
        fill="none"
      >
        <rect
          x="1"
          y="1"
          width="38"
          height="38"
          rx="10"
          stroke="currentColor"
          strokeWidth="2"
        />
        <text
          x="20"
          y="17.6"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="-0.4"
        >
          KM
        </text>
        <text
          x="20"
          y="30.4"
          textAnchor="middle"
          fill="currentColor"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontSize="12.5"
          fontWeight="800"
          letterSpacing="-0.4"
        >
          CA
        </text>
      </svg>
      {withWordmark ? (
        <span className="text-[1.0625rem] font-extrabold tracking-[-0.03em]">KMCA</span>
      ) : null}
      <span className="sr-only">한국메디코스아카데미</span>
    </span>
  );
}
