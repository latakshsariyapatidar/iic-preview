import { useState, useEffect } from "react";
import { API_BASE } from "@/lib/api";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const AdminPage = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("adminToken"));
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
        toast.success("Logged in successfully");
      } else {
        toast.error(data.error || "Login failed");
      }
    } catch (err) {
      toast.error("Failed to connect to the server");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
    toast("Logged out");
  };

  if (token) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-12">
        <div className="container max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="font-display font-bold text-3xl">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>Logout</Button>
          </div>
          <AdminDashboard />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-card/40 px-4">
      <div className="w-full max-w-md p-8 rounded-3xl border border-border bg-card shadow-sm">
        <div className="mb-8 text-center">
          <div className="w-12 h-12 bg-primary rounded-xl mx-auto mb-4 flex items-center justify-center">
            <div className="w-6 h-6 border-4 border-primary-foreground border-t-transparent rounded-full" />
          </div>
          <h1 className="font-display font-bold text-2xl">Admin Access</h1>
          <p className="text-sm text-muted-foreground mt-2">Login to manage website content</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Admin Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
