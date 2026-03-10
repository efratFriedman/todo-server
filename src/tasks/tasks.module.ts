import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskModel, TaskSchema } from './schemas/task.schema';
import { TasksLogic } from './tasks.logic';

@Module({
  imports: [MongooseModule.forFeature([{ name: TaskModel.name, schema: TaskSchema }]),
  ],
  controllers: [TasksController],
  providers: [TasksService, TasksLogic],
})
export class TasksModule { }
