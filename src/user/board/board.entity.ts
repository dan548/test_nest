import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../user.entity";
import { CardEntity } from "./card/card.entity";

@Entity('board')
export class BoardEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @OneToOne(type => UserEntity, user => user.board, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'owner_id'})
    owner: UserEntity;

    @OneToMany(type => CardEntity, card => card.board, {
        eager: true
    })
    @JoinColumn()
    cards: CardEntity[];

}