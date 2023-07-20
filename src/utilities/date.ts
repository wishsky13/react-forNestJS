import { parseISO, format, formatISO } from "date-fns";

export const dateProcessor = (date: string | undefined) =>
  date ? format(parseISO(`${date}`), "yyyy/LL/dd HH:mm") : null;

export const pickerDateProcessor = (date: string) =>
  format(new Date(date), "yyyy-LL-dd");

export const pickerDateTimeProcessor = (date: string) =>
  formatISO(new Date(date));

export const dateToString = (date: Date | null) =>
  date ? format(date, "yyyy/LL/dd") : "";

export const dateTimeToString = (date: Date | null) =>
  date ? format(date, "yyyyLLddHHmm") : "";

