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

      </div>
    </section>
  );
};
