"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BackgroundElements } from "@/components/ui/background-elements";
import { SharedLogo } from "@/components/ui/shared-logo";
import { PageTransition } from "@/components/ui/page-transition";

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "user@example.com";
  const [verificationCode, setVerificationCode] = useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Prevent multiple characters
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);

    // Auto-focus next input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if all fields are filled
    if (newCode.every((char) => char !== "") && index === 4) {
      handleVerification(newCode.join(""));
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !verificationCode[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async (code: string) => {
    setIsVerifying(true);
    // Simulate verification process
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // For demo purposes, accept any 5-digit code
    if (code.length === 5) {
      setIsVerified(true);
    }
    setIsVerifying(false);
  };

  const handleManualSubmit = () => {
    const code = verificationCode.join("");
    if (code.length === 5) {
      handleVerification(code);
    }
  };

  if (isVerified) {
    return (
      <div className="h-screen w-screen relative overflow-hidden bg-primary">
        <BackgroundElements />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <div className="w-10 h-10 bg-green-400 rounded-full flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Email Verified!
              </h1>
              <p className="text-muted-foreground text-lg">
                Your email has been successfully verified. You can now access
                your Trovva account.
              </p>
            </div>
            <Link href="/login">
              <Button className="w-full bg-white text-primary hover:bg-gray-100">
                Continue to Login
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
    <div className="h-screen w-screen relative overflow-hidden bg-primary">
      <BackgroundElements />
      
        {/* Main Content - Centered */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
        <div className="w-full max-w-md text-center">
          {/* Shared Logo - will animate from navbar position */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center bg-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-secondary/30">
              <SharedLogo variant="auth" />
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl font-bold text-white mb-8">
            Verify your email
          </h1>

          {/* Verification Card */}
          <div className="bg-secondary/20 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-secondary/30">
            <div className="text-center mb-6">
              <p className="text-white mb-2">Enter the code sent to</p>
              <p className="text-white font-medium">{email}</p>
            </div>

            {/* Verification Code Inputs - 5 squares */}
            <div className="flex gap-3 justify-center mb-6">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`w-12 h-12 text-center text-lg font-semibold bg-secondary/10 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/20 text-white transition-all duration-200 ${
                    index === 0 && !digit
                      ? "border-secondary/60"
                      : "border-secondary/30"
                  }`}
                  style={{ caretColor: "white" }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              ))}
            </div>

            {/* Submit Button */}
            <Button 
              onClick={handleManualSubmit}
              disabled={
                verificationCode.some((char) => char === "") || isVerifying
              }
              className="w-full bg-white text-primary hover:bg-gray-100 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-all duration-200"
            >
              {isVerifying ? "Verifying..." : "Verify Email"}
            </Button>
          </div>

          {/* Back to sign-in link */}
            <div className="text-center">
            <Link
              href="/login"
              className="text-white hover:text-secondary transition-colors"
              >
              &lt; Back to sign-in
            </Link>
            </div>
        </div>
      </div>
    </div>
    </PageTransition>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-screen relative overflow-hidden bg-primary">
        <BackgroundElements />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="w-full max-w-md text-center">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center bg-secondary/20 backdrop-blur-sm rounded-2xl p-6 border border-secondary/30">
                <SharedLogo variant="auth" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-8">Loading...</h1>
          </div>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}
