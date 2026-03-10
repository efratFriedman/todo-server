import { TaskPriorityEnum } from "../enums/task-priority.enum";
import { TaskStatusEnum } from "../enums/task-status.enum";

export class Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatusEnum;
    priority: TaskPriorityEnum;
    createdAt: string;
}
