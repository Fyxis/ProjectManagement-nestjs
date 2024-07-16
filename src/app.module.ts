/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { RouterModule } from '@nestjs/core';
import Route from './app.router';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/users.module';
import { TaskModule } from './task/task.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true, // sync database schema (use false in production)
      logging: false,
    }),
    AuthModule,
    UsersModule,
    TaskModule,
    ProjectModule,
    RouterModule.register([Route])
  ],
})
export class AppModule {}
