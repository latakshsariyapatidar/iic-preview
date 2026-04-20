import { useRef } from "react";
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

const TeamCard = ({ m }: { m: (typeof team)[number] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const rx = (0.5 - y) * 10;
    const ry = (x - 0.5) * 10;
    el.style.setProperty("--rx", `${rx}deg`);
    el.style.setProperty("--ry", `${ry}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", `0deg`);
    el.style.setProperty("--ry", `0deg`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="group relative rounded-3xl border border-border bg-card p-6 text-center transition-transform duration-300 ease-out [transform:perspective(900px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))] will-change-transform overflow-hidden"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* spotlight follows cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(240px circle at var(--mx,50%) var(--my,50%), hsl(var(--primary) / 0.18), transparent 60%)`,
        }}
      />

      <div className="relative mx-auto w-24 h-24 md:w-28 md:h-28 rounded-full bg-secondary text-foreground flex items-center justify-center font-display font-bold text-2xl mb-4 transition-transform duration-300 group-hover:scale-105 ring-1 ring-border">
        {m.initials}
        {/* corner accent dot */}
        <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-primary ring-2 ring-card transition-transform duration-300 group-hover:scale-125" />
      </div>

      {/* role chip slides in on hover */}
      <div className="overflow-hidden h-5 mb-1">
        <div className="text-[10px] font-mono uppercase tracking-widest text-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          {m.role}
        </div>
      </div>

      <h3 className="font-display font-semibold text-lg">{m.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{m.role}</p>
      <a
        href="#"
        aria-label={`${m.name} on LinkedIn`}
        className="inline-flex w-9 h-9 items-center justify-center rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth"
      >
        <Linkedin className="w-4 h-4" />
      </a>
    </div>
  );
};

export const Team = () => {
  return (
    <section id="team" className="py-16 md:py-20 bg-background">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            The Team
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            People behind the <span className="text-gradient">momentum</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {team.map((m) => (
            <TeamCard key={m.name} m={m} />
          ))}
        </div>
      </div>
    </section>
  );
};
