"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface BackgroundElementsProps {
  className?: string;
  blobClassName?: string; // allows overriding blob color/opacity/size
  hideTop?: boolean;
  hideBottom?: boolean;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({ className, blobClassName, hideTop = false, hideBottom = false }) => {
  return (
    <div className={cn("absolute inset-0", className)}>
      {!hideBottom && (
        <div className={cn("w-64 h-64 absolute left-0 bottom-0 bg-secondary/50 rounded-full blur-[120px]", blobClassName)} />
      )}
      {!hideTop && (
        <div className={cn("w-64 h-64 absolute right-0 top-0 bg-secondary/50 rounded-full blur-[120px]", blobClassName)} />
      )}
    </div>
  );
};

export default BackgroundElements; 