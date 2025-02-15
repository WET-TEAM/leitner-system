import { AnswerCardUseCase } from "../../src/application/usecases/AnswerCardUseCase";
import { CreateCardUseCase } from "../../src/application/usecases/CreateCardUseCase";
import { Category } from "../../src/domain/entities/Category";
import { InMemoryCardRepository } from "../../src/infrastructure/repository/InMemoryCardRepository";

describe("AnswerCardUseCase", () => {
    let createUseCase: CreateCardUseCase;
    let answerUseCase: AnswerCardUseCase;
    let repository: InMemoryCardRepository;

    beforeEach(() => {
        repository = new InMemoryCardRepository();
        createUseCase = new CreateCardUseCase(repository);
        answerUseCase = new AnswerCardUseCase(repository);
    });

    it("should promote the card when answered correctly", async () => {
        const card = await createUseCase.execute(
            "What is API?",
            "Application Programming Interface"
        );
        await answerUseCase.execute(card.id, true);
        const updatedCard = await repository.findById(card.id);
        expect(updatedCard?.category).toBe(Category.SECOND);
    });

    it("should reset the card to FIRST when answered incorrectly", async () => {
        const card = await createUseCase.execute(
            "What is API?",
            "Application Programming Interface"
        );
        await answerUseCase.execute(card.id, true);
        await answerUseCase.execute(card.id, false);
        const updatedCard = await repository.findById(card.id);
        expect(updatedCard?.category).toBe(Category.FIRST);
    });
});