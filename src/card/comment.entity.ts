import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { CardEntity } from "./card.entity";

@Entity()
export class CommentEntity {
    
    @PrimaryColumn()
    uuid: string;

    @Column()
    content: string;

    @ManyToOne(type => CardEntity, card => card.comments)
    card: CardEntity;

}