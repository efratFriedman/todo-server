import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import type { Task, TaskPriority, TaskStatus } from '../entities/task.entity';

export type TaskDocument = Task & Document;

@Schema()
export class TaskModel implements Omit<Task, 'id'> {
    @Prop({ required: true })
    title: string;

    @Prop()
    description: string;

    @Prop({ default: 'pending', enum: ['pending', 'in-progress', 'completed'] })
    status: TaskStatus;

    @Prop({ default: 'medium', enum: ['low', 'medium', 'high'] })
    priority: TaskPriority;

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