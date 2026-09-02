import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const filters = ["All", "Summit", "Hackathon", "Challenge"];

export const Events = () => {
  const [filter, setFilter] = useState("All");
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  const list = filter === "All" ? events : events.filter((e) => e.category === filter);

  return (
    <section id="events" className="py-16 md:py-20">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
              Flagship Events
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
              Events that <span className="text-gradient">define</span> the year.
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-smooth ${
                  filter === f
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-transparent border-border text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading events...</div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {list.map((e) => (
              <article
                key={e.title}
                className="group rounded-3xl overflow-hidden border border-border bg-card hover-lift"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={e.imageUrl}
                    alt={e.title}
                    loading="lazy"
                    width={1024}
                    height={768}
                    className="w-full h-full object-cover transition-smooth group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-background/90 backdrop-blur text-xs font-medium border border-border">
                    {e.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-xl mb-2">{e.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{e.description}</p>
                  <Button variant="ghost" size="sm" className="px-0 hover:bg-transparent group/btn">
                    Learn More
                    <ArrowUpRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
