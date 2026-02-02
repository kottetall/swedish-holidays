import {
  datePosition,
  timeInMilliseconds,
} from "../constants/holidays.constant";
import { DatePosition } from "../types/holidays.type";

/**
 * @description Formats a date from milliseconds to a "yyyy-mm-dd"
 * @param timeInMs The date in milliseconds, you want to format
 * @returns The date as "yyyy-mm-dd"
 */
export function formatMillisToDateString(timeInMs: number) {
  return new Date(timeInMs).toLocaleString("sv-SE").split(" ")[0];
}

/**
 * @description Finds the closest specified weekday before or after the given start and returns the date of that day
 * @param originDate The date you want to start looking from
 * @param targetDay The weekday you want to find
 * @param direction The direction to look - before or after the starting date
 * @returns The date of the specified weekday
 */
export function findClosestWeekDay(
  originDate: string,
  targetDay: number,
  direction: DatePosition,
) {
  const originInMs = new Date(originDate).getTime();
  let dateToCheckInMs = new Date(originInMs).getTime();
  for (let i = 0; i < 7; i++) {
    if (new Date(dateToCheckInMs).getDay() === targetDay) {
      break;
    }
    if (direction === datePosition.AFTER) {
      dateToCheckInMs += timeInMilliseconds.DAY;
    } else {
      dateToCheckInMs -= timeInMilliseconds.DAY;
    }
  }

  return formatMillisToDateString(dateToCheckInMs);
}

/**
 * @description Finds the date of a specified weekday in the nth week from the origin date
 * @param originDate The date you want to start looking from
 * @param weekday The weekday you want to find
 * @param nth Number of weeks from the first occurrence of the specified weekday
 * @returns The found date
 */
export function findNthWeekdayAfter(
  originDate: string,
  weekday: number,
  nth: number,
) {
  const firstDate = findClosestWeekDay(originDate, weekday, datePosition.AFTER);
  return moveNthWeeks(firstDate, nth, datePosition.AFTER);
}

/**
 * @description Gets the date N weeks before/after the originDate
 * @param originDate The date to start from
 * @param weeksToMove Number of weeks to "jump"
 * @param direction If the date is before or after the originDate
 * @returns The found date
 */
export function moveNthWeeks(
  originDate: string,
  weeksToMove: number,
  direction: DatePosition,
) {
  const weeksInMs = timeInMilliseconds.WEEK * weeksToMove;
  const originDateInMs = new Date(originDate).getTime();
  const resultInMs =
    direction === datePosition.AFTER
      ? originDateInMs + weeksInMs
      : originDateInMs - weeksInMs;
  return formatMillisToDateString(resultInMs);
}
