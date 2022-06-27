import { UserEntity } from 'src/user/user.entity';
import { Entity, PrimaryColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { CommentEntity } from './comment.entity';

@Entity('card')
export class CardEntity {

    @PrimaryColumn()
    uuid: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @ManyToOne(type => UserEntity, user => user.cards)
    owner: UserEntity;

    @OneToMany(type => CommentEntity, comment => comment.card, {eager: true})
    @JoinColumn()
    comments: CommentEntity[];
}