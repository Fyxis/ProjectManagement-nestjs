/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Res, Body, Param, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { UsersService } from 'src/services/users.service'
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('/users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Get()
    async getUser(@Res() res){
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
    async getUserById(@Res() res, @Param() param) {
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

    @Post('/register')
    @UseInterceptors(NoFilesInterceptor()) //* Form Body without sending files
    async register(@Res() res, @Body() body) {
        console.log(body)
        const { name, email, role, phone, photo, password } = body
        try {
            const data = await this.userService.register(name, email, role, phone, photo, password)
            return res.status(200).json({
                message: `Register Successfully`,
                data: data
            })
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
            
        }
    }

    @Post('/register-with-image')
    @UseInterceptors(FilesInterceptor('image')) //* Form Body with sending files
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>, @Res() res, @Body() body) {
        console.log(files)
        const { name, email, role, phone, photo, password } = body
        try {
            const data = await this.userService.register(name, email, role, phone, photo, password)
            return res.status(200).json({
                message: `Register Successfully`,
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