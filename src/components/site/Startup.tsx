import { Lightbulb, MessageSquare, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Lightbulb, title: "Submit Your Idea", desc: "Pitch your concept in a short application — no fancy decks needed." },
  { icon: MessageSquare, title: "Get Mentorship", desc: "Pair up with industry mentors and faculty for weekly 1:1 guidance." },
  { icon: Wrench, title: "Build Prototypes", desc: "Access our lab, credits, and a community to ship your MVP." },
];

export const Startup = () => {
  return (
    <section id="join" className="py-24 md:py-32">
      <div className="container">
        <div className="rounded-[2rem] border border-border bg-gradient-to-br from-card to-secondary/40 p-8 md:p-16 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
                Startup Support
              </div>
              <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                From idea to <span className="text-gradient">launch</span>.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                Have a startup idea brewing? We'll help you validate it, build it, and put it in
                front of users — fast.
              </p>
              <Button size="lg" className="group">
                Submit Your Idea
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-5 items-start rounded-2xl border border-border bg-background/80 backdrop-blur p-5 hover-lift"
                >
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                      <h3 className="font-display font-semibold text-xl">{s.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
