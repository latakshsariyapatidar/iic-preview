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
    <section id="what-we-do" className="py-16 md:py-20 bg-card/40">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            What We Do
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Programs built for <span className="text-gradient">builders</span>.
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((it, i) => (
            <div
              key={it.title}
              className="group relative rounded-3xl border border-border bg-background p-6 hover-lift overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="absolute inset-x-0 bottom-0 h-0 bg-primary/10 group-hover:h-full transition-all duration-500 ease-out -z-0" />
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center mb-4 transition-transform duration-300 group-hover:rotate-[-6deg] group-hover:scale-110">
                  <it.icon className="w-5 h-5" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{it.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
