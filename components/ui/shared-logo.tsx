"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface SharedLogoProps {
  /**
   * The size variant of the logo
   * 'navbar' - Small size for navbar (120x40)
   * 'auth' - Medium size for auth pages (160x53)
   */
  variant: 'navbar' | 'auth';
  
  /**
   * Whether to make the logo clickable (for navbar)
   */
  clickable?: boolean;
  
  /**
   * Custom className for additional styling
   */
  className?: string;
}

export const SharedLogo: React.FC<SharedLogoProps> = ({ 
  variant, 
  clickable = false,
  className = "" 
}) => {
  // Define dimensions based on variant
  const dimensions = {
    navbar: { width: 120, height: 40 },
    auth: { width: 160, height: 53 }
  };
  
  const { width, height } = dimensions[variant];
  
  // Logo content with shared layoutId for smooth transitions
  const logoContent = (
    <motion.div
      layoutId="app-logo"
      className={`flex-shrink-0 ${className}`}
      transition={{
        type: "spring",
        stiffness: 200,    // Reduced for smoother animation
        damping: 25,       // Reduced for less bounce
        mass: 0.8  
      }}
    >
      <Image
        src="/logo-trovva.png"
        alt="Trovva Logo"
        width={width}
        height={height}
        className={`w-auto h-12 object-contain hover:opacity-80 transition-opacity dark:hidden`}
      />
      <Image
        src="/trovva-white.png"
        alt="Trovva Logo"
        width={width}
        height={height}
        className={`w-auto h-12 object-contain hover:opacity-80 transition-opacity hidden dark:block`}
      />
    </motion.div>
  );

  // Return clickable logo for navbar, static logo for auth pages
  if (clickable) {
    return (
      <Link href="/" className="block">
        {logoContent}
      </Link>
    );
  }

  return logoContent;
};

export default SharedLogo; 