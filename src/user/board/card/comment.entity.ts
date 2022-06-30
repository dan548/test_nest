import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CardEntity } from "./card.entity";

@Entity()
export class CommentEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    content: string;

    @ManyToOne(type => CardEntity, card => card.comments, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'card_id'})
    card: CardEntity;

}