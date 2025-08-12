"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: React.ElementType;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: unknown;
}) {
  return (
    <Component
      className={cn(
        "relative h-16 w-40 overflow-hidden bg-transparent p-[1px] text-xl",
        containerClassName,
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        {/* Main moving dot */}
        <MovingBorder duration={duration || 8000} rx="30%" ry="30%">
          <div
            className={cn(
              "h-4 w-4 bg-secondary rounded-full shadow-md", // Larger and more prominent
              borderClassName,
            )}
          />
        </MovingBorder>
        
        {/* Trail effect - fixed offsets for consistent spacing */}
        <MovingBorder duration={duration || 8000} rx="30%" ry="30%" offset={-60}>
          <div className={cn("h-4 w-4 bg-secondary/80 rounded-full")} />
        </MovingBorder>
        
        <MovingBorder duration={duration || 8000} rx="30%" ry="30%" offset={-120}>
          <div className={cn("h-3 w-3 bg-secondary/70 rounded-full")} />
        </MovingBorder>
        
        <MovingBorder duration={duration || 8000} rx="30%" ry="30%" offset={-180}>
          <div className={cn("h-3 w-3 bg-secondary/60 rounded-full")} />
        </MovingBorder>
        
        <MovingBorder duration={duration || 8000} rx="30%" ry="30%" offset={-240}>
          <div className={cn("h-2 w-2 bg-secondary/50 rounded-full")} />
        </MovingBorder>
        
        {/* Subtle glow effect */}
        <MovingBorder duration={(duration || 8000) * 1.1} rx="30%" ry="30%">
          <div
            className={cn(
              "h-6 w-6 bg-secondary/15 rounded-full blur-sm",
              borderClassName,
            )}
          />
        </MovingBorder>
      </div>

      <div
        className={cn(
          "relative flex h-full w-full items-center justify-center border border-slate-800 bg-slate-900/[0.8] text-sm text-white antialiased backdrop-blur-xl",
          className,
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 10000, // Slower for subtle movement
  rx,
  ry,
  offset = 0, // Add offset parameter for trail positioning
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  offset?: number; // New parameter for positioning
  [key: string]: unknown;
}) => {
  const pathRef = useRef<SVGRectElement>(null);
  const progress = useMotionValue<number>(0);

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength();
    if (length) {
      const pxPerMillisecond = length / duration;
      // Apply offset to create consistent spacing
      const adjustedTime = time + offset;
      progress.set((adjustedTime * pxPerMillisecond) % length);
    }
  });

  const x = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).x,
  );
  const y = useTransform(
    progress,
    (val) => pathRef.current?.getPointAtLength(val).y,
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
        />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        {children}
      </motion.div>
    </>
  );
};

// Moving border container wrapper component
interface MovingBorderContainerProps {
  children: React.ReactNode;
  borderRadius?: string;
  duration?: number;
  dotSize?: string;
  dotClassName?: string;
}

export const MovingBorderContainer = ({ 
  children, 
  borderRadius = "20px",
  duration = 12000, // Very slow for subtle movement
  dotSize = "h-4 w-4", // Larger for better visibility
  dotClassName = "bg-secondary rounded-full shadow-md" // Full secondary color with stronger shadow
}: MovingBorderContainerProps) => (
  <div 
    className="relative overflow-hidden bg-transparent p-[1px] w-full" // Slightly thicker border for visibility
    style={{ borderRadius }}
  >
    <div 
      className="absolute inset-0 pointer-events-none"
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      {/* Main moving dot */}
      <MovingBorder duration={duration} rx="20" ry="20">
        <div className={cn(dotSize, dotClassName)} />
      </MovingBorder>
      
      {/* Trail effect - fixed offsets for consistent spacing */}
      <MovingBorder duration={duration} rx="20" ry="20" offset={-80}>
        <div className={cn("h-5 w-5 bg-secondary/80 rounded-full")} />
      </MovingBorder>
      
      <MovingBorder duration={duration} rx="20" ry="20" offset={-160}>
        <div className={cn("h-4 w-4 bg-secondary/70 rounded-full")} />
      </MovingBorder>
      
      <MovingBorder duration={duration} rx="20" ry="20" offset={-240}>
        <div className={cn("h-4 w-4 bg-secondary/60 rounded-full")} />
      </MovingBorder>
      
      <MovingBorder duration={duration} rx="20" ry="20" offset={-320}>
        <div className={cn("h-3 w-3 bg-secondary/50 rounded-full")} />
      </MovingBorder>
      
      <MovingBorder duration={duration} rx="20" ry="20" offset={-400}>
        <div className={cn("h-3 w-3 bg-secondary/40 rounded-full")} />
      </MovingBorder>
      
      <MovingBorder duration={duration} rx="20" ry="20" offset={-480}>
        <div className={cn("h-2 w-2 bg-secondary/30 rounded-full")} />
      </MovingBorder>
      
      {/* Subtle glow effect */}
      <MovingBorder duration={duration * 1.1} rx="20" ry="20">
        <div className={cn("h-8 w-8 bg-secondary/15 rounded-full blur-sm")} />
      </MovingBorder>
    </div>
    
    <div 
      className="relative px-8 sm:px-16 py-12 bg-card flex flex-col justify-center items-center gap-8 w-full pointer-events-auto"
      style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
    >
      {children}
    </div>
  </div>
);
