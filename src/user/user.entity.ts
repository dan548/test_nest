import { IsEmail } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BoardEntity } from "./board/board.entity";
import { CardEntity } from "./board/card/card.entity";

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn('uuid')
    uuid: string;
    
    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => BoardEntity, board => board.owner, {
        eager: true
    })
    board: BoardEntity;

    @OneToMany(type => CardEntity, card => card.author, {
        eager: true
    })
    @JoinColumn({referencedColumnName: 'author_id'})
    cards: CardEntity[];

}