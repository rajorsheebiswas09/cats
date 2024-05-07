import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Task } from 'src/models/task.model';

@Module({
  imports: [TypegooseModule.forFeature([Task])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
