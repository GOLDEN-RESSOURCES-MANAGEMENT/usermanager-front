"use client";
import React from "react";
import clsx from "clsx";

interface ButtonsProps {
  title?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type: "primary" | "secondary";
  variant: "solid" | "outline";
  iconbefore?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}
export default function Buttons({
  title,
  icon,
  className,
  disabled,
  type = "primary",
  iconbefore = true,
  variant = "solid",
  onClick,
}: ButtonsProps) {
  const variantClass: Record<string, string> = {
    solid: clsx("text-white", "border-2 border-" + type, "bg-" + type),
    outline: clsx(
      "text-" + type,
      "border-2 border-" + type,
      "bg-" + type + "/5"
    ),
  };
  const typeClass = {
    secondary: clsx(variantClass[variant]),
    primary: clsx(variantClass[variant]),
    dder: clsx(variantClass[variant]),
  };

  return (
    <div
      onClick={() => onClick}
      className={clsx(
        typeClass[type],
        "flex px-3  items-center justify-around gap-4 rounded-lg h-11 ",
        "hover:cursor-pointer",
        !iconbefore && "flex-row-reverse ",
        className
      )}
    >
      {icon} {title && <span className="font-semibold">{title}</span>}
      <span
        className={clsx(
          "hidden border-primary text-primary bg-secondary bg-primary  text-secondary"
        )}
      ></span>
    </div>
  );
}

export function IconButtons({
  title,
  size = "md",
  icon,
  className,
  type = "primary",
  iconbefore = true,
  variant = "solid",
  onClick,
}: ButtonsProps) {
  const sizeClass: Record<string, string> = {
    sm: "px-1.5 py-1.5 text-sm",
    md: "px-3 py-2 text-sm",
    lg: "px-6 py-3",
  };

  const variantClass: Record<string, string> = {
    solid: clsx("text-white", "border-2 border-" + type, "bg-gradiant-" + type),
    outline: clsx(
      "text-" + type,
      // "border-2 border-" + type,
      "bg-" + type + "/5"
    ),
  };
  const typeClass = {
    secondary: clsx(variantClass[variant]),
    primary: clsx(variantClass[variant]),
    dder: clsx(variantClass[variant]),
  };

  return (
    <div
      onClick={onClick}
      className={clsx(
        typeClass[type],
        sizeClass[size],
        "flex items-center gap-4 rounded-full ",
        "hover:cursor-pointer hover:bg-primary/5",
        !iconbefore && "flex-row-reverse ",
        className
      )}
    >
      {icon} {title && <span className="font-semibold">{title}</span>}
      <span
        className={clsx(
          "hidden border-primary text-primary bg-secondary bg-primary text-secondary"
        )}
      ></span>
    </div>
  );
}
