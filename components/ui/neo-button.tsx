"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { buttonVariants } from "@/lib/animations";
import { ButtonHTMLAttributes, ReactNode } from "react";

interface NeoButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "destructive";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

export function NeoButton({
  children,
  className,
  variant = "primary",
  size = "md",
  fullWidth = false,
  ...props
}: NeoButtonProps) {
  const variantStyles = {
    primary: "bg-yellow-400 text-black border-black hover:bg-yellow-300",
    secondary: "bg-blue-400 text-black border-black hover:bg-blue-300",
    accent: "bg-pink-400 text-black border-black hover:bg-pink-300",
    destructive: "bg-red-500 text-white border-black hover:bg-red-400",
  };

  const sizeStyles = {
    sm: "text-sm py-1 px-3",
    md: "text-base py-2 px-4",
    lg: "text-lg py-3 px-6",
  };

  return (
    <motion.button
      className={cn(
        "relative font-bold border-4 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] transition-all",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        className
      )}
      whileHover="hover"
      whileTap="tap"
      variants={buttonVariants}
      {...props}
    >
      {children}
    </motion.button>
  );
}