export const TOUR_PRICE_TABLE: Record<number, Record<number, number>> = {
  1: { 1: 60, 2: 90, 3: 120, 4: 150, 5: 185, 6: 220 },
  2: { 1: 60, 2: 120, 3: 180, 4: 240, 5: 300, 6: 360 },
  3: { 1: 90, 2: 170, 3: 250, 4: 330, 5: 410, 6: 480 },
  4: { 1: 120, 2: 190, 3: 260, 4: 330, 5: 400, 6: 480 },
  5: { 1: 150, 2: 210, 3: 280, 4: 350, 5: 420, 6: 480 },
};

export function calculateTourAmount({
  adults = 0,
  children = 0,
  hours = 1,
}: {
  adults?: number;
  children?: number;
  hours?: number;
}) {
  const payableGuests = Math.max(0, Math.floor(Number(adults))) + Math.max(0, Math.floor(Number(children)));
  const peopleKey = payableGuests >= 6 ? 5 : Math.min(5, Math.max(1, payableGuests));
  const hoursKey = Math.min(6, Math.max(1, Math.floor(Number(hours) || 1)));
  const price = TOUR_PRICE_TABLE[peopleKey]?.[hoursKey] || 0;

  return Number(price.toFixed(2));
}

export function calculateBookingAmount({
  price,
  adults = 0,
  children = 0,
  hours = 1,
}: {
  price?: string | null;
  adults?: number;
  children?: number;
  hours?: number;
}) {
  const rawPrice = String(price || "");
  const fixedPrice = Number((rawPrice.match(/[0-9]+(?:\.[0-9]+)?/) || ["0"])[0]);

  if (/fixed/i.test(rawPrice)) {
    return Number(fixedPrice.toFixed(2));
  }

  return calculateTourAmount({ adults, children, hours });
}
