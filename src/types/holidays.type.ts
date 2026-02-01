import { datePosition, holidayName } from "../constants/holidays.constant";

export type DatePosition = (typeof datePosition)[keyof typeof datePosition];
export type HolidayName = (typeof holidayName)[keyof typeof holidayName];
