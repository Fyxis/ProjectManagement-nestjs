/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Res, Param, UseInterceptors, Body } from '@nestjs/common';
import { Response } from 'express';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { ProjectService } from 'src/project/project.service'

@Controller()
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    async getAllProject(@Res() res: Response) {
        try {
            const data = await this.projectService.getAllProjects()
            return res.status(200).json({
                message: `Success Get All Projects`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
        }
    }

    @Get('/:idProject')
    async getProjectByIdProject(@Res() res: Response, @Param() param: { idProject: number }) {
        const { idProject } = param
        try {
            const data = await this.projectService.getProjectByIdProject(idProject)
            return res.status(200).json({
                message: `Success Get Projects By Id Project ${idProject}`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
            
        }
    }

    @Post('/users/:idUser')
    @UseInterceptors(NoFilesInterceptor())
    async createProjectByIdUser(@Res() res: Response, @Body() body: { project_name: string, description: string, photo: string, start_date: Date, end_date: Date }, @Param() param: { idUser: number }) {
        const { project_name, description, photo, start_date, end_date } = body
        const { idUser } = param
        try {
            await this.projectService.createProjectByIdUser(project_name, description, photo, start_date, end_date, idUser)
            const data = await this.projectService.getLastProject()
            return res.status(200).json({
                message: `Success Create Project`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
            
        }
    }

    @Get('/users/:idUser')
    async getProjectByIdUser(@Res() res: Response, @Param() param: { idUser: number }) {
        const { idUser } = param
        try {
            const data = await this.projectService.getProjectByIdUser(idUser)
            return res.status(200).json({
                message: `Success Get Project By Id User`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
        }
    }
}