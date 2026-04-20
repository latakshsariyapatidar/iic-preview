import { Linkedin } from "lucide-react";

const team = [
  { name: "Dr. Aravind Rao", role: "Faculty Convener", initials: "AR" },
  { name: "Priya Sharma", role: "Student President", initials: "PS" },
  { name: "Rohan Mehta", role: "VP Operations", initials: "RM" },
  { name: "Anjali Kumar", role: "Head of Events", initials: "AK" },
  { name: "Karthik Nair", role: "Head of Tech", initials: "KN" },
  { name: "Sneha Reddy", role: "Marketing Lead", initials: "SR" },
  { name: "Vikram Singh", role: "Industry Relations", initials: "VS" },
  { name: "Meera Iyer", role: "Design Lead", initials: "MI" },
];

export const Team = () => {
  return (
    <section id="team" className="py-24 md:py-32 bg-card/40">
      <div className="container">
        <div className="max-w-2xl mb-16">
          <div className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            The Team
          </div>
          <h2 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
            People behind the <span className="text-gradient">momentum</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {team.map((m) => (
            <div
              key={m.name}
              className="group rounded-3xl border border-border bg-background p-6 text-center hover-lift"
            >
              <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-display font-bold text-2xl mb-4 transition-smooth group-hover:scale-105">
                {m.initials}
              </div>
              <h3 className="font-display font-semibold text-lg">{m.name}</h3>
              <p className="text-sm text-muted-foreground mb-3">{m.role}</p>
              <a
                href="#"
                aria-label={`${m.name} on LinkedIn`}
                className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:bg-foreground hover:text-background transition-smooth"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
