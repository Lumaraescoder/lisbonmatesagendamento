const fs = require("fs");

const locales = ["pt", "en", "es", "fr", "de", "it"];
const dictionaries = Object.fromEntries(
  locales.map((locale) => [
    locale,
    JSON.parse(fs.readFileSync(`src/locales/${locale}.json`, "utf8")),
  ]),
);

function flatten(value, path = "", output = new Map()) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${path}[${index}]`, output));
  } else if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, item]) =>
      flatten(item, path ? `${path}.${key}` : key, output),
    );
  } else {
    output.set(path, value);
  }
  return output;
}

function placeholders(value) {
  if (typeof value !== "string") return [];
  return [...value.matchAll(/\{([A-Za-z0-9_]+)\}/g)]
    .map((match) => match[1])
    .sort();
}

const reference = flatten(dictionaries.en);
const failures = [];

for (const locale of locales) {
  const entries = flatten(dictionaries[locale]);

  for (const [key, englishValue] of reference) {
    if (!entries.has(key)) {
      failures.push(`${locale}: missing ${key}`);
      continue;
    }

    const localizedValue = entries.get(key);
    if (typeof localizedValue !== typeof englishValue) {
      failures.push(`${locale}: type mismatch at ${key}`);
    }
    if (typeof localizedValue === "string" && !localizedValue.trim()) {
      failures.push(`${locale}: empty value at ${key}`);
    }
    if (placeholders(localizedValue).join(",") !== placeholders(englishValue).join(",")) {
      failures.push(`${locale}: placeholder mismatch at ${key}`);
    }
  }

  for (const key of entries.keys()) {
    if (!reference.has(key)) failures.push(`${locale}: extra ${key}`);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(`Locale QA passed: ${reference.size} values aligned across ${locales.length} languages.`);
