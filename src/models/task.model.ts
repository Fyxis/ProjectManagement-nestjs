/* eslint-disable prettier/prettier */
import { Column, Model, Table } from "sequelize-typescript";

@Table
export class Task extends Model<Task> {
    @Column
    title: string

    @Column
    description: string

    @Column
    status: string

    @Column
    project: number

    @Column
    created_by: number

    @Column
    start_date: Date

    @Column
    end_date: Date
    
}