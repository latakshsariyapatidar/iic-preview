import { useState } from "react";
import { Link } from "react-router-dom";
import { Linkedin, Instagram, Twitter, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { z } from "zod";

const emailSchema = z.string().trim().email().max(255);

export const Footer = () => {
  const [email, setEmail] = useState("");

  const subscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = emailSchema.safeParse(email);
    if (!parsed.success) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Look out for our next newsletter.");
    setEmail("");
  };

  return (
    <footer className="bg-card border-t border-border text-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-3">
              <span className="w-9 h-9 rounded-xl bg-background border border-border flex items-center justify-center text-sm">
                II
              </span>
              IIC IIT Dharwad
            </div>
            <p className="text-muted-foreground max-w-md mb-5">
              The Institute Innovation Council — building India's next generation of founders,
              one student at a time.
            </p>
            <form onSubmit={subscribe} className="flex gap-2 max-w-md">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Subscribe to newsletter"
                maxLength={255}
                className="bg-background border-border"
              />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="font-display font-semibold mb-3">Explore</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-smooth">About</Link></li>
              <li><Link to="/events" className="hover:text-foreground transition-smooth">Events</Link></li>
              <li><Link to="/team" className="hover:text-foreground transition-smooth">Team</Link></li>
              <li><Link to="/gallery" className="hover:text-foreground transition-smooth">Gallery</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-display font-semibold mb-3">Resources</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/startup" className="hover:text-foreground transition-smooth">Submit Idea</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-smooth">Contact</Link></li>
              <li><Link to="/what-we-do" className="hover:text-foreground transition-smooth">Programs</Link></li>
              <li><a href="#" className="hover:text-foreground transition-smooth">Press</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-display font-semibold mb-3">Connect</div>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-10 h-10 rounded-xl bg-background border border-border flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-3 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Institute Innovation Council, IIT Dharwad. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-smooth">Privacy</a>
            <a href="#" className="hover:text-foreground transition-smooth">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
