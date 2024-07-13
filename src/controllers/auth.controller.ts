/* eslint-disable prettier/prettier */
import { Body, Controller, Injectable, Post, Res, UploadedFiles, UseInterceptors } from '@nestjs/common'
import { FilesInterceptor, NoFilesInterceptor } from '@nestjs/platform-express'
import { AuthService } from 'src/services/auth.service'
import { DateService } from 'src/services/date.service'
import hashPassword from 'src/middlewares/hashingPassword'
import validatePassword from 'src/middlewares/verifyPassword'
import moment from 'moment'

@Controller('/auth')
@Injectable()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/register')
    @UseInterceptors(FilesInterceptor('photo'))
    async register(@Res() res, @Body() body, @UploadedFiles() files: Array<Express.Multer.File>) {
        const { name, email, role, phone, password } = body
        const photo = files
        console.log(photo)
        try {
            //! Validate Email
            const emailValidate = await this.authService.emailValidate(email)
            if(emailValidate.length != 0) {
                return res.status(401).json({
                    message: `Email Already Used`,
                })
            }

            //! Validate Phone
            const phoneValidate = await this.authService.phoneValidate(phone)
            if(phoneValidate.length != 0) {
                return res.status(401).json({
                    message: `Phone Number Already Used`
                })
            }

            //! Hashing Password
            const hashingPassword = await hashPassword(password)

            const data = await this.authService.register(name, email, role, phone, 'tes.webp', hashingPassword)
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
    
    @Post('/login')
    @UseInterceptors(NoFilesInterceptor())
    async login(@Res() res, @Body() body) {
        const { email, password } = body
        try {
            //! Validate Email
            const verifyEmail = await this.authService.getEmailByEmail(email)
            if(verifyEmail.length == 0) {
                return res.status(401).json({
                    message: `Email Not Found`
                })
            }

            //! Validate Password
            const verifyPassword = await this.authService.getPasswordByEmail(email)
            const hashedPassword = await validatePassword(password, verifyPassword[0].password)
            if(hashedPassword) {
                const data = await this.authService.login(email)
                return res.status(200).json({
                    message: `Login Success`,
                    data: data[0]
                })
            } else {
                return res.status(401).json({
                    message: `User Not Found`
                })
            }
        } catch (error) {
            return res.status(500).json({
                message: `Server Error`,
                messageServer: error
            })
        }
    }
}
