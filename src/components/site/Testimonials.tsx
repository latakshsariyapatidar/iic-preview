import { Quote } from "lucide-react";

const quotes = [
  {
    text: "IIC gave me the runway to turn a class project into a funded startup. The mentorship was unreal.",
    name: "Aditya R.",
    role: "Founder, BuildKart · Batch '23",
  },
  {
    text: "Best hackathon I've judged in years. The energy on campus was electric.",
    name: "Neha Kapoor",
    role: "Partner, Stellaris VC",
  },
  {
    text: "From a vague idea to a working prototype in 3 months — IIC mentors made it possible.",
    name: "Rahul T.",
    role: "Founder, MedSync · Batch '24",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Voices
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            What people <span className="text-gradient">say</span>.
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q) => (
            <figure
              key={q.name}
              className="rounded-3xl border border-border bg-card p-8 hover-lift relative"
            >
              <Quote className="w-8 h-8 text-primary/30 absolute top-6 right-6" />
              <blockquote className="text-lg leading-relaxed mb-6">"{q.text}"</blockquote>
              <figcaption>
                <div className="font-display font-semibold">{q.name}</div>
                <div className="text-sm text-muted-foreground">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
};
