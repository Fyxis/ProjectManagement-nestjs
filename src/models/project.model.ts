/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Project extends Model<Project> {
    @Column
    project_name: string

    @Column
    description: string

    @Column
    photo: string

    @Column
    start_date: Date

    @Column
    end_date: Date

    @Column
    created_by: number
}
