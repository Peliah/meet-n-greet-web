"use client";

import { forwardRef, InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { inputVariants } from "@/lib/animations";

interface NeoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const NeoInput = forwardRef<HTMLInputElement, NeoInputProps>(
  ({ className, label, error, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label className="font-bold text-black block mb-1">{label}</label>
        )}
        <motion.div
          animate={isFocused ? "focused" : "unfocused"}
          variants={inputVariants}
          className="relative"
        >
          <input
            ref={ref}
            className={cn(
              "w-full py-3 px-4 bg-white border-4 border-black outline-none focus:outline-none",
              error ? "border-red-500" : "border-black",
              className
            )}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
          />
        </motion.div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

NeoInput.displayName = "NeoInput";