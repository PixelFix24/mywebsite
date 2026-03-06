import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        navigate("/admin/dashboard");
      } else {
        setError("Falsches Passwort!");
      }
    } catch (err) {
      setError("Fehler beim Login. Bitte versuchen Sie es später erneut.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">PixelFix24</h1>
        <h2 className="text-xl font-semibold text-center text-gray-600 mb-8">
          Admin-Bereich
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Passwort
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Admin-Passwort eingeben"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="w-full"
            />
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {loading ? "Wird eingeloggt..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t text-center text-sm text-gray-500">
          <p>Geschützter Admin-Bereich</p>
        </div>
      </div>
    </div>
  );
}
