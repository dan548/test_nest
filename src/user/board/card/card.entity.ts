import { UserEntity } from 'src/user/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { BoardEntity } from '../board.entity';
import { CommentEntity } from './comment.entity';

@Entity('card')
export class CardEntity {

    @PrimaryGeneratedColumn('uuid')
    uuid: string;

    @Column()
    title: string;

    @Column()
    order: number;

    @ManyToOne(type => BoardEntity, board => board.cards, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({name: 'board_id'})
    board: BoardEntity;

    @ManyToOne(type => UserEntity, user => user.cards, {
        onDelete: 'SET NULL'
    })
    @JoinColumn({name: 'author_id'})
    author: UserEntity;

    @OneToMany(type => CommentEntity, comment => comment.card, {eager: true})
    @JoinColumn({referencedColumnName: 'card_id'})
    comments: CommentEntity[];
}