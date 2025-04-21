"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { pageVariants } from "@/lib/animations";

interface PageTransitionProps {
  children: ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageVariants}
      className="min-h-[calc(100vh-88px)]"
    >
      {children}
    </motion.div>
  );
}