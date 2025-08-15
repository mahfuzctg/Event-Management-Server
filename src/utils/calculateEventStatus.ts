
import dayjs from "dayjs";

/**
 * Calculate the current status of an event.
 * @param startDate - Event start date/time
 * @param endDate - Event end date/time (optional)
 * @returns "Upcoming" | "Ongoing" | "Past"
 */
export function calculateEventStatus(startDate: Date, endDate?: Date): "Upcoming" | "Ongoing" | "Past" {
  const now = dayjs();
  const start = dayjs(startDate);
  const end = endDate ? dayjs(endDate) : start.add(2, "hour");

  if (now.isBefore(start)) return "Upcoming";
  if (now.isAfter(end)) return "Past";
  return "Ongoing";
}
