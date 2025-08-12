"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}      // Reduced movement
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}        // Reduced movement
      transition={{
        type: "spring",
        stiffness: 150,    // Reduced for smoother animation
        damping: 20,       // Reduced for less bounce
        duration: 0.4      // Slightly longer for more elegant feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition; 