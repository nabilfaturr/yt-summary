import { cn } from "@/lib/utils";
import { JSX } from "react";

type HeadingProps = {
  level: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
  variant?: "sans" | "serif" | "mono";
  as?: keyof JSX.IntrinsicElements;
};

const HEADING_DETAILS: Record<
  HeadingProps["level"],
  { size: string; weight: string }
> = {
  1: { size: "text-3xl md:text-4xl lg:text-4xl", weight: "font-semibold" },
  2: { size: "text-2xl md:text-3xl lg:text-3xl", weight: "font-medium" },
  3: { size: "text-xl md:text-2xl lg:text-2xl", weight: "font-medium" },
  4: { size: "text-lg md:text-xl lg:text-xl", weight: "font-normal" },
};

const VARIANT_STYLES: Record<NonNullable<HeadingProps["variant"]>, string> = {
  sans: "font-sans",
  serif: "font-serif",
  mono: "font-mono",
};

export function Heading({
  children,
  level = 1,
  className,
  variant = "sans",
  as,
}: HeadingProps) {
  const Tag = (as || `h${level}`) as keyof JSX.IntrinsicElements;
  const { size, weight } = HEADING_DETAILS[level];
  return (
    <Tag className={cn(VARIANT_STYLES[variant], size, weight, className)}>
      {children}
    </Tag>
  );
}
