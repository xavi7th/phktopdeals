import { describe, it, expect } from "vitest";
import { formatMessageTime, formatMessageDate } from "$lib/utils/dateFormat.js";

describe("dateFormat", () => {
  describe("formatMessageTime", () => {
    it("should format time in 12-hour format", () => {
      const date = new Date("2026-03-14T15:30:00Z");
      const result = formatMessageTime(date.getTime());
      expect(result).toBe("3:30 PM");
    });

    it("should handle midnight", () => {
      const date = new Date("2026-03-14T00:00:00Z");
      const result = formatMessageTime(date.getTime());
      expect(result).toBe("12:00 AM");
    });

    it("should handle noon", () => {
      const date = new Date("2026-03-14T12:00:00Z");
      const result = formatMessageTime(date.getTime());
      expect(result).toBe("12:00 PM");
    });

    it("should show UTC when requested", () => {
      const date = new Date("2026-03-14T15:30:00Z");
      const result = formatMessageTime(date.getTime(), true);
      expect(result).toContain("UTC");
    });

    it("should return empty string for invalid date", () => {
      const result = formatMessageTime("invalid");
      expect(result).toBe("");
    });
  });

  describe("formatMessageDate", () => {
    it("should return Today for current date", () => {
      const now = new Date();
      const result = formatMessageDate(now);
      expect(result).toBe("Today");
    });

    it("should return Yesterday for previous day", () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const result = formatMessageDate(yesterday);
      expect(result).toBe("Yesterday");
    });

    it("should return weekday for dates within last 7 days", () => {
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      const result = formatMessageDate(threeDaysAgo);
      expect(result).toMatch(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)$/);
    });

    it("should return short date for older dates", () => {
      const oldDate = new Date("2026-01-15");
      const result = formatMessageDate(oldDate);
      expect(result).toMatch(/^[A-Z][a-z]{2} \d{1,2}$/);
    });

    it("should return empty string for invalid date", () => {
      const result = formatMessageDate("invalid");
      expect(result).toBe("");
    });
  });
});
