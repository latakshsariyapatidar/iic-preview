import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/site/Magnetic";
import iicLogo from "./iic-logo.png";

const links = [
  { to: "/about", label: "About" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/events", label: "Events" },
  { to: "/team", label: "Team" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;
  const [indicator, setIndicator] = useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const positionIndicator = (path: string) => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-path="${path}"]`);
    if (!el) return setIndicator((i) => ({ ...i, opacity: 0 }));
    const lr = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - lr.left, width: r.width, opacity: 1 });
  };

  useEffect(() => {
    positionIndicator(activePath);
    const onResize = () => positionIndicator(activePath);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activePath]);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-smooth pointer-events-none",
          scrolled ? "pt-3" : "pt-4"
        )}
      >
        <div className="container pointer-events-auto">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 transition-smooth",
              "rounded-full border border-border pl-3 pr-2 py-2",
              // OPAQUE — no see-through
              "bg-card shadow-card"
            )}
          >
            {/* Brand */}
            <Link to="/" className="flex items-center gap-2.5 font-display font-bold pl-1">
              <span className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center overflow-hidden">
                <img src={iicLogo} alt="IIC Logo" />
              </span>
              <span className="hidden sm:inline text-sm md:text-base">
                IIC<span className="text-muted-foreground font-normal"> · IIT Dharwad</span>
              </span>
            </Link>

            {/* Desktop links with sliding pill + magnetic labels */}
            <ul
              ref={listRef}
              className="hidden lg:flex items-center gap-1 relative"
              onMouseLeave={() => positionIndicator(activePath)}
            >
              <span
                aria-hidden
                className="absolute top-0 h-full rounded-full bg-secondary transition-all duration-300 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
              />
              {links.map((l) => {
                const isActive = l.to === activePath;
                return (
                  <li key={l.to} className="relative">
                    <Link
                      to={l.to}
                      data-path={l.to}
                      onMouseEnter={(e) => {
                        const list = listRef.current;
                        if (!list) return;
                        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        const lr = list.getBoundingClientRect();
                        setIndicator({ left: r.left - lr.left, width: r.width, opacity: 1 });
                      }}
                      className={cn(
                        "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors block",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Magnetic strength={0.4}>{l.label}</Magnetic>
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* CTA + mobile trigger */}
            <div className="flex items-center gap-2">
              <Link
                to="https://iic.iitdh.ac.in/esummit/"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-primary text-primary-foreground pl-4 pr-3 py-2 text-sm font-semibold hover:bg-primary/90 transition-smooth group"
              >
                <Magnetic strength={0.3}>
                  <span className="inline-flex items-center gap-1.5">
                    Esummit - 26
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Magnetic>
              </Link>
              <button
                className="lg:hidden w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-smooth"
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <span className="relative w-5 h-5">
                  <Menu
                    className={cn(
                      "w-5 h-5 absolute inset-0 transition-all duration-300",
                      open ? "opacity-0 rotate-90 scale-50" : "opacity-100 rotate-0 scale-100"
                    )}
                  />
                  <X
                    className={cn(
                      "w-5 h-5 absolute inset-0 transition-all duration-300",
                      open ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-50"
                    )}
                  />
                </span>
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile fullscreen overlay — fully opaque */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
        aria-hidden={!open}
      >
        <div className="absolute inset-0 bg-background" />
        <div
          className={cn(
            "relative h-full flex flex-col px-6 pt-28 pb-10 transition-opacity duration-300",
            open ? "opacity-100 delay-150" : "opacity-0"
          )}
        >
          <ul className="flex-1 flex flex-col gap-1">
            {links.map((l, i) => (
              <li
                key={l.to}
                className={cn(
                  "border-b border-border/60 transition-all duration-500",
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: open ? `${200 + i * 60}ms` : "0ms" }}
              >
                <Link
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 group"
                >
                  <span className="font-display text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {l.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">0{i + 1}</span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-6 transition-all duration-500",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: open ? `${200 + links.length * 60}ms` : "0ms" }}
          >
            <Link
              to="/startup"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-4 text-base font-semibold hover:bg-primary/90 transition-smooth"
            >
              Esummit - 26
              <ArrowUpRight className="w-5 h-5" />
            </Link>
            <p className="mt-5 text-xs text-muted-foreground text-center">
              Institute Innovation Council · IIT Dharwad
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
