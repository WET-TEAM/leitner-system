import { Card } from "../../domain/entities/Card";
import { ICardRepository } from "../../domain/repositories/ICardRepository";
import { v4 as uuidv4 } from "uuid";

export class CreateCardUseCase {
    constructor(private cardRepository: ICardRepository) { }

    async execute(question: string, answer: string, tag?: string): Promise<Card> {
        const id = uuidv4();
        const card = new Card(id, question, answer, tag);
        await this.cardRepository.save(card);
        return card;
    }
}