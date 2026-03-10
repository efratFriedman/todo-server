import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { Task } from '../entities/task.entity';
import { TaskStatusEnum } from '../enums/task-status.enum';
import { TaskPriorityEnum } from '../enums/task-priority.enum';

export type TaskDocument = Task & Document;

@Schema()
export class TaskModel implements Omit<Task, 'id'> {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: TaskStatusEnum.Pending, enum: Object.values(TaskStatusEnum) })
    status: TaskStatusEnum;

    @Prop({ default: TaskPriorityEnum.Low, enum: Object.values(TaskPriorityEnum) })
    priority: TaskPriorityEnum;

    @Prop({ default: () => new Date().toISOString() })
    createdAt: string;
}

export const TaskSchema = SchemaFactory.createForClass(TaskModel);

TaskSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: (_, ret: any) => {
        ret.id = ret._id;
        delete ret._id;
    },
});