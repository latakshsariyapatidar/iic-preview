import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/event-hackathon.jpg";
import g6 from "@/assets/event-esummit.jpg";

const images = [g1, g2, g3, g4, g5, g6];

export const Gallery = () => {
  return (
    <section id="gallery" className="py-16 md:py-20 bg-card/40">
      <div className="container">
        <div className="max-w-2xl mb-10">
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Highlights
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Moments from the <span className="text-gradient">journey</span>.
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {images.map((src, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-2xl ${
                i === 0 || i === 4 ? "row-span-2 aspect-square md:aspect-[3/4]" : "aspect-square"
              }`}
            >
              <img
                src={src}
                alt={`Event highlight ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
