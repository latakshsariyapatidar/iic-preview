import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/site/Magnetic";

export const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center pt-28 pb-16 overflow-hidden bg-background"
    >
      {/* subtle grid background instead of gradients */}
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container relative z-10 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-8 space-y-7 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            Institute Innovation Council · IIT Dharwad
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.02] tracking-tight">
            Igniting <span className="text-brand">Innovation</span>
            <br className="hidden md:block" /> at <span className="text-gradient">IIT Dharwad</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-xl leading-relaxed">
            Empowering students to build, innovate and launch startups — through hackathons,
            mentorship and an ecosystem designed for bold ideas.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="group rounded-full">
              <Link to="/events">
                <Magnetic strength={0.3}>
                  <span className="inline-flex items-center">
                    Explore Events
                    <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </span>
                </Magnetic>
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full">
              <Link to="/startup">
                <Magnetic strength={0.3}>Join IIC</Magnetic>
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col gap-3 animate-slide-in-right">
          {[
            { k: "50+", v: "Events Hosted" },
            { k: "20+", v: "Startups Supported" },
            { k: "2K+", v: "Students Impacted" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-2xl bg-card border border-border p-5 hover-lift"
            >
              <div className="text-3xl font-display font-bold text-brand">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
