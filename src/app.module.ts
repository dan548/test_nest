import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { CardModule } from './card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: ["src/**/*.entity.ts"],
      synchronize: true,
    }),
    UserModule,
    CardModule
  ]
})
export class AppModule {}
