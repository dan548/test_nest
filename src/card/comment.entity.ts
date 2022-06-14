import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "./card.entity";

@Entity()
export class Comment {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @ManyToOne(type => CardEntity, card => card.comments)
    card: CardEntity;

}