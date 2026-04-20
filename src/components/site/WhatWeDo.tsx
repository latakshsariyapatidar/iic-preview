import { Code2, GraduationCap, Rocket, Users } from "lucide-react";

const items = [
  {
    icon: Code2,
    title: "Hackathons & Competitions",
    desc: "Intense build sprints where students ship working prototypes in 24–48 hours.",
  },
  {
    icon: GraduationCap,
    title: "Workshops & Seminars",
    desc: "Hands-on sessions on product, design, AI, fundraising and going to market.",
  },
  {
    icon: Rocket,
    title: "Startup Mentorship",
    desc: "1:1 guidance from founders, VCs and faculty — from idea to first customer.",
  },
  {
    icon: Users,
    title: "Networking & Industry Connect",
    desc: "Meet builders, investors and alumni shaping India's innovation ecosystem.",
  },
];

export const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-24 md:py-32 bg-card/40">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            What We Do
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            Programs built for <span className="text-gradient">builders</span>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative rounded-3xl border border-border bg-background p-7 hover-lift overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-gradient-to-br from-primary/15 to-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-smooth" />
              <div className="relative">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center mb-5">
                  <it.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-semibold text-xl mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
