/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { ProjectController } from "./project.controller";
import { ProjectService } from "./project.service";
import { SequelizeModule } from "@nestjs/sequelize";
import { Project } from "src/models/project.model";

@Module({
    imports: [
        SequelizeModule.forFeature([Project]),
    ],
    controllers: [ProjectController],
    providers: [ProjectService],
    exports: [ProjectService]
})
export class ProjectModule { }