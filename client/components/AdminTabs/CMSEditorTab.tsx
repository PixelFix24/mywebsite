import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save } from "lucide-react";

interface CMSContent {
  id: string;
  section: string;
  key: string;
  value: string;
  type: "text" | "textarea";
}

export default function CMSEditorTab() {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch("api/admin/cms");
      if (response.ok) {
        const data = await response.json();
        setContent(data);
      }
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = (id: string, value: string) => {
    setContent(
      content.map((c) => (c.id === id ? { ...c, value } : c))
    );
  };

  const saveContent = async () => {
    try {
      setSaving(true);
      const response = await fetch("api/admin/cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (response.ok) {
        alert("Änderungen gespeichert!");
      }
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
      alert("Fehler beim Speichern!");
    } finally {
      setSaving(false);
    }
  };

  const sections = [
    { id: "hero", label: "Hero-Bereich" },
    { id: "services", label: "Leistungen" },
    { id: "pricing", label: "Preise" },
    { id: "about", label: "Über uns" },
    { id: "contact", label: "Kontakt" },
  ];

  const sectionContent = content.filter((c) => c.section === activeSection);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Website bearbeiten</h2>
        <p className="text-gray-600 mb-4">
          Bearbeiten Sie die Inhalte Ihrer Website hier direkt.
        </p>

        <div className="flex gap-2 flex-wrap">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                activeSection === section.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-600">Wird geladen...</div>
      ) : sectionContent.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          Keine Inhalte für diesen Bereich vorhanden.
        </div>
      ) : (
        <div className="space-y-6">
          {sectionContent.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {item.key}
              </label>
              {item.type === "text" ? (
                <Input
                  value={item.value}
                  onChange={(e) => updateContent(item.id, e.target.value)}
                  className="w-full"
                />
              ) : (
                <textarea
                  value={item.value}
                  onChange={(e) => updateContent(item.id, e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg font-mono text-sm resize-none"
                />
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-4 border-t">
            <Button
              onClick={saveContent}
              disabled={saving}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              <Save size={18} />
              {saving ? "Wird gespeichert..." : "Speichern"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
