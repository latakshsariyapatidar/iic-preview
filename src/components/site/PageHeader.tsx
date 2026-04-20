import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-hero">
      <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/20 to-background pointer-events-none" />
      <div className="container relative">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6 font-medium">
          <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{eyebrow ?? "Page"}</span>
        </nav>
        {eyebrow && (
          <div className="text-sm font-medium text-primary uppercase tracking-widest mb-4">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display font-bold text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};
