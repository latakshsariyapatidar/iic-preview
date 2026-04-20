import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 50, suffix: "+", label: "Events Hosted" },
  { value: 20, suffix: "+", label: "Startups Supported" },
  { value: 2000, suffix: "+", label: "Students Impacted" },
  { value: 30, suffix: "+", label: "Industry Mentors" },
];

const Counter = ({ to, suffix }: { to: number; suffix: string }) => {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            const duration = 1500;
            const start = performance.now();
            const tick = (t: number) => {
              const p = Math.min((t - start) / duration, 1);
              setN(Math.floor(to * (1 - Math.pow(1 - p, 3))));
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
          }
        });
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return (
    <span ref={ref}>
      {n.toLocaleString()}
      {suffix}
    </span>
  );
};

export const About = () => {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="container">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
              About IIC
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
              Where bold ideas become <span className="text-gradient">real ventures</span>.
            </h2>
          </div>
          <div className="lg:col-span-7 space-y-5">
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The Institute Innovation Council (IIC) at IIT Dharwad is a student-driven body that
              cultivates a culture of innovation and entrepreneurship across campus. We connect
              curious minds with mentors, capital, and a community that ships.
            </p>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { t: "Innovate", d: "Promote ideation and prototyping across disciplines." },
                { t: "Educate", d: "Run workshops on entrepreneurship and product building." },
                { t: "Accelerate", d: "Support student startups from MVP to launch." },
              ].map((m) => (
                <div key={m.t} className="rounded-2xl border border-border bg-card p-4 hover-lift">
                  <div className="font-display font-semibold text-base mb-1">{m.t}</div>
                  <div className="text-sm text-muted-foreground">{m.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-5 md:p-6 text-center hover-lift"
            >
              <div className="font-display font-bold text-3xl md:text-4xl text-brand">
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
