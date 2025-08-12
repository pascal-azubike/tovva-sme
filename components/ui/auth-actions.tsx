"use client";

import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

interface AuthActionsProps {
  submitting: boolean;
  submitLabel: string;
  altQuestion: string;
  altHref: string;
  altLabel: string;
}

export const AuthActions: React.FC<AuthActionsProps> = ({ submitting, submitLabel, altQuestion, altHref, altLabel }) => {
  return (
    <div className="space-y-6">
      <Button
        type="submit"
        disabled={submitting}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? `${submitLabel}...` : submitLabel}
      </Button>

      <div className="space-y-4 text-center">
        <div>
          <span className="text-muted-foreground text-base font-normal capitalize">
            {altQuestion}{" "}
          </span>
          <Link
            href={altHref}
            className="text-primary dark:text-secondary text-base font-normal capitalize hover:text-secondary transition-colors"
          >
            {altLabel}
          </Link>
        </div>

        <div>
          <Link
            href="/"
            className="text-muted-foreground text-base font-normal capitalize hover:text-primary dark:hover:text-secondary transition-colors"
          >
            ← Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthActions; 