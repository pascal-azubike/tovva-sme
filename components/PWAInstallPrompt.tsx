 "use client";

import { useEffect, useState } from "react";

// PWA API types
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Register service worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((err) => console.error("SW registration failed:", err));
    }

    // Install prompt handling (Chromium browsers)
    const onBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Some browsers require a user gesture to call prompt().
      setVisible(true);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall as EventListener);

    const onAppInstalled = () => setVisible(false);
    window.addEventListener("appinstalled", onAppInstalled);

    // Hide if already installed
    if (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) {
      setVisible(false);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall as EventListener);
      window.removeEventListener("appinstalled", onAppInstalled);
    };
  }, []);

  if (!visible || !deferredPrompt) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 mx-auto max-w-md z-50">
      <div className="mx-4 rounded-lg border bg-background/90 backdrop-blur shadow-lg p-4 flex items-center justify-between gap-3">
        <div className="text-sm">
          <div className="font-medium">Install Trovva</div>
          <div className="text-muted-foreground">Get a faster, app-like experience.</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={async () => {
              try {
                await deferredPrompt.prompt();
                await deferredPrompt.userChoice;
              } finally {
                setVisible(false);
                setDeferredPrompt(null);
              }
            }}
            className="px-3 py-1.5 rounded-md bg-primary text-primary-foreground text-sm hover:bg-primary/90"
          >
            Install
          </button>
          <button
            onClick={() => setVisible(false)}
            className="px-3 py-1.5 rounded-md border text-sm hover:bg-accent"
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
