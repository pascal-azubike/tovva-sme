"use client";

import React from "react";
import { MovingBorderContainer } from "@/components/ui/moving-border";

interface AuthContainerProps {
  children: React.ReactNode;
}

export const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  return (
    <div className="w-full max-w-[540px] mx-auto px-4">
      <MovingBorderContainer duration={12000} dotSize="h-4 w-4" borderRadius="20px">
        {children}
      </MovingBorderContainer>
    </div>
  );
};

export default AuthContainer; 