import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  /** When true, blue + gold fill colors animate in via CSS variables `--fill` (0..1). */
  animated?: boolean;
  /** 0..1 — current fill progress when `animated`. */
  progress?: number;
}

/**
 * IIC isometric cube logo, hand-modeled to match the uploaded mark.
 * Colors driven by CSS so the loader can animate fill from greyscale -> brand.
 */
export const Logo = ({ className, animated = false, progress = 1 }: LogoProps) => {
  // greyscale base + colored layer revealed via clipPath height
  const blue = "hsl(199 78% 43%)";   // #188EC5
  const gold = "hsl(34 78% 50%)";    // #E0961D
  const grey = "hsl(220 6% 38%)";

  return (
    <svg
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("block", className)}
      aria-label="IIC Logo"
      role="img"
      style={animated ? ({ ["--p" as any]: progress } as React.CSSProperties) : undefined}
    >
      <defs>
        {/* Reveal mask grows from bottom to top based on --p (0..1) */}
        <clipPath id="iic-fill-clip">
          <rect
            x="0"
            y={animated ? `calc(200px - 200px * var(--p, 1))` : "0"}
            width="200"
            height={animated ? `calc(200px * var(--p, 1))` : "200"}
            style={{
              transition: "y 0.05s linear, height 0.05s linear",
            }}
          />
        </clipPath>
      </defs>

      {/* ---- GREYSCALE BASE ---- */}
      <g fill="none" stroke={grey} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
        {/* Left face outline */}
        <path d="M40 65 L100 35 L100 110 L40 140 Z" />
        {/* Right face outline */}
        <path d="M100 35 L160 65 L160 140 L100 110 Z" />
        {/* Bottom face outline */}
        <path d="M40 140 L100 110 L160 140 L100 170 Z" />
      </g>
      <g fill={grey} opacity="0.6">
        <path d="M62 95 L75 88 L82 105 L69 112 Z" />
        <path d="M118 88 L138 78 L138 95 L118 105 Z" />
        <path d="M105 130 L132 145 L118 152 L91 137 Z" />
      </g>

      {/* ---- COLORED OVERLAY (clipped) ---- */}
      <g clipPath="url(#iic-fill-clip)">
        <g fill="none" stroke={blue} strokeWidth="10" strokeLinejoin="round" strokeLinecap="round">
          <path d="M40 65 L100 35 L100 110 L40 140 Z" />
          <path d="M100 35 L160 65 L160 140 L100 110 Z" />
          <path d="M40 140 L100 110 L160 140 L100 170 Z" />
        </g>
        <g fill={gold}>
          <path d="M62 95 L75 88 L82 105 L69 112 Z" />
          <path d="M118 88 L138 78 L138 95 L118 105 Z" />
          <path d="M105 130 L132 145 L118 152 L91 137 Z" />
        </g>
      </g>
    </svg>
  );
};
