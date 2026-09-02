import { useEffect, useState } from "react";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

interface LoaderProps {
  onDone: () => void;
}

/**
 * Boot loader: greyscale IIC logo fills with brand colors (blue + gold)
 * from bottom to top, then performs a vertical "shutter" reveal of the app.
 */
export const Loader = ({ onDone }: LoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"fill" | "reveal" | "done">("fill");

  // Animate fill progress 0 -> 1 over ~1.6s
  useEffect(() => {
    if (phase !== "fill") return;
    const duration = 1600;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / duration, 1);
      // ease-in-out cubic
      const eased = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setProgress(eased);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("reveal"), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase]);

  // Reveal phase: shutter splits and slides off after 900ms
  useEffect(() => {
    if (phase !== "reveal") return;
    const t = setTimeout(() => {
      setPhase("done");
      onDone();
    }, 950);
    return () => clearTimeout(t);
  }, [phase, onDone]);

  if (phase === "done") return null;

  return (
    <div className="fixed inset-0 z-[200] pointer-events-none overflow-hidden">
      {/* Top shutter half */}
      <div
        className={cn(
          "absolute inset-x-0 top-0 h-1/2 bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden",
          phase === "reveal" ? "-translate-y-full" : "translate-y-0"
        )}
      />
      {/* Bottom shutter half */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-1/2 bg-background transition-transform duration-[900ms] ease-[cubic-bezier(0.85,0,0.15,1)] overflow-hidden",
          phase === "reveal" ? "translate-y-full" : "translate-y-0"
        )}
      />

      <div
        className={cn(
          "absolute inset-0 flex flex-col items-center justify-center transition-all duration-[900ms] ease-[cubic-bezier(0.85,0,0.15,1)]",
          phase === "reveal" ? "-translate-y-[55vh] opacity-0" : "translate-y-0 opacity-100"
        )}
      >
        <Logo animated progress={progress} className="w-32 h-32 md:w-40 md:h-40 object-contain" />

        <div
          className={cn(
            "mt-8 text-center transition-opacity duration-300",
            phase === "reveal" ? "opacity-0" : "opacity-100"
          )}
        >
          <div className="font-display font-bold tracking-[0.3em] text-xs text-muted-foreground">
            INSTITUTE INNOVATION COUNCIL
          </div>
          <div className="mt-2 text-[10px] text-muted-foreground/60 tracking-widest">
            IIT DHARWAD
          </div>
          {/* progress bar */}
          <div className="mt-6 mx-auto w-40 h-[2px] bg-border overflow-hidden rounded-full">
            <div
              className="h-full bg-primary transition-[width] duration-100"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
