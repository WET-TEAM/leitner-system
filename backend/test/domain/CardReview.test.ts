import { Card } from "../../src/domain/entities/Card";
import { Category } from "../../src/domain/entities/Category";

describe("Card.shouldBeReviewed", () => {
  it("returns true if lastReviewedAt is not set (never reviewed)", () => {
    const card = new Card(
      "1",
      "What is TDD?",
      "Test Driven Development",
      "DevOps"
    );
    expect(card.shouldBeReviewed(new Date())).toBe(true);
  });

  describe("for Category.FIRST (interval: 1 day)", () => {
    it("returns false if less than 1 day has passed", () => {
      const card = new Card(
        "1",
        "What is TDD?",
        "Test Driven Development",
        "DevOps"
      );
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-01T12:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(false);
    });

    it("returns true if 1 day or more has passed", () => {
      const card = new Card(
        "1",
        "What is TDD?",
        "Test Driven Development",
        "DevOps"
      );
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-02T00:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(true);
    });
  });

  describe("for Category.SECOND (interval: 2 days)", () => {
    it("returns false if less than 2 days have passed", () => {
      const card = new Card(
        "2",
        "What is DDD?",
        "Domain Driven Design",
        "Architecture"
      );
      card.category = Category.SECOND;
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-02T23:59:59Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(false);
    });

    it("returns true if 2 days or more have passed", () => {
      const card = new Card(
        "2",
        "What is DDD?",
        "Domain Driven Design",
        "Architecture"
      );
      card.category = Category.SECOND;
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-03T00:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(true);
    });
  });

  describe("for Category.THIRD (interval: 4 days)", () => {
    it("returns false if less than 4 days have passed", () => {
      const card = new Card(
        "3",
        "What is SOLID?",
        "Principles of OOP design",
        "Design"
      );
      card.category = Category.THIRD;
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-04T00:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(false);
    });

    it("returns true if 4 days or more have passed", () => {
      const card = new Card(
        "3",
        "What is SOLID?",
        "Principles of OOP design",
        "Design"
      );
      card.category = Category.THIRD;
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-01-05T00:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(true);
    });
  });

  describe("for Category.DONE", () => {
    it("returns false regardless of the time passed", () => {
      const card = new Card(
        "4",
        "What is Clean Code?",
        "A set of coding practices",
        "Programming"
      );
      card.category = Category.DONE;
      card.lastReviewedAt = new Date("2025-01-01T00:00:00Z");
      const currentDate = new Date("2025-12-31T00:00:00Z");
      expect(card.shouldBeReviewed(currentDate)).toBe(false);
    });
  });
});
