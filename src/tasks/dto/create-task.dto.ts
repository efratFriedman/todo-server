import { IsIn, IsNotEmpty, IsString } from "class-validator";
import type { TaskPriority, TaskStatus } from "../entities/task.entity";

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    description: string;

    @IsIn(['pending', 'in-progress', 'completed'])
    status: TaskStatus;

    @IsIn(['low', 'medium', 'high'])
    priority: TaskPriority;

}
