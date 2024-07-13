/* eslint-disable prettier/prettier */
import { AppController } from './app.controller';
import { UsersController } from './users.controller';
import { ProjectController } from './project.controller';
import { AuthController } from './auth.controller';

const defineController = [
    AppController,
    UsersController,
    ProjectController,
    AuthController
]

export default defineController