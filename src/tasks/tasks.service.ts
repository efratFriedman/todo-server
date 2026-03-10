import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { TaskDocument, TaskModel } from "./schemas/task.schema";
import { Model } from "mongoose";
import { Task } from "./dto/create-task.dto";

@Injectable()
export class TasksService {
    constructor(@InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>) { }

    async create(taskData: Partial<Task> & { createdAt: string }): Promise<Task> {
        const task = new this.taskModel(taskData);
        return task.save();
    }

    async findAll(): Promise<Task[]> {
        return this.taskModel.find().exec();
    }

    async findOne(id: string): Promise<Task | null> {
        return this.taskModel.findById(id).exec();
    }

    async update(id: string, updateData: Partial<Task>): Promise<Task | null> {
        return this.taskModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async remove(id: string): Promise<void> {
        await this.taskModel.findByIdAndDelete(id).exec();
    }
}