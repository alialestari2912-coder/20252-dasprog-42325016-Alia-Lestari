"use client";

type SeparatorProps = {
  className?: string;
};

export function Separator({ className = "" }: SeparatorProps) {
  return <div className={`w-full h-[3px] bg-black my-4 ${className}`} />;
}
