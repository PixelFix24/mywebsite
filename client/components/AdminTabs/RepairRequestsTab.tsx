import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash2, CheckCircle, Clock } from "lucide-react";

interface RepairRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  service: string;
  message: string;
  status: "offen" | "bearbeitet" | "fertig";
  createdAt: string;
}

export default function RepairRequestsTab() {
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "offen" | "bearbeitet" | "fertig">("all");

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/admin/repair-requests");
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (err) {
      console.error("Fehler beim Laden der Anfragen:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: RepairRequest["status"]) => {
    try {
      const response = await fetch(`api/admin/repair-requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setRequests(
          requests.map((r) => (r.id === id ? { ...r, status } : r))
        );
      }
    } catch (err) {
      console.error("Fehler beim Aktualisieren:", err);
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Möchten Sie diese Anfrage wirklich löschen?")) return;

    try {
      const response = await fetch(`api/admin/repair-requests/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRequests(requests.filter((r) => r.id !== id));
      }
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  const filteredRequests = requests.filter((r) =>
    filter === "all" ? true : r.status === filter
  );

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Reparaturanfragen</h2>

        <div className="flex gap-2 flex-wrap">
          {["all", "offen", "bearbeitet", "fertig"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status as any)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status === "all"
                ? `Alle (${requests.length})`
                : `${status} (${requests.filter((r) => r.status === status).length})`}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Wird geladen...</div>
      ) : filteredRequests.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          Keine Anfragen gefunden
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Kontakt</th>
                <th className="px-4 py-3 text-left font-semibold">Gerät</th>
                <th className="px-4 py-3 text-left font-semibold">Service</th>
                <th className="px-4 py-3 text-left font-semibold">Status</th>
                <th className="px-4 py-3 text-left font-semibold">Datum</th>
                <th className="px-4 py-3 text-left font-semibold">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{request.name}</td>
                  <td className="px-4 py-3">
                    <div className="text-sm">
                      <p>{request.email}</p>
                      <p className="text-gray-600">{request.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{request.device}</td>
                  <td className="px-4 py-3">{request.service}</td>
                  <td className="px-4 py-3">
                    <select
                      value={request.status}
                      onChange={(e) =>
                        updateStatus(request.id, e.target.value as any)
                      }
                      className="px-2 py-1 rounded border text-sm"
                    >
                      <option value="offen">Offen</option>
                      <option value="bearbeitet">Bearbeitet</option>
                      <option value="fertig">Fertig</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">
                    {new Date(request.createdAt).toLocaleDateString("de-DE")}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          alert(`Nachricht:\n\n${request.message}`);
                        }}
                        className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Anschauen
                      </button>
                      <button
                        onClick={() => deleteRequest(request.id)}
                        className="px-2 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        Löschen
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
