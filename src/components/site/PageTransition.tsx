import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

/**
 * Wraps page content with a fade/slide transition on route change.
 * Also scrolls to top whenever the path changes.
 */
export const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [displayed, setDisplayed] = useState(children);
  const [stage, setStage] = useState<"in" | "out">("in");
  const prevPath = useRef(location.pathname);

  useEffect(() => {
    if (prevPath.current === location.pathname) {
      setDisplayed(children);
      return;
    }
    setStage("out");
    const t = setTimeout(() => {
      setDisplayed(children);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      setStage("in");
      prevPath.current = location.pathname;
    }, 220);
    return () => clearTimeout(t);
  }, [location.pathname, children]);

  return (
    <div
      key={prevPath.current}
      className={cn(
        "transition-all duration-300 ease-out will-change-transform",
        stage === "in"
          ? "opacity-100 translate-y-0 blur-0"
          : "opacity-0 translate-y-4 blur-[2px]"
      )}
    >
      {displayed}
    </div>
  );
};
