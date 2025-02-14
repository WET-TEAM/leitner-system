import { Card } from "../entities/Card";

export interface ICardRepository {
    save(card: Card): Promise<void>;
    findById(id: string): Promise<Card | null>;
    findAllByTag(tag: string): Promise<Card[]>;
    findAll(): Promise<Card[]>;
}