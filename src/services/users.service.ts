/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/users.model'

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async getAllUser(): Promise<User[]> {
    return this.userModel.findAll()
  }

  async getUserById(id): Promise<User> {
    return this.userModel.findByPk(id)
  }

  async register(name: string, email: string, role: string, phone: number, photo: string, password: string): Promise<User> {
    return this.userModel.create({ name, email, role, phone, photo, password });
  }
}
