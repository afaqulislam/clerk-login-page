"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  SignOutButton,
  UserButton,
  UserProfile,
  useUser,
} from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";

const hasPublishableKey = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

function hexToRgb(hex: string) {
  const value = hex.replace("#", "");
  const r = parseInt(value.slice(0, 2), 16);
  const g = parseInt(value.slice(2, 4), 16);
  const b = parseInt(value.slice(4, 6), 16);
  return `${r}, ${g}, ${b}`;
}

function useAnimatedCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const gridSize = 64;
    const brandRgb = hexToRgb(siteConfig.colors.brand);

    const handleResize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    let rafId: number;
    const dots: { x: number; y: number; phase: number }[] = [];

    for (let x = gridSize / 2; x < window.innerWidth; x += gridSize) {
      for (let y = gridSize / 2; y < window.innerHeight; y += gridSize) {
        dots.push({ x, y, phase: Math.random() * Math.PI * 2 });
      }
    }

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      dots.forEach((dot) => {
        const pulse = 0.5 + 0.5 * Math.sin(t * 0.02 + dot.phase);
        const alpha = 0.1 + pulse * 0.3;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 1.2 + pulse * 1.3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${brandRgb}, ${alpha})`;
        ctx.fill();
      });
      t++;
      rafId = requestAnimationFrame(draw);
    };

    if (prefersReducedMotion) {
      draw();
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return canvasRef;
}

function useCurrentClock() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return now;
}

function FooterClock() {
  const now = useCurrentClock();

  if (!now) {
    return (
      <span className="tabular-nums">
        © {new Date().getFullYear()} {siteConfig.name}
      </span>
    );
  }

  const date = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <span className="tabular-nums">
      © {now.getFullYear()} {siteConfig.name} · {date} · {time}
    </span>
  );
}

function SignInCard() {
  return (
    <motion.div
      key="signedOut"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-glow/25 bg-brand/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-glow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-glow" />
          Welcome
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Join {siteConfig.name}
        </h2>
        <p className="mt-3 text-muted-foreground">
          Experience a premium space built to ignite your imagination.
        </p>

        <div className="mt-8 flex flex-col gap-3">
          <SignInButton mode="modal">
            <button className="group relative w-full overflow-hidden rounded-xl bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-gold-glow active:scale-[0.98]">
              <span className="relative z-10">Sign In</span>
            </button>
          </SignInButton>

          <div className="relative my-1 flex items-center">
            <div className="h-px flex-1 bg-white/10" />
            <span className="px-3 text-xs text-muted-foreground">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <SignUpButton mode="modal">
            <button className="w-full rounded-xl border border-gold-glow/30 bg-brand/5 px-6 py-3.5 text-sm font-semibold text-gold-glow transition-all duration-300 hover:border-gold-glow/60 hover:bg-brand/15 active:scale-[0.98]">
              Create an account
            </button>
          </SignUpButton>
        </div>
      </div>
    </motion.div>
  );
}

function ConfigWarningCard() {
  return (
    <motion.div
      key="configWarning"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="rounded-2xl border border-gold-glow/30 bg-white/[0.04] p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-10">
        <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-glow/25 bg-brand/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.2em] text-gold-glow">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold-glow animate-pulse-slow" />
          Setup required
        </span>
        <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Authentication isn’t configured yet
        </h2>
        <p className="mt-3 text-muted-foreground">
          Add your Clerk keys to{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-glow">
            NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
          </code>{" "}
          and{" "}
          <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-gold-glow">
            CLERK_SECRET_KEY
          </code>{" "}
          in your environment to enable sign in and sign up.
        </p>
      </div>
    </motion.div>
  );
}

function SignedInCard() {
  const { user } = useUser();
  const [profileOpen, setProfileOpen] = useState(false);
  const firstName =
    user?.firstName || user?.primaryEmailAddress?.emailAddress || "there";
  const handle = user?.username || firstName;

  return (
    <motion.div
      key="signedIn"
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -24, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="w-full"
    >
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/60 backdrop-blur-2xl sm:p-10">
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-gold-glow/30 bg-brand/10 p-1">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: { width: 48, height: 48 },
                },
              }}
            />
          </div>
          <div className="min-w-0">
            <h2 className="font-display text-xl font-semibold truncate sm:text-2xl">
              Hello, {handle}
            </h2>
            <p className="text-sm text-muted-foreground">You’re signed in.</p>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          <div className="rounded-xl border border-white/10 bg-black/20 p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Membership</span>
              <span className="inline-flex items-center gap-1.5 text-gold-glow">
                <span className="inline-block h-2 w-2 rounded-full bg-gold-glow animate-pulse-slow" />
                Active
              </span>
            </div>
          </div>

          <button
            onClick={() => setProfileOpen(true)}
            className="w-full rounded-xl border border-gold-glow/30 bg-brand/5 px-6 py-3.5 text-sm font-semibold text-gold-glow transition-all duration-300 hover:border-gold-glow/60 hover:bg-brand/15 active:scale-[0.98]"
          >
            Manage your account
          </button>

          <SignOutButton>
            <button className="w-full rounded-xl border border-gold-glow/30 bg-brand/5 px-6 py-3.5 text-sm font-semibold text-gold-glow transition-all duration-300 hover:border-gold-glow/60 hover:bg-brand/15 active:scale-[0.98]">
              Sign out
            </button>
          </SignOutButton>
        </div>
      </div>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setProfileOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Manage your account"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl bg-card shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                <h3 className="font-display text-lg font-semibold">
                  Manage your account
                </h3>
                <button
                  onClick={() => setProfileOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-white/10 hover:text-foreground"
                  aria-label="Close"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-5 w-5"
                    aria-hidden="true"
                  >
                    <path
                      d="M18 6 6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="max-h-[75vh] overflow-y-auto">
                <UserProfile routing="hash" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Home() {
  const canvasRef = useAnimatedCanvas();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16">
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-brand/25 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-brand/15 blur-[120px]"
        aria-hidden="true"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative z-10 flex w-full max-w-5xl flex-col items-center"
      >
        <header className="mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-gold-glow/30 bg-brand/10 shadow-lg shadow-black/40">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-7 w-7 text-gold-glow"
                aria-hidden="true"
              >
                <path
                  d="M3 21h18M5 21V7l7-4 7 4v14M9 9h.01M15 9h.01M9 13h.01M15 13h.01"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <h1 className="font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-gold-glow via-brand to-gold-glow bg-clip-text text-transparent">
                {siteConfig.name}
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-base text-muted-foreground sm:text-lg">
              {siteConfig.tagline}
            </p>
          </motion.div>
        </header>

        <AnimatePresence mode="wait">
          {mounted && (
            <div className="w-full max-w-md">
              {hasPublishableKey ? (
                <>
                  <SignedIn>
                    <SignedInCard />
                  </SignedIn>
                  <SignedOut>
                    <SignInCard />
                  </SignedOut>
                </>
              ) : (
                <ConfigWarningCard />
              )}
            </div>
          )}
        </AnimatePresence>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-xs text-muted-foreground/70">
            <FooterClock />
          </p>
        </motion.footer>
      </motion.div>
    </main>
  );
}
