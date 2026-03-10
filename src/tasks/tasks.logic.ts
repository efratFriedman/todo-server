import { Injectable, NotFoundException } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "./entities/task.entity";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TasksLogic {
  constructor(private readonly tasksService: TasksService) {}

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const taskData = { ...dto, createdAt: new Date().toISOString() };
    return this.tasksService.create(taskData);
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async updateTask(id: string, dto: UpdateTaskDto): Promise<Task> {
    const updated = await this.tasksService.update(id, dto);
    if (!updated) throw new NotFoundException(`Task with id ${id} not found`);
    return updated;
  }

  async removeTask(id: string): Promise<void> {
    const task = await this.tasksService.findOne(id);
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return this.tasksService.remove(id);
  }
}