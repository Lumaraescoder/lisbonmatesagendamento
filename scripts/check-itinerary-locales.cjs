const fs = require("fs");

const locales = ["pt", "en", "es", "fr", "de", "it"];
const expectedStops = {
  id1: 10,
  id_2: 9,
  id_3: 10,
  id_4: 9,
  id_5: 7,
  id_6: 7,
  id_7: 7,
  id_8: 6,
};

const forbidden = {
  en: ["If from Lisbon", "Lady of the Hill", "Gates of the Sun", "cheesecakes and pillows"],
  es: ["Si es de Lisboa", "dama de la colina", "Puertas del sol", "Mercado de tiempo muerto", "tartas de queso y almohadas"],
  fr: ["Si de Lisbonne", "Dame de la Colline", "Portes du Soleil", "Marché du temps mort", "cheesecakes et oreillers"],
  de: ["Wenn aus Lissabon", "Dame vom Hügel", "Tore der Sonne", "Auszeitmarkt", "Käsekuchen und Kissen", "Privater Abflug"],
  it: ["Commelina", "Se da Lisbona", "In Freedom Way", "Respiro affannoso", "formaggi e cuscini", "senza casa"],
};

const failures = [];

for (const locale of locales) {
  const path = `src/locales/${locale}.json`;
  const dictionary = JSON.parse(fs.readFileSync(path, "utf8"));
  const tours = dictionary.itinerary?.tours || {};

  for (const [tourKey, expectedCount] of Object.entries(expectedStops)) {
    const stops = tours[tourKey]?.stops;
    if (!Array.isArray(stops) || stops.length !== expectedCount) {
      failures.push(`${locale}.${tourKey}: expected ${expectedCount} stops`);
      continue;
    }

    stops.forEach((stop, index) => {
      if (!stop.title?.trim()) failures.push(`${locale}.${tourKey}.${index}: missing title`);
      if (!stop.description?.trim()) failures.push(`${locale}.${tourKey}.${index}: missing description`);
    });
  }

  const serialized = JSON.stringify(tours);
  for (const phrase of forbidden[locale] || []) {
    if (serialized.includes(phrase)) failures.push(`${locale}: forbidden mistranslation "${phrase}"`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Itinerary locale QA passed: 8 tours, 65 complete stops, 6 languages.");
