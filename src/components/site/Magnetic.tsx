import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagneticProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}

/**
 * Magnetic wrapper — pulls the child toward the cursor on hover.
 * Apply to buttons, links, icons. Reverts smoothly on leave.
 */
export const Magnetic = ({
  children,
  strength = 0.35,
  className,
  ...rest
}: MagneticProps) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0,0)";
    };
    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={cn("inline-block transition-transform duration-300 ease-out will-change-transform", className)}
      {...rest}
    >
      {children}
    </span>
  );
};
