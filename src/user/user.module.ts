import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BoardModule
  ],
  providers: [UserService],
  controllers: [
    UserController
  ],
  exports: [UserService]
})
export class UserModule {
  
}