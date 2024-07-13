/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Param } from '@nestjs/common';
import { ProjectService } from 'src/services/project.service'

@Controller('/project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}

    @Get()
    async getAllProject(@Res() res) {
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
}