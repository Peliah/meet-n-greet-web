"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { cardVariants } from "@/lib/animations";
import { HTMLAttributes, ReactNode } from "react";

interface NeoCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "white";
  interactive?: boolean;
  index?: number;
}

export function NeoCard({
  children,
  className,
  variant = "white",
  interactive = false,
  index = 0,
  ...props
}: NeoCardProps) {
  const variantStyles = {
    primary: "bg-yellow-200",
    secondary: "bg-blue-200",
    accent: "bg-pink-200",
    white: "bg-white",
  };

  return (
    <motion.div
      className={cn(
        "p-6 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        variantStyles[variant],
        className
      )}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index}
      whileHover={interactive ? "hover" : undefined}
      whileTap={interactive ? "tap" : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}