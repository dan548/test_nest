import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BoardEntity } from "./board.entity";
import { BoardService } from "./board.service";
import { CardModule } from "./card/card.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([BoardEntity]),
        CardModule
    ],
    providers: [
        BoardService
    ]
})
export class BoardModule {
    
}