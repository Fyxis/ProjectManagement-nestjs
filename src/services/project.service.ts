/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Project } from 'src/models/project.model'

@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project)
        private projectModel: typeof Project,
    ) {}

    async getAllProjects(): Promise<Project[]> {
        return this.projectModel.findAll();
    }
}