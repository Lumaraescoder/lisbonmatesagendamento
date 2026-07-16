import { DateRage } from "@/app/(client-components)/type";

type Input = Date | DateRage | null | undefined;

const format = (d?: Date | null) =>
  d
    ? d.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      })
    : "";

const converSelectedDateToString = (input: Input) => {
  if (!input) return "";
  if (Array.isArray(input)) {
    const [startDate, endDate] = input;
    if (!startDate) return "";
    if (!endDate) return format(startDate);
    // if same day, return single date
    if (startDate.toDateString() === endDate.toDateString()) {
      return format(startDate);
    }
    return format(startDate) + " - " + format(endDate);
  }
  // single date
  return format(input as Date);
};

export default converSelectedDateToString;
