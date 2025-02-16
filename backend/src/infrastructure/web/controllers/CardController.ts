import { Request, Response } from "express";
import { CreateCardUseCase } from "../../../application/usecases/CreateCardUseCase";
import { AnswerCardUseCase } from "../../../application/usecases/AnswerCardUseCase";
import { InMemoryCardRepository } from "../../repository/InMemoryCardRepository";

const cardRepository = new InMemoryCardRepository();
const createCardUseCase = new CreateCardUseCase(cardRepository);
const answerCardUseCase = new AnswerCardUseCase(cardRepository);

export class CardController {
    static async createCard(req: Request, res: Response) {
        try {
            const { question, answer, tag } = req.body;
            if (!question || !answer) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            const card = await createCardUseCase.execute(question, answer, tag);
            return res.status(201).json(card);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async getCards(req: Request, res: Response) {
        try {
            const tagsParam = req.query.tags as string;
            let cards;
            if (tagsParam) {
                const tags = tagsParam.split(",");
                cards = await cardRepository.findAllByTag(tags[0]);
            } else {
                cards = await cardRepository.findAll();
            }
            return res.status(200).json(cards);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }

    static async answerCard(req: Request, res: Response) {
        try {
            const cardId = req.params.cardId;
            const { isValid } = req.body;
            if (typeof isValid !== "boolean") {
                return res.status(400).json({ error: "isValid must be a boolean" });
            }
            await answerCardUseCase.execute(cardId, isValid);
            return res.status(204).send();
        } catch (error: any) {
            if (error.message === "Card not found") {
                return res.status(404).json({ error: error.message });
            }
            return res.status(500).json({ error: error.message });
        }
    }

    static async getQuizCards(req: Request, res: Response) {
        try {
            const allCards = await cardRepository.findAll();
            const quizCards = allCards.filter((card) => card.category !== "DONE" && card.shouldBeReviewed());
            return res.status(200).json(quizCards);
        } catch (error: any) {
            return res.status(500).json({ error: error.message });
        }
    }
}