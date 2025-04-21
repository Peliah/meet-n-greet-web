"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { buttonVariants } from "@/lib/animations";
import { ReactNode, ForwardedRef, forwardRef } from "react";

type ButtonVariant = "primary" | "secondary" | "accent" | "destructive";
type ButtonSize = "sm" | "md" | "lg";

interface NeoButtonProps extends Omit<HTMLMotionProps<"button">, "ref"> {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export const NeoButton = forwardRef<HTMLButtonElement, NeoButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
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
        ref={ref}
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
);

NeoButton.displayName = "NeoButton";