import { useState } from "react";
import { Mail, MapPin, Send, Linkedin, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(1, "Message is required").max(1000),
});

export const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! We'll get back within 48 hours.");
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
    }, 700);
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-card/40">
      <div className="container grid lg:grid-cols-2 gap-10">
        <div>
          <div className="text-xs font-medium text-primary uppercase tracking-widest mb-3">
            Get in Touch
          </div>
          <h2 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
            Let's build <span className="text-gradient">together</span>.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg mb-8">
            Got an idea, partnership proposal, or just want to say hi? Drop us a message.
          </p>

          <div className="space-y-5">
            <a href="mailto:iic@iitdh.ac.in" className="flex items-center gap-4 group">
              <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center group-hover:bg-foreground group-hover:text-background transition-smooth">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Email</div>
                <div className="font-medium">iic@iitdh.ac.in</div>
              </div>
            </a>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Campus</div>
                <div className="font-medium">IIT Dharwad, Karnataka 580011</div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label="social"
                  className="w-11 h-11 rounded-xl bg-background border border-border flex items-center justify-center hover:bg-foreground hover:text-background transition-smooth"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <form
          onSubmit={onSubmit}
          className="rounded-3xl border border-border bg-background p-8 space-y-5"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              maxLength={100}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@iitdh.ac.in"
              maxLength={255}
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="Tell us about your idea or query..."
              rows={5}
              maxLength={1000}
              className="mt-1.5 resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending..." : (<>Send Message <Send className="w-4 h-4 ml-1" /></>)}
          </Button>
        </form>
      </div>
    </section>
  );
};
