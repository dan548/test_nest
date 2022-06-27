import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "src/user/user.entity";
import { CardEntity } from "./card.entity";
import { CardService } from "./card.service";
import { CommentEntity } from "./comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity, CardEntity, CommentEntity])
    ],
    providers: [
        CardService
    ]
})
export class CardModule {
    
}