import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { TaskDocument, TaskModel } from './schemas/task.schema';
import { TasksGateway } from './tasks.gateway';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(TaskModel.name) private taskModel: Model<TaskDocument>,
    private readonly tasksGateway: TasksGateway
  ) { }

  async create(createTaskDto: CreateTaskDto) {
    const task = new this.taskModel({ ...createTaskDto, createdAt: new Date().toISOString() });
    const saved = await task.save();
    this.tasksGateway.sendTaskCreated(saved);
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
    if (updated) this.tasksGateway.sendTaskUpdated(updated);
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.taskModel.findByIdAndDelete(id).exec();
    if (deleted) this.tasksGateway.sendTaskDeleted(deleted.id);
  }
}