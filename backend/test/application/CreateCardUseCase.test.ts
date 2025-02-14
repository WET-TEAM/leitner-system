describe("CreateCardUseCase", () => {
    let useCase: CreateCardUseCase;
    let repository: InMemoryCardRepository;

    beforeEach(() => {
        repository = new InMemoryCardRepository();
        useCase = new CreateCardUseCase(repository);
    });

    it("should create a card and store it in the repository", async () => {
        const card = await useCase.execute(
            "What is DDD?",
            "Domain Driven Design",
            "Architecture"
        );
        expect(card.id).toBeDefined();
        expect(card.question).toBe("What is DDD?");
        const storedCard = await repository.findById(card.id);
        expect(storedCard).not.toBeNull();
        expect(storedCard?.question).toBe("What is DDD?");
    });
});