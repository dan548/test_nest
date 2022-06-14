import { UserData } from '../user/user.interface';
import { CardEntity } from "./card.entity";

interface Comment {
    text: string
}

interface CardData {
    title: string;
    description: string;
    createdAt?: Date,
    updatedAt?: Date,
    author?: UserData
}

export interface CommentsRO {
    comments: Comment[];
}

export interface CardRO {
    card: CardEntity;
}

export interface CardsRO {
    cards: CardEntity[];
    cardsCount: number;
}