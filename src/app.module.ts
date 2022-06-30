import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RouterModule } from '@nestjs/core';
import { appRoutes } from './app.routes';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: ':memory:',
      dropSchema: true,
      entities: ["dist/**/*.entity.js"],
      synchronize: true,
    }),
    AuthModule,
    RouterModule.register(appRoutes)
  ]
})
export class AppModule {}
