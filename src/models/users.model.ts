/* eslint-disable prettier/prettier */
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  role: string;

  @Column
  phone: number;

  @Column
  photo: string;

  @Column
  password: string;
    User: any;

}
