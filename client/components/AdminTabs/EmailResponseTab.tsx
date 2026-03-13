import { useState } from "react";
import { Button } from "@/components/ui/button";

interface RepairRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  device: string;
  service: string;
  message: string;
  date: string;
}

const EMAIL_TEMPLATES = {
  acknowledgment: {
    subject: "Auftrag bei PixelFix24 erhalten ✅",
    message: `Hallo {name},

vielen Dank für deine Reparaturanfrage! Dein Auftrag wurde erfolgreich bei uns eingeleitet.

**Deine Anfrage:**
- Gerät: {device}
- Service: {service}

Wir werden deine Anfrage in Kürze bearbeiten und melden uns bei dir mit den nächsten Schritten.

Falls du Fragen hast, erreichst du uns unter:
📞 +49 176 79817190
💬 WhatsApp: https://wa.me/4917679817190

Viele Grüße,
Dein PixelFix24-Team`,
  },
  inProgress: {
    subject: "Dein Reparaturauftrag wird bearbeitet 🔧",
    message: `Hallo {name},

gute Neuigkeiten! Dein Gerät wird gerade von unserem Team repariert.

Wir halten dich auf dem Laufenden und informieren dich sobald dein Gerät fertig ist.

Für Fragen erreichst du uns jederzeit:
📞 +49 176 79817190
💬 WhatsApp: https://wa.me/4917679817190

Viele Grüße,
Dein PixelFix24-Team`,
  },
  completed: {
    subject: "Dein Gerät ist fertig! ✨",
    message: `Hallo {name},

großartig! Dein Gerät ist fertig repariert und wartet auf dich.

Du kannst es jederzeit abholen oder wir versenden es zu dir.

Kontaktiere uns für die Abholung:
📞 +49 176 79817190
💬 WhatsApp: https://wa.me/4917679817190

Viele Grüße,
Dein PixelFix24-Team`,
  },
};

export default function EmailResponseTab() {
  const [requests, setRequests] = useState<RepairRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<RepairRequest | null>(
    null
  );
  const [templateKey, setTemplateKey] = useState<keyof typeof EMAIL_TEMPLATES>(
    "acknowledgment"
  );
  const [customMessage, setCustomMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sentEmails, setSentEmails] = useState<Set<string>>(new Set());

  // Load from Formspree (mock - you'll need to set up Formspree API access)
  const loadRequests = async () => {
    try {
      // For now, we'll use a mock - in production, connect to Formspree API
      const mockRequests: RepairRequest[] = [
        {
          id: "1",
          name: "Max Mustermann",
          email: "max@example.com",
          phone: "+49 176 123456",
          device: "iPhone 12",
          service: "Display",
          message: "Display ist kaputt",
          date: new Date().toLocaleDateString(),
        },
      ];
      setRequests(mockRequests);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
  };

  const sendEmail = async () => {
    if (!selectedRequest) return;

    setLoading(true);
    try {
      const template = EMAIL_TEMPLATES[templateKey];
      const finalMessage = customMessage || template.message;

      const messageWithData = finalMessage
        .replace(/{name}/g, selectedRequest.name)
        .replace(/{device}/g, selectedRequest.device)
        .replace(/{service}/g, selectedRequest.service);

      const response = await fetch("/.netlify/functions/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: selectedRequest.name,
          email: selectedRequest.email,
          subject: template.subject,
          message: messageWithData,
        }),
      });

      if (response.ok) {
        setSentEmails(new Set([...sentEmails, selectedRequest.id]));
        alert("✅ Email erfolgreich versendet!");
        setCustomMessage("");
        setSelectedRequest(null);
      } else {
        alert("❌ Fehler beim Versenden");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Fehler: " + (error instanceof Error ? error.message : "Unknown"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold mb-4">
          📧 Automatische Email-Antworten
        </h3>
        <Button onClick={loadRequests} className="mb-4">
          Anfragen laden
        </Button>
      </div>

      {requests.length === 0 ? (
        <p className="text-gray-600">
          Klick auf "Anfragen laden" um Reparaturaufträge zu sehen
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Request List */}
          <div className="space-y-2">
            <h4 className="font-bold">Anfragen:</h4>
            {requests.map((req) => (
              <div
                key={req.id}
                onClick={() => setSelectedRequest(req)}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedRequest?.id === req.id
                    ? "bg-blue-100 border-blue-500"
                    : "bg-white hover:bg-gray-50"
                } ${sentEmails.has(req.id) ? "opacity-50" : ""}`}
              >
                <p className="font-bold">{req.name}</p>
                <p className="text-sm text-gray-600">{req.email}</p>
                <p className="text-sm text-gray-500">{req.device}</p>
                {sentEmails.has(req.id) && (
                  <p className="text-xs text-green-600 font-bold">✅ Email versendet</p>
                )}
              </div>
            ))}
          </div>

          {/* Email Composer */}
          {selectedRequest && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-bold mb-2">Vorlage wählen:</h4>
                <select
                  value={templateKey}
                  onChange={(e) =>
                    setTemplateKey(e.target.value as keyof typeof EMAIL_TEMPLATES)
                  }
                  className="w-full px-3 py-2 border rounded"
                >
                  <option value="acknowledgment">
                    ✅ Auftrag erhalten
                  </option>
                  <option value="inProgress">🔧 Bearbeitung läuft</option>
                  <option value="completed">✨ Fertig!</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  Nachricht (optional anpassen):
                </label>
                <textarea
                  value={
                    customMessage ||
                    EMAIL_TEMPLATES[templateKey].message
                      .replace(/{name}/g, selectedRequest.name)
                      .replace(/{device}/g, selectedRequest.device)
                      .replace(/{service}/g, selectedRequest.service)
                  }
                  onChange={(e) => setCustomMessage(e.target.value)}
                  rows={8}
                  className="w-full px-3 py-2 border rounded text-sm"
                />
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  📧 An: <strong>{selectedRequest.email}</strong>
                </p>
                <Button
                  onClick={sendEmail}
                  disabled={loading || sentEmails.has(selectedRequest.id)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  {loading ? "Wird versendet..." : "📧 Email versendet"}
                </Button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
