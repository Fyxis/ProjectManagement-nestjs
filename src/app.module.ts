import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import Controller from 'src/controllers/define.controller';
import Service from 'src/services/define.service';
import Model from 'src/models/define.model';

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
    SequelizeModule.forFeature(Model),
  ],
  controllers: Controller,
  providers: Service,
})
export class AppModule {}
