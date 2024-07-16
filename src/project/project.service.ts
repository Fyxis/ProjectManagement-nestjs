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

    /**
     * 
     * @param id_project Project ID
     * @returns {Promise<Project>}
     */
    async getProjectByIdProject(id_project: number): Promise<Project[]> {
        return this.projectModel.findAll({
            where: {
                id: id_project
            }
        })
    }

    /**
     * 
     * @param projectName Name project for project name
     * @param description Description project for project description
     * @param photo Photo project
     * @param start_date When project started
     * @param end_date When project ended
     * @param created_by Who's create the project. Use ID User, not user name
     * @returns {Promise<Project>}
     */
    async createProjectByIdUser(projectName: string, description: string, photo: string, start_date: Date, end_date: Date, created_by: number): Promise<Project> {
        return this.projectModel.create({
            project_name: projectName,
            description: description,
            photo,
            start_date,
            end_date,
            created_by
        })
    }

    async getLastProject(): Promise<Project> {
        return this.projectModel.findOne({
            order: [['id', 'DESC']]
        })
    }

    /**
     * 
     * @param id_user User ID
     * @returns {promise<Project>}
     */
    async getProjectByIdUser(id_user: number): Promise<Project[]> {
        return this.projectModel.findAll({
            where: {
                created_by: id_user
            }
        })
    }
}