import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, Settings, MessageSquare, Mail, Ticket } from "lucide-react";
import RepairRequestsTab from "@/components/AdminTabs/RepairRequestsTab";
import CMSEditorTab from "@/components/AdminTabs/CMSEditorTab";
import EmailResponseTab from "@/components/AdminTabs/EmailResponseTab";
import TicketManagementTab from "@/components/AdminTabs/TicketManagementTab";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"requests" | "cms" | "email" | "tickets">("tickets");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Prüfe ob Admin angemeldet ist
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch("api/admin/check", {
        method: "GET",
      });
      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        navigate("/admin");
      }
    } catch (err) {
      navigate("/admin");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("api/admin/logout", { method: "POST" });
    navigate("/admin");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-600">Wird geladen...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">PixelFix24</h1>
            <p className="text-sm text-gray-600">Admin-Dashboard</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("requests")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "requests"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <MessageSquare size={20} />
            Reparaturanfragen
          </button>
          <button
            onClick={() => setActiveTab("cms")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "cms"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Settings size={20} />
            Website bearbeiten
          </button>
          <button
            onClick={() => setActiveTab("email")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
              activeTab === "email"
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Mail size={20} />
            Email-Antworten
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === "requests" && <RepairRequestsTab />}
          {activeTab === "cms" && <CMSEditorTab />}
          {activeTab === "email" && <EmailResponseTab />}
        </div>
      </div>
    </div>
  );
}
