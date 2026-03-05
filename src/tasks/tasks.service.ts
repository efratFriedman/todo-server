import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { v4 as uuidv4 } from 'uuid'; 
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      "id": "1",
      "title": "Set up project architecture",
      "description": "Initialize React app with SCSS and folder structure.",
      "status": "completed",
      "priority": "high",
      "createdAt": "2026-02-01T10:00:00Z"
    },
    {
      "id": "2",
      "title": "Configure Zustand store",
      "description": "Create a store for global UI state like filters and theme.",
      "status": "in-progress",
      "priority": "medium",
      "createdAt": "2026-02-02T14:30:00Z"
    },
    {
      "id": "3",
      "title": "Implement React Query hooks",
      "description": "Write custom hooks for fetching and mutating task data.",
      "status": "pending",
      "priority": "high",
      "createdAt": "2026-02-03T09:15:00Z"
    },
    {
      "id": "4",
      "title": "Style Dashboard with SCSS",
      "description": "Apply BEM naming and use variables for the color palette.",
      "status": "pending",
      "priority": "low",
      "createdAt": "2026-02-04T11:00:00Z"
    },
    {
      "id": "5",
      "title": "Add Optimistic Updates",
      "description": "Use React Query to update the UI before the server responds.",
      "status": "pending",
      "priority": "medium",
      "createdAt": "2026-02-05T16:45:00Z"
    }

  ];
  create(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: uuidv4(),
      ...createTaskDto,
      status:"pending",
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(newTask);
    return newTask;
  }

  findAll(): Task[] {
    return this.tasks;
  }

  findOne(id: string): Task {
    const task = this.tasks.find((task) => task.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return task;
  }

  update(id: string, updateTaskDto: UpdateTaskDto): Task {
    const task = this.findOne(id);
    Object.assign(task, updateTaskDto);
    return task;
  }

  remove(id: string): void {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`Task ${id} not found`);
    }
    this.tasks.splice(index, 1);
  }
}
