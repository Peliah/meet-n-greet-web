"use client";

import { cn } from "@/lib/utils";
import { HTMLAttributes, ReactNode } from "react";

interface NeoBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "destructive";
}

export function NeoBadge({
  children,
  className,
  variant = "primary",
  ...props
}: NeoBadgeProps) {
  const variantStyles = {
    primary: "bg-yellow-400 text-black",
    secondary: "bg-blue-400 text-black",
    accent: "bg-pink-400 text-black",
    destructive: "bg-red-500 text-white",
  };

  return (
    <span
      className={cn(
        "inline-block font-bold px-3 py-1 text-sm border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}