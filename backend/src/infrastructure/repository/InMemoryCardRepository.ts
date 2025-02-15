import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { Card } from "../../domain/entities/Card";

export class InMemoryCardRepository implements ICardRepository {
  private cards: Map<string, Card> = new Map();

  async save(card: Card): Promise<void> {
    this.cards.set(card.id, card);
  }

  async findById(id: string): Promise<Card | null> {
    return this.cards.get(id) || null;
  }

  async findAllByTag(tag: string): Promise<Card[]> {
    return Array.from(this.cards.values()).filter((card) => card.tag === tag);
  }

  async findAll(): Promise<Card[]> {
    return Array.from(this.cards.values());
  }
}
