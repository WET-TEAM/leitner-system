import { Category } from "./Category";
export class Card {
  public readonly id: string;
  public readonly question: string;
  public readonly answer: string;
  public readonly tag?: string;
  public category: Category;
  public lastAnsweredAt?: Date;
  constructor(id: string, question: string, answer: string, tag?: string) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.tag = tag;
    this.category = Category.FIRST;
  }
  public answerCard(isValid: boolean, answeredAt: Date = new Date()): void {
    this.lastAnsweredAt = answeredAt;
    if (isValid) {
      this.promote();
    } else {
      this.demote();
    }
  }
  private promote(): void {
    switch (this.category) {
      case Category.FIRST:
        this.category = Category.SECOND;
        break;
      case Category.SECOND:
        this.category = Category.THIRD;
        break;
      case Category.THIRD:
        this.category = Category.FOURTH;
        break;
      case Category.FOURTH:
        this.category = Category.FIFTH;
        break;
      case Category.FIFTH:
        this.category = Category.SIXTH;
        break;
      case Category.SIXTH:
        this.category = Category.SEVENTH;
        break;
      case Category.SEVENTH:
        this.category = Category.DONE;
        break;
      default:
        break;
    }
  }
  private demote(): void {
    this.category = Category.FIRST;
  }
}