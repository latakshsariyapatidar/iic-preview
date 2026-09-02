import { useEffect, useState } from "react";
import { format } from "date-fns";
import { Check, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { authenticatedFetch } from "@/lib/api";

type Enquiry = {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export const EnquiriesManager = () => {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchEnquiries = async () => {
    try {
      const res = await authenticatedFetch("/enquiries");
      if (!res.ok) throw new Error("Failed to fetch enquiries");
      const data = await res.json();
      setEnquiries(data);
    } catch (error) {
      toast.error("Could not load enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const toggleRead = async (id: number, currentStatus: boolean) => {
    try {
      const res = await authenticatedFetch(`/enquiries/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isRead: !currentStatus }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, isRead: !currentStatus } : e));
      toast.success(currentStatus ? "Marked as unread" : "Marked as read");
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-display font-semibold">Contact Enquiries</h2>
      </div>

      {enquiries.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground border border-dashed border-border rounded-xl">
          No enquiries found.
        </div>
      ) : (
        <div className="space-y-4">
          {enquiries.map((enquiry) => (
            <div 
              key={enquiry.id} 
              className={`p-5 rounded-xl border transition-colors ${enquiry.isRead ? 'border-border bg-card' : 'border-primary/50 bg-primary/5'}`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{enquiry.name}</h3>
                    {!enquiry.isRead && (
                      <span className="text-xs font-semibold bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                        NEW
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5" />
                    <a href={`mailto:${enquiry.email}`} className="hover:text-primary transition-colors">{enquiry.email}</a>
                    <span className="text-border">•</span>
                    <span>{format(new Date(enquiry.createdAt), "MMM d, yyyy h:mm a")}</span>
                  </div>
                  <p className="pt-3 text-sm whitespace-pre-wrap">{enquiry.message}</p>
                </div>
                
                <div className="shrink-0 flex items-start">
                  <Button 
                    variant={enquiry.isRead ? "outline" : "default"} 
                    size="sm"
                    onClick={() => toggleRead(enquiry.id, enquiry.isRead)}
                  >
                    {enquiry.isRead ? "Mark Unread" : (
                      <><Check className="w-4 h-4 mr-1" /> Mark Read</>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
