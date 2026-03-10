import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { TaskPriorityEnum } from "../enums/task-priority.enum";

export class CreateTaskDto {
    @ApiProperty({
        description: 'The title of the task',
        example: 'Complete project report'
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        description: 'Detailed description of the task',
        example: 'Write and submit the quarterly project report',
        required: false
    })
    @IsString()
    description: string;

    @ApiProperty({
        description: 'Current status of the task',
        enum: TaskStatusEnum,
        example: TaskStatusEnum.Pending
    })
    @IsIn(Object.values(TaskStatusEnum))
    status: TaskStatusEnum;

    @ApiProperty({
        description: 'Priority level of the task',
        enum: TaskPriorityEnum,
        example: TaskPriorityEnum.Medium
    })
    @IsIn(Object.values(TaskPriorityEnum))
    priority: TaskPriorityEnum;
}

export class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
    priority: TaskPriorityEnum;
    createdAt: string;
}
