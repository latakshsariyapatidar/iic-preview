import { useState, useEffect } from "react";
import { authenticatedFetch, API_BASE } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const GalleryManager = () => {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      const data = await res.json();
      setImages(data);
    } catch (err) {
      toast.error("Failed to fetch gallery");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageFile) return toast.error("Please select an image");

    const formData = new FormData();
    formData.append("image", imageFile);
    if (caption.trim()) formData.append("caption", caption.trim());

    try {
      const res = await authenticatedFetch(`/gallery`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("Image uploaded");
        setOpen(false);
        setImageFile(null);
        setCaption("");
        fetchGallery();
      } else {
        const error = await res.json();
        toast.error(error.error || "Failed to upload image");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this image?")) return;
    
    try {
      const res = await authenticatedFetch(`/gallery/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Image deleted");
        fetchGallery();
      } else {
        toast.error("Failed to delete");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Gallery</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Upload New Image</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload Gallery Image</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Image</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} required />
              </div>
              <div className="space-y-2">
                <Label>Caption (Optional)</Label>
                <Input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Add a caption..." />
              </div>
              <Button type="submit" className="w-full">Upload</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-xl overflow-hidden border border-border aspect-square">
              <img src={img.imageUrl} alt="Gallery item" className="w-full h-full object-cover" />
              {img.caption && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 pt-6">
                  <p className="text-white text-sm font-medium truncate">{img.caption}</p>
                </div>
              )}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Button variant="destructive" size="sm" onClick={() => handleDelete(img.id)}>Delete</Button>
              </div>
            </div>
          ))}
          {images.length === 0 && (
            <div className="col-span-full text-center text-muted-foreground py-10">No images found.</div>
          )}
        </div>
      )}
    </div>
  );
};
