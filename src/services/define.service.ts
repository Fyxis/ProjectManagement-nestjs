/* eslint-disable prettier/prettier */
import { AppService } from './app.service';
import { AuthService } from './auth.service';
import { DateService } from './date.service';
import { ProjectService } from './project.service';
import { UsersService } from './users.service';

const defineService = [
    AppService,
    ProjectService,
    UsersService,
    AuthService,
    DateService
]

export default defineService