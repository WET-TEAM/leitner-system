import { Router } from "express";
import { CardController } from "../controllers/CardController";

const router = Router();

router.post("/cards", CardController.createCard);
router.get("/cards", CardController.getCards);
router.get("/cards/quizz", CardController.getQuizCards);
router.patch("/cards/:cardId/answer", CardController.answerCard);

export default router;