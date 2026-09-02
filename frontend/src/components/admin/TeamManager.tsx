import { useState, useEffect } from "react";
import { authenticatedFetch, API_BASE } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const TeamManager = () => {
  const [team, setTeam] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [initials, setInitials] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const fetchTeam = async () => {
    try {
      const res = await fetch(`${API_BASE}/team`);
      const data = await res.json();
      setTeam(data);
    } catch (err) {
      toast.error("Failed to fetch team");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const resetForm = () => {
    setName("");
    setRole("");
    setInitials("");
    setLinkedIn("");
    setImageFile(null);
    setEditingId(null);
  };

  const handleOpenDialog = (member?: any) => {
    if (member) {
      setEditingId(member.id);
      setName(member.name);
      setRole(member.role);
      setInitials(member.initials);
      setLinkedIn(member.linkedIn || "");
      setImageFile(null);
    } else {
      resetForm();
    }
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("name", name);
    formData.append("role", role);
    formData.append("initials", initials);
    if (linkedIn) formData.append("linkedIn", linkedIn);
    if (imageFile) formData.append("image", imageFile);

    try {
      const url = editingId ? `/team/${editingId}` : `/team`;
      const method = editingId ? "PUT" : "POST";
      
      const res = await authenticatedFetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        toast.success(editingId ? "Team member updated" : "Team member added");
        setOpen(false);
        fetchTeam();
      } else {
        const error = await res.json();
        toast.error(error.error || "Operation failed");
      }
    } catch (err) {
      toast.error("An error occurred");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to remove this team member?")) return;
    
    try {
      const res = await authenticatedFetch(`/team/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Team member removed");
        fetchTeam();
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
        <h2 className="text-xl font-semibold">Team Members</h2>
        <Dialog open={open} onOpenChange={(val) => { setOpen(val); if (!val) resetForm(); }}>
          <DialogTrigger asChild>
            <Button onClick={() => handleOpenDialog()}>Add Team Member</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Member" : "Add Team Member"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Role</Label>
                <Input value={role} onChange={(e) => setRole(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label>Initials (e.g. JD)</Label>
                <Input value={initials} onChange={(e) => setInitials(e.target.value)} maxLength={3} required />
              </div>
              <div className="space-y-2">
                <Label>LinkedIn URL (Optional)</Label>
                <Input type="url" value={linkedIn} onChange={(e) => setLinkedIn(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Image {editingId && "(Leave blank to keep existing)"}</Label>
                <Input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
              </div>
              <Button type="submit" className="w-full">Save Member</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Initials</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {team.map((m) => (
              <TableRow key={m.id}>
                <TableCell>
                  {m.imageUrl ? (
                    <img src={m.imageUrl} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center font-bold text-xs">
                      {m.initials}
                    </div>
                  )}
                </TableCell>
                <TableCell className="font-medium">{m.name}</TableCell>
                <TableCell>{m.role}</TableCell>
                <TableCell className="space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenDialog(m)}>Edit</Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(m.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
            {team.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">No team members found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
