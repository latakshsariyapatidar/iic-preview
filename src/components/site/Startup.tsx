import { Lightbulb, MessageSquare, Wrench, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const steps = [
  { icon: Lightbulb, title: "Submit Your Idea", desc: "Pitch your concept in a short application — no fancy decks needed." },
  { icon: MessageSquare, title: "Get Mentorship", desc: "Pair up with industry mentors and faculty for weekly 1:1 guidance." },
  { icon: Wrench, title: "Build Prototypes", desc: "Access our lab, credits, and a community to ship your MVP." },
];

export const Startup = () => {
  return (
    <section id="join" className="py-16 md:py-20">
      <div className="container">
        <div className="rounded-[2rem] border border-border bg-card p-6 md:p-12 relative overflow-hidden">
          <div className="relative grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
                Startup Support
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
                From idea to <span className="text-gradient">launch</span>.
              </h2>
              <p className="text-muted-foreground text-base md:text-lg mb-6">
                Have a startup idea brewing? We'll help you validate it, build it, and put it in
                front of users — fast.
              </p>
              <Button size="lg" className="group rounded-full">
                Submit Your Idea
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>

            <div className="lg:col-span-7 space-y-3">
              {steps.map((s, i) => (
                <div
                  key={s.title}
                  className="flex gap-4 items-start rounded-2xl border border-border bg-background p-4 hover-lift"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-primary text-primary-foreground flex items-center justify-center">
                    <s.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-xs font-mono text-muted-foreground">0{i + 1}</span>
                      <h3 className="font-display font-semibold text-lg">{s.title}</h3>
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
