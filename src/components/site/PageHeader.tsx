import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
}

export const PageHeader = ({ eyebrow, title, description }: PageHeaderProps) => {
  return (
    <section className="relative pt-28 pb-10 md:pt-32 md:pb-14 overflow-hidden bg-background border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-30 [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      <div className="container relative">
        <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-5 font-medium">
          <Link to="/" className="hover:text-foreground transition-smooth">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-foreground">{eyebrow ?? "Page"}</span>
        </nav>
        {eyebrow && (
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            {eyebrow}
          </div>
        )}
        <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-4xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};
