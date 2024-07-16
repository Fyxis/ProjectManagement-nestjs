/* eslint-disable prettier/prettier */
import { AuthModule } from "./auth/auth.module";
import { ProjectModule } from "./project/project.module";
import { TaskModule } from "./task/task.module";
import { UsersModule } from "./user/users.module";

const route = {
    path: '',
    children: [
        { path: 'auth', module: AuthModule },
        { path: 'projects', module: ProjectModule },
        { path: 'users', module: UsersModule },
        { path: 'tasks', module: TaskModule },
    ],
}

export default route