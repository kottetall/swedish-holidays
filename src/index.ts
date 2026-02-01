import {
  weekdays,
  weekdaysInSwedish,
  timeInMilliseconds,
  datePosition,
  holidayName,
} from "./constants/holidays.constant";

import {
  findClosestWeekDay,
  findNthWeekdayAfter,
  formatMillisToDateString,
  moveNthWeeks,
} from "./utils/time.util";

import { HolidayName } from "./types/holidays.type";

export class SwedishHolidays {
  /**
   * Checks if a given date is on a weekend or not
   * @param date The date you want to check - yyyy-mm-dd
   * @returns
   */
  static isWeekend(date: string) {
    const chosenDay = new Date(date).getDay();
    return chosenDay === weekdays.SATURDAY || chosenDay === weekdays.SUNDAY;
  }

  /**
   * Returns the swedish weekday name for the given day
   * @param date The date you want to check - yyyy-mm-dd
   * @returns The day in swedish
   */
  static isWhatWeekday(date: string) {
    const chosenDay = new Date(date).getDay();
    const nameOfDay = { ...weekdaysInSwedish }[chosenDay];

    if (!nameOfDay) {
      throw new Error(
        `Name is missing for the day - ${chosenDay} - from date - ${date}`,
      );
    }

    return nameOfDay;
  }

  /**
   * Checks if a given date is a swedish holiday or not
   * @param date The date you want to check - yyyy-mm-dd
   * @returns boolean
   */
  static isHoliday(date: string) {
    const year = +date.slice(0, 4);
    const holidays = SwedishHolidays.getHolidaysForYear(year);
    return !!holidays.get(date);
  }

  /**
   * Checks if a given date is a swedish holiday or not
   * @param date The date you want to check - yyyy-mm-dd
   * @returns The holidayname in swedish if the given date is a holiday. Otherwise returns null
   */
  static isWhatHoliday(date: string) {
    const year = +date.slice(0, 4);
    const holidays = SwedishHolidays.getHolidaysForYear(year);
    return holidays.get(date) || null;
  }

  /**
   * @description Gets all the swedish holidays during a year based on Lag (1989:253) om allmänna helgdagar and Semesterlag (1977:480)
   * @param year The year to get holidays for
   * @returns A map with each date as key and name as value.
   */
  static getHolidaysForYear(year: number) {
    const holidays = new Map<string, HolidayName>();

    /** Lag (1989:253) om allmänna helgdagar */
    holidays.set(`${year}-01-01`, holidayName.NYARSDAGEN);
    holidays.set(`${year}-01-06`, holidayName.TRETTONDEDAG_JUL);
    holidays.set(
      SwedishHolidays.getLangFredagen(year),
      holidayName.LANGFREDAGEN,
    );
    holidays.set(SwedishHolidays.getPaskDagen(year), holidayName.PASKDAGEN);
    holidays.set(
      SwedishHolidays.getAnnandagPask(year),
      holidayName.ANNANDAG_PASK,
    );
    holidays.set(
      SwedishHolidays.getKristiHimmelsfardsDag(year),
      holidayName.KRISTI_HIMMELSFARDSDAG,
    );
    holidays.set(`${year}-05-01`, holidayName.FORSTA_MAJ);
    holidays.set(SwedishHolidays.getPingstdagen(year), holidayName.PINGSTDAGEN);
    holidays.set(`${year}-06-06`, holidayName.NATIONALDAGEN);
    holidays.set(
      SwedishHolidays.getMidsommarDagen(year),
      holidayName.MIDSOMMARDAGEN,
    );
    holidays.set(
      SwedishHolidays.getAllaHelgonsDag(year),
      holidayName.ALLA_HELGONS_DAG,
    );
    holidays.set(`${year}-12-25`, holidayName.JULDAGEN);
    holidays.set(`${year}-12-26`, holidayName.ANNANDAG_JUL);

    /** Semesterlag (1977:480) - Allmän helgdag */
    holidays.set(`${year}-12-24`, holidayName.JULAFTON);
    holidays.set(
      SwedishHolidays.getMidsommarAfton(year),
      holidayName.MIDSOMMARAFTON,
    );
    holidays.set(`${year}-12-31`, holidayName.NYARSAFTON);
    return holidays;
  }

  static getLangFredagen(year: number) {
    const paskDagen = SwedishHolidays.getPaskDagen(year);
    return findClosestWeekDay(paskDagen, weekdays.FRIDAY, datePosition.BEFORE);
  }

  static getMidsommarDagen(year: number) {
    return findClosestWeekDay(
      `${year}-06-20`,
      weekdays.SATURDAY,
      datePosition.AFTER,
    );
  }

  static getMidsommarAfton(year: number) {
    return findClosestWeekDay(
      `${year}-06-19`,
      weekdays.FRIDAY,
      datePosition.AFTER,
    );
  }

  static getAllaHelgonsDag(year: number) {
    return findClosestWeekDay(
      `${year}-10-31`,
      weekdays.SATURDAY,
      datePosition.AFTER,
    );
  }

  static getKristiHimmelsfardsDag(year: number) {
    const paskDagen = SwedishHolidays.getPaskDagen(year);
    return findNthWeekdayAfter(paskDagen, weekdays.THURSDAY, 5);
  }

  static getPingstdagen(year: number) {
    const paskDagen = SwedishHolidays.getPaskDagen(year);
    return findNthWeekdayAfter(paskDagen, weekdays.SUNDAY, 7);
  }

  static getAnnandagPask(year: number) {
    const paskDagen = SwedishHolidays.getPaskDagen(year);
    const paskDagenInMs = new Date(paskDagen).getTime();
    const annandagPaskInMs = paskDagenInMs + timeInMilliseconds.DAY;
    return formatMillisToDateString(annandagPaskInMs);
  }

  static getPaskDagen(year: number) {
    /** This formula is based of https://www.eit.lth.se/fileadmin/eit/courses/edi021/DP_Gauss.html */
    const m = 24;
    const n = 5;

    const a = year % 19;
    const b = year % 4;
    const c = year % 7;
    const d = (19 * a + m) % 30;
    const e = (2 * b + 4 * c + 6 * d + n) % 7;
    const f = 22 + d + e;

    let day: string;
    let month: string;

    if (f <= 31) {
      day = f.toString().padStart(2, "0");
      month = "03";
    } else {
      day = (f - 31).toString().padStart(2, "0");
      month = "04";
    }

    let paskdagen = `${year}-${month}-${day}`;
    if (paskdagen === `${year}-04-26`) {
      paskdagen = moveNthWeeks(paskdagen, 1, datePosition.BEFORE);
    }

    if (paskdagen === `${year}-04-25` && d === 28 && e === 6 && a > 10) {
      paskdagen = moveNthWeeks(paskdagen, 1, datePosition.BEFORE);
    }

    return paskdagen;
  }
}
