import { useState } from "react";
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
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                II
              </span>
              IIC IIT Dharwad
            </div>
            <p className="text-background/70 max-w-md mb-6">
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
                className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
              />
              <Button type="submit" variant="default">Subscribe</Button>
            </form>
          </div>

          <div className="md:col-span-2">
            <div className="font-display font-semibold mb-4">Explore</div>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#about" className="hover:text-background transition-smooth">About</a></li>
              <li><a href="#events" className="hover:text-background transition-smooth">Events</a></li>
              <li><a href="#team" className="hover:text-background transition-smooth">Team</a></li>
              <li><a href="#gallery" className="hover:text-background transition-smooth">Gallery</a></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="font-display font-semibold mb-4">Resources</div>
            <ul className="space-y-2 text-sm text-background/70">
              <li><a href="#join" className="hover:text-background transition-smooth">Submit Idea</a></li>
              <li><a href="#contact" className="hover:text-background transition-smooth">Contact</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Mentorship</a></li>
              <li><a href="#" className="hover:text-background transition-smooth">Press</a></li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="font-display font-semibold mb-4">Connect</div>
            <div className="flex gap-3">
              {[Linkedin, Instagram, Twitter, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-10 h-10 rounded-xl bg-background/10 border border-background/20 flex items-center justify-center hover:bg-background hover:text-foreground transition-smooth"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-background/15 flex flex-col md:flex-row justify-between gap-4 text-sm text-background/60">
          <div>© {new Date().getFullYear()} Institute Innovation Council, IIT Dharwad. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-smooth">Privacy</a>
            <a href="#" className="hover:text-background transition-smooth">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
