import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Barba.js-inspired page transition for React Router.
 *
 * Sequence on route change:
 *   1. Overlay panel sweeps in from the bottom (cover)   — 500ms
 *   2. Route content swaps behind the panel, scroll resets
 *   3. Overlay panel sweeps out to the top (reveal)      — 500ms
 *   4. Incoming page content fades + slides in
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [contentVisible, setContentVisible] = useState(true);
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      setDisplayed(children);
      return;
    }

    const timers: number[] = [];

    // Phase 1: cover (panel sweeps up over content)
    setPhase("cover");
    setContentVisible(false);

    // Phase 2: at the midpoint, swap route content + reset scroll
    timers.push(
      window.setTimeout(() => {
        setDisplayed(children);
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        prevPath.current = location.pathname;
      }, 500)
    );

    // Phase 3: reveal (panel sweeps off the top)
    timers.push(
      window.setTimeout(() => {
        setPhase("reveal");
      }, 520)
    );

    // Phase 4: fade incoming content in slightly after reveal starts
    timers.push(
      window.setTimeout(() => {
        setContentVisible(true);
      }, 700)
    );

    // Reset
    timers.push(
      window.setTimeout(() => {
        setPhase("idle");
      }, 1100)
    );

    return () => timers.forEach((t) => clearTimeout(t));
  }, [location.pathname, children]);

  return (
    <>
      <div
        className={cn(
          "transition-all duration-500 ease-out will-change-transform",
          contentVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-3"
        )}
      >
        {displayed}
      </div>

      {/* Sweeping overlay panel — Barba-style */}
      <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
        <div
          className={cn(
            "absolute inset-x-0 h-[110vh] bg-card border-y border-border",
            "transition-transform duration-500",
            phase === "cover"
              ? "translate-y-0 ease-[cubic-bezier(0.7,0,0.3,1)]"
              : phase === "reveal"
              ? "-translate-y-full ease-[cubic-bezier(0.7,0,0.3,1)]"
              : "translate-y-full duration-0"
          )}
        >
          <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center transition-opacity",
              phase === "cover" ? "opacity-100 duration-300 delay-200" : "opacity-0 duration-150"
            )}
          >
            <span className="font-display font-bold text-foreground text-2xl tracking-[0.4em]">
              IIC
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
