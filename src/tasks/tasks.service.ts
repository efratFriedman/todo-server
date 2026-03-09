import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDocument, TaskModel } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel({ ...createTaskDto, createdAt: new Date().toISOString() });
    const saved = await task.save();
    return saved;
  }

  async findAll(): Promise<Task[]> {
    return this.taskModel.find().exec();
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const updated = await this.taskModel.findByIdAndUpdate(id, updateTaskDto, { new: true }).exec();
    return updated;
  }

  async remove(id: string) {
    await this.taskModel.findByIdAndDelete(id).exec();
  }
}