import { useState } from "react";
import Layout from "../components/Layout";
import {
  Smartphone,
  Battery,
  Camera,
  Volume2,
  Bug,
  Database,
  Mail,
  Phone,
  MapPin,
  Clock,
  ChevronDown,
} from "lucide-react";

const serviceIcons = [
  { Icon: Smartphone, label: "Display" },
  { Icon: Battery, label: "Akku" },
  { Icon: Camera, label: "Kamera" },
  { Icon: Volume2, label: "Lautsprecher" },
  { Icon: Bug, label: "Software" },
  { Icon: Database, label: "Daten" },
];

const services = [
  {
    title: "Displayreparaturen",
    description:
      "Wir ersetzen beschädigte Displays mit hochwertigen Originalersatzteilen oder Premium-Alternativen.",
    badge: "Schnellreparatur",
    badgeIcon: Smartphone,
    icon: 0,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F7b772ef8b9d749749356db7b3b176b0f?format=webp&width=800",
  },
  {
    title: "Akkutausch",
    description:
      "Ihr Akku hält nicht mehr lange? Wir tauschen ihn gegen einen neuen, leistungsstarken Akku aus und verlängern so die Lebensdauer Ihres Geräts.",
    badge: "60 Min.",
    icon: 1,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F2ce5e09c498a4e0ea6e971eff2a41902?format=webp&width=800",
  },
  {
    title: "Kamera-Reparaturen",
    description:
      "Unscharfe Fotos oder eine defekte Kamera? Wir reparieren oder tauschen die Kamera Ihres Smartphones aus, damit Sie wieder perfekte Aufnahmen machen können.",
    badge: "Preis anfragen",
    icon: 2,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2Fad3c0ca52df64846bbda38511cd86ffa?format=webp&width=800",
  },
  {
    title: "Lautsprecher-Reparaturen",
    description:
      "Probleme mit dem Lautsprecher oder Mikrofon? Wir diagnostizieren das Problem und führen die notwendigen Reparaturen durch.",
    badge: "Sofort verfügbar",
    icon: 3,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F459007dffc134b928667e052312e2145?format=webp&width=800",
  },
  {
    title: "Software-Probleme",
    description:
      "Ihr Gerät friert ein oder startet nicht mehr? Wir beheben Software-Probleme, führen Updates durch und stellen Daten bei Bedarf wieder her.",
    badge: "Sofort verfügbar",
    icon: 4,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F7c3c443aafcf42798c6ac32915106839?format=webp&width=800",
  },
  {
    title: "Datenrettung",
    description:
      "Wichtige Daten nach einem Defekt verloren? Unsere Experten helfen bei der Datenrettung von beschädigten Geräten und sichern Ihre wertvollen Daten.",
    badge: "Hohe Erfolgsrate",
    icon: 5,
    descriptionImage: "https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F3ed517fede2a4886a0e18459021289be?format=webp&width=800",
  },
];

const faqItems = [
  {
    question: "Wie lange dauert eine typische Reparatur?",
    answer:
      "Die meisten Reparaturen wie Display- oder Akkutausch können wir innerhalb von 1-2 Stunden durchführen. Komplexere Probleme wie Wasserschäden oder Datenrettung können länger dauern. Wir informieren Sie immer über den voraussichtlichen Zeitrahmen.",
  },
  {
    question: "Kann ich mein Gerät zur Diagnose vorbeibringen?",
    answer:
      "Ja, Sie können Ihr Gerät jederzeit während unserer Öffnungszeiten zur Diagnose vorbeibringen. Die Diagnose ist kostenlos, wenn Sie sich für eine Reparatur bei uns entscheiden. Nach der Diagnose erhalten Sie ein unverbindliches Angebot und können dann entscheiden, ob Sie die Reparatur durchführen lassen möchten.",
  },
  {
    question: "Gibt es eine Garantie auf die Reparaturen?",
    answer:
      "Ja, alle unsere Reparaturen sind mit einer 12-monatigen Garantie abgedeckt. Die Garantie umfasst Material- und Arbeitsfehler, gilt jedoch nicht für weitere Schäden durch Stürze, Flüssigkeiten oder unsachgemäße Handhabung.",
  },
  {
    question: "Kann ich einen Termin vereinbaren?",
    answer:
      "Ja, Termine können Sie telefonisch, per E-Mail oder über unser Kontaktformular vereinbaren.",
  },
  {
    question: "Reparieren Sie auch Tablets und Smartwatches?",
    answer:
      "Ja, wir reparieren nicht nur Smartphones, sondern auch Tablets und Smartwatches der gängigen Hersteller. Bitte kontaktieren Sie uns vorab, damit wir Ihnen ein genaues Angebot machen können.",
  },
  {
    question: "Verliere ich meine Daten während der Reparatur?",
    answer:
      "Bei der Reparatur gehen normalerweise keine Daten verloren, aber wir empfehlen trotzdem sicherheitshalber, die Daten vor der Reparatur zu sichern.",
  },
];

const brands = [
  "Apple (iPhone, iPad)",
  "Samsung (alle Modelle)",
  "Google Pixel",
  "Xiaomi",
  "Huawei",
  "OnePlus",
  "Sony & weitere",
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left font-bold text-lg"
      >
        <span>{question}</span>
        <ChevronDown
          size={20}
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && <div className="mt-2 text-gray-600">{answer}</div>}
    </div>
  );
}

function ServiceCard({
  title,
  description,
  badge,
  badgeIcon: BadgeIcon,
  icon,
  descriptionImage,
}: {
  title: string;
  description: string;
  badge: string;
  badgeIcon?: typeof Smartphone;
  icon: number;
  descriptionImage?: string;
}) {
  const { Icon } = serviceIcons[icon];

  return (
    <div className="service-card p-8 shadow-lg hover:shadow-xl fade-in">
      <div className="text-5xl mb-6 gradient-text">
        <Icon size={48} />
      </div>
      <h3 className="text-2xl font-bold mb-4 text-gray-900">{title}</h3>
      {descriptionImage && (
        <div className="mb-4">
          <img src={descriptionImage} alt={title} className="w-16 h-16 object-contain" />
        </div>
      )}
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="mt-4">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
          {BadgeIcon ? <BadgeIcon size={16} className="inline" /> : badge}
        </span>
      </div>
    </div>
  );
}

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-purple-600 text-white py-24 overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Willkommen bei PixelFix24
            </h1>
            <p className="text-xl mb-8">
              Ihr zuverlässiger Partner für Handy- und Tablet-Reparaturen aller
              Marken. Schnell, transparent und professionell.
            </p>
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <a
                href="#contact"
                className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105"
              >
                Jetzt Reparatur buchen
              </a>
              <a
                href="#contact"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 font-bold py-3 px-6 rounded-lg text-center transition duration-300 transform hover:scale-105"
              >
                Kostenlose Fehlerdiagnose
              </a>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center fade-in">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2Fe8213c0cb58b4eb3a7c43c2126771918?format=webp&width=800"
              alt="Elektronik-Reparatur Werkstatt mit Werkzeugen und Komponenten"
              className="rounded-lg shadow-2xl max-w-full h-auto max-h-72 object-cover ml-4"
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Unsere Leistungen
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  badge={service.badge}
                  icon={service.icon}
                  descriptionImage={service.descriptionImage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2 className="text-3xl font-bold mb-6">
              Unsere Preise – Transparent & Günstig
            </h2>
            <p className="text-lg mb-8">
              Bei <span className="font-bold text-blue-600">PixelFix24</span>{" "}
              bekommst du hochwertige Reparaturen zu besonders fairen Preisen.
              Die genauen Kosten hängen vom Gerät und dem Schaden ab – da sich
              die Ersatzteilpreise regelmäßig ändern, verzichten wir auf eine
              feste Preisliste.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-xl mb-10 text-left border border-gray-100 transform hover:scale-[1.01] transition duration-300">
              <h3 className="text-xl font-bold mb-4 text-center">
                Was du erwarten kannst:
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Displayreparaturen <span className="font-bold">ab 29€</span>
                  </span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Akkutausch <span className="font-bold">ab 29€</span>
                  </span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Kamera- oder Lautsprecherreparatur{" "}
                    <span className="font-bold">ab 15€</span>
                  </span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Fehlerdiagnose <span className="font-bold">kostenlos bei Reparatur</span>{" "}
                    (sonst <span className="font-bold">19€</span>)
                  </span>
                </div>
                <div className="flex items-start">
                  <i className="fas fa-check-circle text-green-500 mt-1 mr-2"></i>
                  <span>
                    Softwarelösungen <span className="font-bold">ab 9€</span>
                  </span>
                </div>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
                  • Unterdurchschnittliche Preise – Top Qualität
                </span>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">
                Wir reparieren u.a. folgende Marken:
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {brands.map((brand, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 px-4 py-2 rounded-full font-medium"
                  >
                    {brand}
                  </span>
                ))}
              </div>
            </div>

            <p className="text-lg mb-6">
              • {" "}
              <span className="font-semibold">
                Frag einfach nach deinem Modell!
              </span>{" "}
              Wir nennen dir den aktuellen Preis sofort – telefonisch, per
              WhatsApp oder E-Mail.
            </p>

            <a
              href="#contact"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
            >
              Jetzt Preis anfragen
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10 fade-in">
              <h2 className="text-3xl font-bold mb-6">Über uns</h2>
              <p className="text-lg mb-4">
                Wir sind ein junges Unternehmen mit langjähriger Erfahrung in
                der Smartphone- und Tablet-Reparatur. Unser Anspruch ist es,
                höchste Qualität zu fairen Preisen zu bieten, transparent,
                schnell und zuverlässig.
              </p>
              <p className="text-lg mb-6 leading-relaxed">
                Ob Displaybruch, Akkutausch, Wasserschaden oder Software- und
                Hardwareprobleme: Wir reparieren Geräte aller gängigen Marken
                meist noch am selben Tag und mit hochwertigen Ersatzteilen. Auf
                jede Reparatur erhalten Sie 12 Monate Garantie.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                  <span>Hochwertige Ersatzteile</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                  <span>Transparente Preise ohne versteckte Kosten</span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                  <span>
                    Schnelle Reparaturzeiten (oft noch am selben Tag)
                  </span>
                </div>
                <div className="flex items-center">
                  <i className="fas fa-check-circle text-blue-600 mr-2"></i>
                  <span>12 Monate Garantie auf alle Reparaturen</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 fade-in mt-8">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F8962820f2d6e48e38cf68b3d0df4ccdd%2F73782283d38b45bba8843861a165fd02?format=webp&width=800"
                alt="Elektronik-Reparatur Werkstatt mit Reparaturwerkzeugen"
                className="rounded-lg shadow-xl w-full h-auto max-h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {/* Elfsight Google Reviews | Untitled Google Reviews */}
          <div className="flex justify-center">
            <div className="elfsight-app-89c5ad8e-e768-46db-8608-702caf9a00d8" data-elfsight-app-lazy></div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Kontakt & Standort
          </h2>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/2 fade-in">
              <h3 className="text-2xl font-bold mb-4">Kontaktieren Sie uns</h3>

              <form name="reparaturauftrag" method="POST" data-netlify="true" className="space-y-4">
                <input type="hidden" name="form-name" value="reparaturauftrag" />
                <div>
                  <label htmlFor="name" className="block mb-1">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1">
                    E-Mail*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block mb-1 flex items-center">
                    <span>Telefonnummer</span>
                    <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      optional, aber empfohlen
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    placeholder="Für schnelleren Kontakt"
                  />
                  <p className="text-xs text-gray-200 mt-1">
                    Wir rufen Sie gerne zurück, wenn Sie eine Nummer angeben.
                  </p>
                </div>
                <div>
                  <label htmlFor="device" className="block mb-1">
                    Gerätetyp/Marke*
                  </label>
                  <input
                    type="text"
                    id="device"
                    name="device"
                    required
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block mb-1">
                    Gewünschte Leistung*
                  </label>
                  <select
                    id="service"
                    name="service"
                    required
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    <option value="">Bitte auswählen</option>
                    <option value="display">Displayreparatur</option>
                    <option value="battery">Akkutausch</option>
                    <option value="camera">Kamera-Reparatur</option>
                    <option value="speaker">Lautsprecher-Reparatur</option>
                    <option value="software">Software-Problem</option>
                    <option value="data">Datenrettung</option>
                    <option value="other">Anderes Problem</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block mb-1">
                    Beschreibung des Problems*
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full px-4 py-2 rounded text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
                >
                  Reparatur anfragen
                </button>
              </form>
            </div>

            <div className="lg:w-1/2 fade-in">
              <h3 className="text-2xl font-bold mb-4">Unsere Kontaktdaten</h3>

              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <MapPin size={24} className="mt-1 mr-3 text-blue-200" />
                  <div>
                    <h4 className="font-bold">Adresse</h4>
                    <p>
                      Brühlstraße 18
                      <br />
                      76689 Karlsdorf-Neuthard
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone size={24} className="mt-1 mr-3 text-blue-200" />
                  <div>
                    <h4 className="font-bold">Telefon</h4>
                    <p>+49 176 79817190</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail size={24} className="mt-1 mr-3 text-blue-200" />
                  <div>
                    <h4 className="font-bold">E-Mail</h4>
                    <p>PixelFix24@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock size={24} className="mt-1 mr-3 text-blue-200" />
                  <div>
                    <h4 className="font-bold">Öffnungszeiten</h4>
                    <p>
                      Montag - Freitag: 09:00 - 21:00 Uhr
                      <br />
                      Samstag: 09:00 - 20:00 Uhr
                      <br />
                      Sonntag: Geschlossen
                      <br />
                      <br />
                      <span className="font-semibold">24/7 Terminvereinbarung online möglich</span>
                    </p>
                  </div>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4">Finden Sie uns</h3>
              <div className="bg-white p-1 rounded-lg shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2617.370859381533!2d8.530486315686273!3d49.13487697932285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479706f4c9e8f8c5%3A0x6b5d8c8b8b8b8b8b!2sBr%C3%BChlstra%C3%9Fe%2018%2C%2076689%20Karlsdorf-Neuthard!5e0!3m2!1sen!2sde!4v1753481486984!5m2!1sen!2sde"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Häufige Fragen
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Bleiben Sie informiert</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Abonnieren Sie unseren Newsletter und erhalten Sie exklusive Angebote
            und Tipps zur Pflege Ihrer Geräte.
          </p>

          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Ihre E-Mail-Adresse"
              className="flex-grow px-4 py-3 rounded-l sm:rounded-l focus:outline-none text-gray-800"
              required
            />
            <button
              type="submit"
              className="bg-blue-900 hover:bg-blue-800 px-6 py-3 rounded-r sm:rounded-r font-bold transition"
            >
              Abonnieren
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
