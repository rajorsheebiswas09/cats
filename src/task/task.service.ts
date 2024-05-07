import { Injectable, Logger } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from 'nestjs-typegoose';
import { Task } from '../models/task.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../models/user.model';
import { Types } from 'mongoose';

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);
  constructor(
    @InjectModel(Task) private readonly taskModel: ReturnModelType<typeof Task>,
  ) {}

  create(createTaskDto: CreateTaskDto, user: User) {
    this.logger.log('New Task Creation');
    this.logger.log(createTaskDto);
    this.logger.log(user);
    return this.taskModel.create({ ...createTaskDto, ...{ user: user._id } });
  }

  findAll() {
    this.logger.log('Finding All Tasks');
    return this.taskModel.find({});
  }

  findOne(id: Types.ObjectId) {
    this.logger.log('Finding a Task By Id');
    this.logger.log(id);
    return this.taskModel.findById(id);
  }

  update(id: Types.ObjectId, updateTaskDto: UpdateTaskDto) {
    this.logger.log('updating a task');
    this.logger.log(id);
    return this.taskModel.findByIdAndUpdate(
      id,
      {
        $set: updateTaskDto,
      },
      {
        new: true,
      },
    );
  }

  remove(id: Types.ObjectId) {
    this.logger.log('Deleting a task');
    this.logger.log(id);
    return this.taskModel.findByIdAndDelete(id);
  }
}
