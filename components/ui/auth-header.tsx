"use client";

import React from "react";
import { SharedLogo } from "./shared-logo";
interface AuthHeaderProps {
  title: string;
}

export const AuthHeader: React.FC<AuthHeaderProps> = ({ title }) => {
  return (
    <div className="self-stretch flex flex-col justify-start items-center gap-4">
      <SharedLogo variant="auth" />
      <div className="justify-center text-primary dark:text-secondary text-3xl font-semibold font-['Geist'] leading-7">
        {title}
      </div>
    </div>
  );
};

export default AuthHeader;
