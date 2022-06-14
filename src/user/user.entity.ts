import { IsEmail } from "class-validator";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as argon2 from 'argon2';
import { CardEntity } from "src/card/card.entity";

@Entity('user')
export class UserEntity {
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @Column()
    password: string;

    @BeforeInsert()
    async hashPassword() {
        this.password = await argon2.hash(this.password);
    }

    @OneToMany(type => CardEntity, card => card.author)
    cards: CardEntity[];

}