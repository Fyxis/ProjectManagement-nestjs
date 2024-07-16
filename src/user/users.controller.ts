/* eslint-disable prettier/prettier */
import { Controller, Get, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from 'src/user/users.service'

@Controller()
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getAllUser(@Res() res: Response){
        try {
            const user =  await this.userService.getAllUser()
            return res.status(200).json({ 
                message: `Success Get All User`,
                data: user
            })
        } catch (error) {
            return res.status(500).json({ 
                message: `Server Error`,
                messageServer: error
            })
        }
    }

    @Get('/:id')
    async getUserById(@Res() res: Response, @Param() param: { id: number }) {
        const { id } = param
        try {
            const data = await this.userService.getUserById(id)
            return res.status(200).json({
                message: `Success Get User By ID`,
                data: data
            })
        } catch(error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
        }
    }
}