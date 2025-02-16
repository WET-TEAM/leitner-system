import request from "supertest";
import express from "express";
import bodyParser from "body-parser";
import cardRoutes from "../../src/infrastructure/web/routes/cardRoutes";

const app = express();
app.use(bodyParser.json());
app.use(cardRoutes);

describe("API Integration Tests", () => {
    let createdCardId: string;

    it("should create a new card", async () => {
        const response = await request(app).post("/cards").send({
            question: "What is SOLID?",
            answer: "A set of principles for good software design.",
            tag: "Design",
        });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        expect(response.body.category).toBe("FIRST");
        createdCardId = response.body.id;
    });

    it("should retrieve a list of cards", async () => {
        const response = await request(app).get("/cards");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });

    it("should process a correct answer and promote the card", async () => {
        const answerResponse = await request(app)
            .patch(`/cards/${createdCardId}/answer`)
            .send({ isValid: true });
        expect(answerResponse.status).toBe(204);

        const cardsResponse = await request(app).get("/cards");
        const card = cardsResponse.body.find((c: any) => c.id === createdCardId);
        expect(card.category).toBe("SECOND");
    });

    it("should return quiz cards (cards not marked as DONE)", async () => {
        const response = await request(app).get("/cards/quizz");
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
        response.body.forEach((card: any) => {
            expect(card.category).not.toBe("DONE");
        });
    });
});