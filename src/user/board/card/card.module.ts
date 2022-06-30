import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardEntity } from "./card.entity";
import { CardService } from "./card.service";
import { CommentEntity } from "./comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CardEntity, CommentEntity])
    ],
    providers: [
        CardService
    ]
})
export class CardModule {
    
}