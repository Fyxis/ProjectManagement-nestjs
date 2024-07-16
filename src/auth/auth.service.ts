/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { User } from "src/models/users.model";

@Injectable()
export class AuthService {
    constructor (@InjectModel(User) private readonly authModel: typeof User) {}

    /**
     * 
     * @param name Name for user
     * @param email Email for user
     * @param role Role for user
     * @param phone Phone number for user
     * @param photo User picture profile
     * @param password Hashing password
     * @returns 
     */
    async register(name: string, email: string, role: string, phone: number, photo: string, password): Promise<User> {
        return this.authModel.create({ name, email, role, phone, photo, password });
    }

    /**
     * @param email Email user to login this app
     */
    async login(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
        })
    }

    //! Validasi
    //* Section Register
    
    /**
     * @param email Email user to validate user email
     * @returns {promise<User>}
     */
    async emailValidate(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email,
            }
        })
    }

    /**
     * 
     * @param phone Phone number user to validate user phone number
     * @returns {promise<User>}
     */
    async phoneValidate(phone: number): Promise<User[]>{
        return this.authModel.findAll({
            where: {
                phone: phone
            }
        })
    }

    //* Section Login

    /**
     * 
     * @param email Email user to validate user email
     * @returns {promise<User>}
     */
    async getEmailByEmail(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
            attributes: ['email']
        })
    }

    /**
     * @param email Email user to get password
     * @returns {promise<User>}
     */
    async getPasswordByEmail(email: string): Promise<User[]> {
        return this.authModel.findAll({
            where: {
                email: email
            },
            attributes: ['password']
        })
    }
}