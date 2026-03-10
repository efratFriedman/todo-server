import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { TasksLogic } from "./tasks.logic";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksLogic: TasksLogic) {}

  @Post()
  async create(@Body() dto: CreateTaskDto) {
    return this.tasksLogic.createTask(dto);
  }

  @Get()
  async findAll() {
    return this.tasksLogic.getAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tasksLogic.getTaskById(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateTaskDto) {
    return this.tasksLogic.updateTask(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.tasksLogic.removeTask(id);
    return { id };
  }
}