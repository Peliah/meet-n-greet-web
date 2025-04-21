"use client";

import { cn } from "@/lib/utils";
import { motion, HTMLMotionProps } from "framer-motion";
import { cardVariants } from "@/lib/animations";
import { ReactNode, ForwardedRef, forwardRef } from "react";

type CardVariant = "primary" | "secondary" | "accent" | "white";

interface NeoCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  index?: number;
}

export const NeoCard = forwardRef<HTMLDivElement, NeoCardProps>(
  (
    {
      children,
      className,
      variant = "white",
      interactive = false,
      index = 0,
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      primary: "bg-yellow-200",
      secondary: "bg-blue-200",
      accent: "bg-pink-200",
      white: "bg-white",
    };

    return (
      <motion.div
        ref={ref}
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
);

NeoCard.displayName = "NeoCard";