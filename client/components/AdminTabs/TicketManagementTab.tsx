import { useState, useEffect } from "react";
import { supabase, Ticket } from "@shared/supabase";
import { Button } from "@/components/ui/button";

export default function TicketManagementTab() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newPrice, setNewPrice] = useState("");
  const [newStatus, setNewStatus] = useState("");

  const statusOptions = [
    { value: "neu", label: "🆕 Neu" },
    { value: "in_reparatur", label: "🔧 In Reparatur" },
    { value: "warten_teile", label: "⏳ Warten auf Teile" },
    { value: "fertig", label: "✅ Fertig" },
    { value: "abgeholt", label: "📦 Abgeholt" },
  ];

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error("Error loading tickets:", error);
      alert("Fehler beim Laden der Tickets");
    } finally {
      setLoading(false);
    }
  };

  const updateTicket = async () => {
    if (!selectedTicket) return;

    try {
      const updateData: any = {};
      if (newStatus) updateData.status = newStatus;
      if (newPrice) updateData.price = parseFloat(newPrice);

      const { error } = await supabase
        .from("tickets")
        .update(updateData)
        .eq("id", selectedTicket.id);

      if (error) throw error;

      alert("✅ Ticket aktualisiert!");
      setNewStatus("");
      setNewPrice("");
      setSelectedTicket(null);
      loadTickets();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Fehler beim Aktualisieren");
    }
  };

  const deleteTicket = async (id: string) => {
    if (!confirm("Wirklich löschen?")) return;

    try {
      const { error } = await supabase.from("tickets").delete().eq("id", id);
      if (error) throw error;

      alert("✅ Ticket gelöscht!");
      loadTickets();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Fehler beim Löschen");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">🎫 Reparatur Tickets</h3>
        <Button onClick={loadTickets} disabled={loading}>
          {loading ? "Wird geladen..." : "Aktualisieren"}
        </Button>
      </div>

      {tickets.length === 0 ? (
        <p className="text-gray-600">Noch keine Tickets vorhanden</p>
      ) : (
        <div className="space-y-4">
          {/* Tickets List */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-bold">Alle Tickets:</h4>
              {tickets.map((ticket) => (
                <div
                  key={ticket.id}
                  onClick={() => {
                    setSelectedTicket(ticket);
                    setNewStatus(ticket.status);
                    setNewPrice(ticket.price?.toString() || "");
                  }}
                  className={`p-4 border rounded cursor-pointer transition ${
                    selectedTicket?.id === ticket.id
                      ? "bg-blue-100 border-blue-500"
                      : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-lg">{ticket.ticket_number}</p>
                      <p className="text-sm text-gray-600">{ticket.device} {ticket.model}</p>
                      <p className="text-xs text-gray-500 mt-1">{ticket.problem}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-bold ${
                      ticket.status === "neu" ? "bg-yellow-200" :
                      ticket.status === "in_reparatur" ? "bg-blue-200" :
                      ticket.status === "warten_teile" ? "bg-orange-200" :
                      ticket.status === "fertig" ? "bg-green-200" :
                      "bg-gray-200"
                    }`}>
                      {statusOptions.find(s => s.value === ticket.status)?.label}
                    </span>
                  </div>
                  {ticket.price && (
                    <p className="text-sm font-bold mt-2">💶 {ticket.price}€</p>
                  )}
                </div>
              ))}
            </div>

            {/* Edit Panel */}
            {selectedTicket && (
              <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                <div>
                  <h4 className="font-bold mb-2">Ticket Details:</h4>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nummer:</strong> {selectedTicket.ticket_number}</p>
                    <p><strong>Gerät:</strong> {selectedTicket.device} {selectedTicket.model}</p>
                    <p><strong>Problem:</strong> {selectedTicket.problem}</p>
                    <p><strong>Erstellt:</strong> {new Date(selectedTicket.created_at).toLocaleDateString('de-DE')}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Status ändern:</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 border rounded"
                  >
                    {statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">Reparaturpreis (€):</label>
                  <input
                    type="number"
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="z.B. 129"
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={updateTicket}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    ✅ Speichern
                  </Button>
                  <Button
                    onClick={() => deleteTicket(selectedTicket.id)}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    🗑️ Löschen
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mt-6 pt-6 border-t">
            {["neu", "in_reparatur", "warten_teile", "fertig", "abgeholt"].map(status => {
              const count = tickets.filter(t => t.status === status).length;
              const label = statusOptions.find(s => s.value === status)?.label || status;
              return (
                <div key={status} className="text-center p-2 bg-gray-100 rounded">
                  <p className="text-2xl font-bold">{count}</p>
                  <p className="text-xs">{label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
