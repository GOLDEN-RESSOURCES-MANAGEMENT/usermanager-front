import clsx from "clsx";
import React from "react";

interface IconProps {
  size?: "sm" | "md" | "lg" | "xs" | "big" | "ultrabig"
  className?: string;
  children: React.ReactNode;
}
export default function Icon({ size = "sm", className, children }: IconProps) {
  const iconSize: Record<string, string> = {
    xs: "text-sm",
    sm: "text-md",
    md: "text-xl",
    lg: "text-2xl",
    big: "text-4xl",
    ultrabig: "text-8xl",
  };
  return (
    <div className={clsx("inline-block", className, iconSize[size])}>
      {children}
    </div>
  );
}
