import { useState, useEffect, useRef } from "react";
import { Linkedin } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  initials: string;
  imageUrl?: string;
  linkedIn: string | null;
}

const TeamCard = ({ m }: { m: TeamMember }) => {
  return (
    <div className="group relative w-full aspect-[3/4] rounded-3xl overflow-hidden bg-secondary border border-border transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
      {m.imageUrl ? (
        <img 
          src={m.imageUrl}
          alt={m.name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-secondary to-background">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center font-display font-bold text-3xl text-primary mb-4">
            {m.initials}
          </div>
        </div>
      )}

      {/* Glassmorphism Info Overlay */}
      <div className="absolute inset-x-2 bottom-2 rounded-2xl bg-background/60 backdrop-blur-md border border-white/10 p-4 transition-transform duration-300">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-display font-semibold text-lg leading-tight">{m.name}</h3>
            <p className="text-xs text-primary font-medium mt-1">{m.role}</p>
          </div>
          {m.linkedIn && (
            <a
              href={m.linkedIn}
              target="_blank"
              rel="noreferrer"
              aria-label={`${m.name} on LinkedIn`}
              className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-foreground text-background hover:bg-primary hover:text-primary-foreground transition-smooth flex-shrink-0"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export const Team = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/team")
      .then((res) => res.json())
      .then((data) => {
        setTeam(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch team:", err);
        setLoading(false);
      });
  }, []);

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

        {loading ? (
          <div className="text-center py-10">Loading team...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {team.map((m) => (
              <TeamCard key={m.id} m={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
