/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Task } from 'src/models/task.model';

@Injectable()
export class TaskService {
    constructor(@InjectModel(Task) private readonly taskModel: typeof Task) {}

    async getAllTask(): Promise <Task[]> {
        return this.taskModel.findAll()
    }

    /**
     * 
     * @param id_task Unique ID for task
     * @returns {Promise<Task>}
     */
    async getTaskByIdTask(id_task: number): Promise <Task> {
        return this.taskModel.findOne({
            where: {
                id: id_task
            }
        })
    }
    
    /**
     * 
     * @param id_user User ID for created by.
     * @param title Title of the task.
     * @param description Short description for your task
     * @param status Status of the task. Status: Done, Cancel, Pending.
     * @param project Project ID.
     * @param start_date Start date of the task.
     * @param end_date End date of the task.
     * @returns {Promise<Task>}
     */
    async createTaskByIdUser(id_user: number, title: string, description: string, status: string, project: number, start_date: Date, end_date: Date): Promise <Task> {
        return this.taskModel.create({
            title,
            description,
            status,
            project,
            created_by: id_user,
            start_date,
            end_date
        })
    }

    async getLastTask(): Promise <Task> {
        return this.taskModel.findOne({
            order: [[ 'id', 'DESC' ]]
        })
    }

    /**
     * 
     * @param id_user ID User for created by
     * @returns {Promise<Task>}
     */
    async getTaskByIdUser(id_user: number): Promise<Task> {
        return this.taskModel.findOne({
            where: {
                created_by: id_user
            }
        })
    }
}