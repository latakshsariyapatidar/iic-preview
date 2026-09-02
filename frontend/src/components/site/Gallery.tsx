import { useState, useEffect } from "react";

type GalleryItem = {
  id: number;
  imageUrl: string;
  caption?: string | null;
};

export const Gallery = () => {
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/gallery")
      .then((res) => res.json())
      .then((data) => {
        setImages(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section id="gallery" className="py-16 md:py-20 bg-card/40">
      <div className="container">
        <div className="max-w-2xl mb-12">
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Highlights
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight">
            Moments from the <span className="text-gradient">journey</span>.
          </h2>
        </div>

        {loading ? (
          <div className="text-center py-10">Loading gallery...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {images.map((item, i) => (
              <div
                key={item.id}
                className={`group relative overflow-hidden rounded-3xl bg-secondary border border-border ${
                  i % 5 === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-square"
                }`}
              >
                <img
                  src={item.imageUrl}
                  alt={item.caption || `Event highlight ${i + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Permanent gradient for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform transition-transform duration-500 translate-y-2 group-hover:translate-y-0">
                    <p className="text-white font-display font-semibold text-lg md:text-xl lg:text-2xl leading-tight drop-shadow-md">
                      {item.caption}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
