/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/users.model";

@Injectable()
export class AuthService {
    constructor (@InjectModel(User) private readonly authModel: typeof User) {}

    async register(name: string, email: string, role: string, phone: number, photo: string, password): Promise<User> {
        return this.authModel.create({ name, email, role, phone, photo, password });
    }

    async login(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
        })
    }

    //! Validasi
    //* Section Register
    async emailValidate(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email,
            }
        })
    }
    async phoneValidate(phone: number): Promise<User[]>{
        return this.authModel.findAll({
            where: {
                phone: phone
            }
        })
    }

    //* Section Login
    async getEmailByEmail(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
            attributes: ['email']
        })
    }

    async getPasswordByEmail(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
            attributes: ['password']
        })
    }
}