import { MiddlewareConsumer, NestModule } from "@nestjs/common";

export class CardModule implements NestModule {
    public configure(consumer: MiddlewareConsumer) {
        consumer
    }
}