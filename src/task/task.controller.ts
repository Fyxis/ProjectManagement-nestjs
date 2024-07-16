/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Res, Param, UseInterceptors, Body } from '@nestjs/common';
import { Response } from 'express';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { TaskService } from './task.service';

@Controller()
export class TaskController {
    constructor(private readonly taskService: TaskService) {}

    @Get()
    async getAllTask(@Res() res: Response) {
        try {
            const data = await this.taskService.getAllTask()
            return res.status(200).json({
                message: `Success Get All Task`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
            
        }
    }

    @Get('/:idTask')
    async getTaskByIdTask(@Res() res: Response, @Param() param: { idTask: number }) {
        const { idTask } = param
        try {
            const data = await this.taskService.getTaskByIdTask(idTask)
            return res.status(200).json({
                message: `Success Get Task by Id Task`,
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
    async createTaskByIdUser(@Res() res: Response, @Body() body: { title: string, description: string, status: string, project: number, start_date: Date, end_date: Date }, @Param() param: { idUser: number }) {
        const { idUser } = param
        const { title, description, status, project, start_date, end_date } = body
        try {
            await this.taskService.createTaskByIdUser(idUser, title, description, status, project, start_date, end_date)
            const data = await this.taskService.getLastTask()
            return res.status(200).json({
                message: `Success Create Task`,
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
    async getTaskByIdUser(@Res() res: Response, @Param() param: { idUser: number }) {
        const { idUser } = param
        try {
            const data = await this.taskService.getTaskByIdUser(idUser)
            return res.status(200).json({
                message: `Success Get Task by Id User`,
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