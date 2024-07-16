/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Task } from "src/models/task.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Task])
    ],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }