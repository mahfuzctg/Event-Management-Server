// utils/calculateEventStatusByTimezone.ts
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Calculate event status for a specific timezone
 * @param startDate - Event start date/time (Date object or ISO string)
 * @param endDate - Event end date/time (optional, Date or ISO string)
 * @param visitorTZ - Visitor timezone string (e.g., "Asia/Dhaka", "Europe/London")
 * @returns "Upcoming" | "Ongoing" | "Past"
 */
export function calculateEventStatusByTimezone(
  startDate: Date | string,
  endDate?: Date | string,
  visitorTZ: string = dayjs.tz.guess()
): "Upcoming" | "Ongoing" | "Past" {
  const now = dayjs().tz(visitorTZ);
  const start = dayjs(startDate).tz(visitorTZ);
  const end = endDate ? dayjs(endDate).tz(visitorTZ) : start.add(2, "hour");

  if (!start.isValid()) {
    throw new Error(`Invalid startDate provided: ${startDate}`);
  }
  if (endDate && !end.isValid()) {
    throw new Error(`Invalid endDate provided: ${endDate}`);
  }

  if (now.isBefore(start)) return "Upcoming";
  if (now.isAfter(end)) return "Past";
  return "Ongoing";
}
