import { describe, expect, test } from "vitest";
import { SwedishHolidays } from "../src";

describe("SwedishHolidays", () => {
  describe("isWeekend", () => {
    test("should be true", () => {
      expect(SwedishHolidays.isWeekend("2026-02-01")).toBe(true);
      expect(SwedishHolidays.isWeekend("2024-08-10")).toBe(true);
    });

    test("should be false", () => {
      expect(SwedishHolidays.isWeekend("2026-02-05")).toBe(false);
      expect(SwedishHolidays.isWeekend("2007-06-06")).toBe(false);
    });
  });

  describe("isWhatWeekday", () => {
    test("should be correct day", () => {
      expect(SwedishHolidays.isWhatWeekday("2026-02-01")).toBe("söndag");
      expect(SwedishHolidays.isWhatWeekday("2024-08-10")).toBe("lördag");
    });
  });

  describe("getLangFredagen", () => {
    test("Should be 2024-03-29", () => {
      expect(SwedishHolidays.getLangFredagen(2024)).toBe("2024-03-29");
    });
    test("Should be 2025-04-18", () => {
      expect(SwedishHolidays.getLangFredagen(2025)).toBe("2025-04-18");
    });
  });

  describe("getPaskDagen", () => {
    test("Should be 2024-03-31", () => {
      expect(SwedishHolidays.getPaskDagen(2024)).toBe("2024-03-31");
    });
    test("Should be 2025-04-20", () => {
      expect(SwedishHolidays.getPaskDagen(2025)).toBe("2025-04-20");
    });
  });

  describe("getMidsommarDagen", () => {
    test("Should be 2024-06-22", () => {
      expect(SwedishHolidays.getMidsommarDagen(2024)).toBe("2024-06-22");
    });
  });

  describe("getAllaHelgonsDag", () => {
    test("Should be 2024-11-02", () => {
      expect(SwedishHolidays.getAllaHelgonsDag(2024)).toBe("2024-11-02");
    });
  });
});
