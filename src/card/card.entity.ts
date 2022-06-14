import { UserEntity } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, OneToMany, JoinColumn, AfterUpdate, BeforeUpdate } from 'typeorm';
import { Comment } from './comment.entity';

@Entity('card')
export class CardEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(type => UserEntity, user => user.cards)
    author: UserEntity;

    @OneToMany(type => Comment, comment => comment.card, {eager: true})
    @JoinColumn()
    comments: Comment[];
}