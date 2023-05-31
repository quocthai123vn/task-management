import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}
  async createTask(createTaskDto: CreateTaskDto) {
    const { title, content } = createTaskDto;
    const task = this.taskRepository.create({ title, content });
    return await this.taskRepository.save(task);
  }

  async updateTask(updateTaskDto: UpdateTaskDto) {
    const updatedFields: Partial<UpdateTaskDto> = {};

    for (const [key, value] of Object.entries(updateTaskDto)) {
      if (value !== undefined && value.trim() !== '') {
        updatedFields[key] = value;
      }
    }
    const task = await this.taskRepository.update(
      { _id: updateTaskDto.taskId },
      updatedFields,
    );
    return task;
  }
}
