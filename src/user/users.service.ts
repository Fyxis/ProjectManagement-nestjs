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

  /**
   * 
   * @param id User ID
   * @returns {promise<User>}
   */
  async getUserById(id: number): Promise<User> {
    return this.userModel.findByPk(id)
  }

  /**
   * 
   * @param name Name for user name. Dont use short name!
   * @param email Email user
   * @param role Role user
   * @param phone Phone number user
   * @param photo Photo user
   * @param password Password to login
   * @returns 
   */
  async register(name: string, email: string, role: string, phone: number, photo: string, password: string): Promise<User> {
    return this.userModel.create({ name, email, role, phone, photo, password });
  }
}
