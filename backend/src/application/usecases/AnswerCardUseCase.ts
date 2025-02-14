import { ICardRepository } from "../../domain/repositories/ICardRepository";

export class AnswerCardUseCase {
    constructor(private cardRepository: ICardRepository) { }

    async execute(cardId: string, isValid: boolean): Promise<void> {
        const card = await this.cardRepository.findById(cardId);
        if (!card) {
            throw new Error("Card not found");
        }
        card.answerCard(isValid);
        await this.cardRepository.save(card);
    }
}