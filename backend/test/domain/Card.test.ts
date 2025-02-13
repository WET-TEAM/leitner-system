import { Card } from "../../src/domain/entities/Card";
import { Category } from "../../src/domain/entities/Category";
describe("Card entity", () => {
  it("devrait créer une carte avec la catégorie initiale FIRST", () => {
    const card = new Card(
      "1",
      "Qu'est-ce que le TDD ?",
      "Test Driven Development",
      "DevOps"
    );
    expect(card.category).toBe(Category.FIRST);
  });
  it("devrait promouvoir la carte en cas de bonne réponse", () => {
    const card = new Card(
      "1",
      "Qu'est-ce que le TDD ?",
      "Test Driven Development",
      "DevOps"
    );
    card.answerCard(true);
    expect(card.category).toBe(Category.SECOND);
  });
  it("devrait remettre la carte en catégorie FIRST en cas de mauvaise réponse", () => {
    const card = new Card(
      "1",
      "Qu'est-ce que le TDD ?",
      "Test Driven Development",
      "DevOps"
    );
    card.category = Category.THIRD;
    card.answerCard(false);
    expect(card.category).toBe(Category.FIRST);
  });
});