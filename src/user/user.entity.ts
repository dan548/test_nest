import { IsEmail } from "class-validator";
import { CardEntity } from "src/card/card.entity";
import { Column, Entity, PrimaryColumn, JoinColumn, OneToMany } from "typeorm";

@Entity('user')
export class UserEntity {
    
    @PrimaryColumn()
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

    @Column()
    board_title: string;

    @OneToMany(type => CardEntity, card => card.owner, {eager: true})
    @JoinColumn()
    cards: CardEntity[];

}