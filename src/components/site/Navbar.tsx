import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#about", label: "About" },
  { href: "#what-we-do", label: "What We Do" },
  { href: "#events", label: "Events" },
  { href: "#team", label: "Team" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("about");
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

  // Scroll spy
  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Position pill indicator under active link
  const positionIndicator = (id: string) => {
    const list = listRef.current;
    if (!list) return;
    const el = list.querySelector<HTMLElement>(`[data-id="${id}"]`);
    if (!el) {
      setIndicator((i) => ({ ...i, opacity: 0 }));
      return;
    }
    const listRect = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - listRect.left, width: r.width, opacity: 1 });
  };

  useEffect(() => {
    positionIndicator(activeId);
    const onResize = () => positionIndicator(activeId);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [activeId]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-smooth pointer-events-none",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div className="container pointer-events-auto">
          <nav
            className={cn(
              "flex items-center justify-between gap-4 transition-smooth",
              "rounded-full border pl-4 pr-2 py-2",
              scrolled
                ? "bg-background/95 backdrop-blur-xl border-border shadow-card"
                : "bg-background/90 backdrop-blur-xl border-border shadow-soft"
            )}
          >
            {/* Brand */}
            <a href="#home" className="flex items-center gap-2.5 font-display font-bold pl-1">
              <span className="relative w-9 h-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-sm shadow-glow">
                <Sparkles className="w-4 h-4" />
                <span className="absolute inset-0 rounded-full ring-1 ring-primary-foreground/20" />
              </span>
              <span className="hidden sm:inline text-sm md:text-base">
                IIC<span className="text-muted-foreground font-normal"> · IIT Dharwad</span>
              </span>
            </a>

            {/* Desktop links with sliding pill */}
            <ul
              ref={listRef}
              className="hidden lg:flex items-center gap-1 relative"
              onMouseLeave={() => positionIndicator(activeId)}
            >
              <span
                aria-hidden
                className="absolute top-0 h-full rounded-full bg-foreground/[0.07] transition-all duration-300 ease-out"
                style={{
                  left: indicator.left,
                  width: indicator.width,
                  opacity: indicator.opacity,
                }}
              />
              {links.map((l) => {
                const id = l.href.slice(1);
                const isActive = id === activeId;
                return (
                  <li key={l.href} className="relative">
                    <a
                      href={l.href}
                      data-id={id}
                      onMouseEnter={(e) => {
                        const list = listRef.current;
                        if (!list) return;
                        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
                        const lr = list.getBoundingClientRect();
                        setIndicator({ left: r.left - lr.left, width: r.width, opacity: 1 });
                      }}
                      className={cn(
                        "relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                        isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {l.label}
                      {isActive && (
                        <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* CTA + mobile trigger */}
            <div className="flex items-center gap-2">
              <a
                href="#join"
                className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-foreground text-background pl-4 pr-3 py-2 text-sm font-medium hover:bg-foreground/90 transition-smooth group"
              >
                Join IIC
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <button
                className="lg:hidden w-10 h-10 rounded-full bg-foreground text-background flex items-center justify-center hover:bg-foreground/90 transition-smooth"
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

      {/* Mobile fullscreen overlay */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 transition-all duration-500",
          open ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!open}
      >
        {/* Backdrop circle reveal */}
        <div
          className={cn(
            "absolute top-0 right-0 bg-background transition-all duration-700 ease-out",
            open
              ? "w-[300vmax] h-[300vmax] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-100"
              : "w-0 h-0 translate-x-0 translate-y-0 rounded-full opacity-0"
          )}
          style={{ transformOrigin: "top right" }}
        />

        <div
          className={cn(
            "relative h-full flex flex-col px-6 pt-28 pb-10 transition-opacity duration-300",
            open ? "opacity-100 delay-200" : "opacity-0"
          )}
        >
          <ul className="flex-1 flex flex-col gap-2">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={cn(
                  "border-b border-border/60 transition-all duration-500",
                  open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
                style={{ transitionDelay: open ? `${250 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between py-5 group"
                >
                  <span className="font-display text-3xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {l.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground font-mono">
                      0{i + 1}
                    </span>
                    <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={cn(
              "mt-8 transition-all duration-500",
              open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
            style={{ transitionDelay: open ? `${250 + links.length * 60}ms` : "0ms" }}
          >
            <a
              href="#join"
              onClick={() => setOpen(false)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground text-background py-4 text-base font-medium hover:bg-foreground/90 transition-smooth"
            >
              Join IIC
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <p className="mt-6 text-xs text-muted-foreground text-center">
              Institute Innovation Council · IIT Dharwad
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
