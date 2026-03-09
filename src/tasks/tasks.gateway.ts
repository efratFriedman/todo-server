import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Injectable } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    
  }, 
})
@Injectable()
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  sendTaskCreated(task: any) {
    this.server.emit('task-created', task);
  }

  sendTaskUpdated(task: any) {
    this.server.emit('task-updated', task);
  }

  sendTaskDeleted(taskId: string) {
    this.server.emit('task-deleted', taskId);
  }
}