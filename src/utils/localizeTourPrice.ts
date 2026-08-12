type Translate = (key: string) => unknown;

export function localizeTourPrice(price: string | undefined, t: Translate) {
  const originalPrice = price || "$0";
  const normalizedPrice = originalPrice.replace(/\s+/g, "").toLowerCase();

  if (normalizedPrice === "from€30") return String(t("common.fromPrice"));
  if (normalizedPrice === "fixedprice€320") return String(t("common.fixedFullDayPrice"));
  return originalPrice;
}
