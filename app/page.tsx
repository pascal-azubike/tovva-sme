import Image from "next/image";
import Link from "next/link";
import { CometCard } from "@/components/ui/comet-card";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import Navbar from "@/components/ui/navbar";
import {
  Button,
  ButtonVariantType,
  ButtonSizeType,
} from "@/components/ui/button";
import { cn } from "@/lib/utils";


export default function TrovvaLanding() {
  const navigationItems = [
    { href: "#", label: "About Us" },
    { href: "#", label: "FAQ" },
    { href: "#", label: "News" },
  ];

  const rightNavigationItems = [
    { href: "/login", label: "Login", isButton: false },
    { href: "#", label: "Get started", isButton: true },
  ];

  return (
    <div className="min-h-screen w-full bg-background relative overflow-hidden flex flex-col font-sans">
      {/* Dot Background Pattern */}
      <div
        className={cn(
          "absolute inset-0",
          "[background-size:20px_20px]",
          "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
          "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]"
        )}
      />
      {/* Radial gradient for the container to give a faded look */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      {/* Teal blur decorator */}
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-teal-500 rounded-full blur-[275px] opacity-30 pointer-events-none"></div>

      {/* Navigation - Only on home page */}
      <Navbar navigationItems={navigationItems} rightNavigationItems={rightNavigationItems} />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between px-4 sm:px-8 md:px-16 flex-1 relative z-10 py-4 gap-8 lg:gap-0">
        {/* Left Content */}
        <div className="max-w-xl pt-4 relative lg:pt-8 text-center lg:text-left flex flex-col items-center lg:items-start">
          <div className="mb-4">
            <TypewriterEffect
              words={[
                {
                  text: "Empowering ",
                  className:
                    "text-[42px] font-bold text-text-muted leading-tight",
                },
                {
                  text: "Nigeria's ",
                  className:
                    "text-[42px] font-bold text-text-muted leading-tight",
                },
                {
                  text: "entrepreneurs, ",
                  className:
                    "text-[42px] font-bold text-text-muted leading-tight",
                },
                {
                  text: "one ",
                  className:
                    "text-[42px] font-bold text-secondary leading-tight",
                },
                {
                  text: "idea ",
                  className:
                    "text-[42px] font-bold text-secondary leading-tight",
                },
                {
                  text: "at ",
                  className:
                    "text-[42px] font-bold text-secondary leading-tight",
                },
                {
                  text: "a ",
                  className:
                    "text-[42px] font-bold text-secondary leading-tight",
                },
                {
                  text: "time",
                  className:
                    "text-[42px] font-bold text-secondary leading-tight",
                },
              ]}
              className="text-center lg:text-left"
              cursorClassName="bg-primary"
            />
          </div>

          <p className="text-[20px] max-w-[450px] text-text-muted mb-6 leading-relaxed text-center lg:text-left">
            From Idea to Ownership: Grow with Trovva&apos;s Training, Loans, and
            Mentorship.
          </p>
          {/* Teal blur decorator */}
     
          <div className="relative inline-block">
            <Link href="/signup">
              <Button
                variant={ButtonVariantType.DEFAULT}
                size={ButtonSizeType.LG}
                className="bg-primary text-white px-24 py-4 cursor-pointer rounded-[10px] text-xl font-medium hover:bg-secondary transition-colors h-auto  w-full max-w-[650px]"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Content - Africa Map with CometCard */}
        <div className="relative flex-1 flex justify-center items-start pt-4">
          <CometCard className="w-[450px] h-[360px]">
            <div className="relative w-full h-full bg-card rounded-2xl overflow-hidden">
              {/* Background decorator behind the map */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/10 to-secondary/20 rounded-full transform scale-110 -z-10"></div>

              <Image
                src="/africa.svg"
                alt="Africa map with Nigeria highlighted"
                width={450}
                height={360}
                className="opacity-90 w-full h-full object-contain"
              />
            </div>
          </CometCard>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-primary text-white py-4 flex-shrink-0 relative z-10 mt-32 lg:mt-0">
        <div className="text-center">
          <p className="text-lg font-medium text-transparent bg-clip-text bg-gradient-to-b from-white via-white via-gray-100 via-gray-300 via-gray-600 to-black drop-shadow-lg">
            your business deserve to succeed we are here to help
          </p>
        </div>
      </div>

      {/* Chat Button with Shadow */}
      <button className="fixed bottom-8 right-8 bg-primary text-white p-6 rounded-full shadow-2xl hover:bg-secondary hover:shadow-3xl transition-all duration-300 z-20 drop-shadow-lg">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12H16M8 8H16M6 20L2 16V4C2 2.9 2.9 2 4 2H20C21.1 2 22 2.9 22 4V16C22 17.1 21.1 18 20 18H6Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
