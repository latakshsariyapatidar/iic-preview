import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden bg-hero">
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        width={1920}
        height={1280}
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-multiply"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background pointer-events-none" />

      <div className="container relative z-10 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-8 space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur border border-border text-sm font-medium">
            <Sparkles className="w-4 h-4 text-primary" />
            Institute Innovation Council · IIT Dharwad
          </div>

          <h1 className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-[1.05] tracking-tight">
            Igniting <span className="text-gradient">Innovation</span> at <br className="hidden md:block" />
            IIT Dharwad
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            Empowering students to build, innovate, and launch startups — through hackathons,
            mentorship, and an ecosystem designed for bold ideas.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="group">
              <a href="#events">
                Explore Events
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#join">Join IIC</a>
            </Button>
          </div>
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col gap-4 animate-slide-in-right">
          {[
            { k: "50+", v: "Events Hosted" },
            { k: "20+", v: "Startups Supported" },
            { k: "2K+", v: "Students Impacted" },
          ].map((s) => (
            <div key={s.v} className="rounded-2xl bg-card/80 backdrop-blur border border-border p-6 shadow-soft hover-lift">
              <div className="text-4xl font-display font-bold text-gradient">{s.k}</div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
