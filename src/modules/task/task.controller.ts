import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../account/account.guard';
import { CommonErrorResponses } from 'src/shares/decorators/common-error-response.decorator';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { QueryTaskDto } from './dto/query-task.dto';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}
  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'createTask',
    description: 'Create Task',
  })
  @ApiResponse({
    type: CreateTaskDto,
    status: HttpStatus.OK,
    description: 'Create task successfully',
  })
  @CommonErrorResponses()
  @Post('create')
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'updateTask',
    description: 'update Task',
  })
  @ApiResponse({
    type: UpdateTaskDto,
    status: HttpStatus.OK,
    description: 'update task successfully',
  })
  @CommonErrorResponses()
  @Put('update')
  async updateTask(@Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.updateTask(updateTaskDto);
  }

  @UseGuards(AuthGuard)
  @ApiOperation({
    operationId: 'queryTask',
    description: 'query Task',
  })
  @ApiResponse({
    type: QueryTaskDto,
    status: HttpStatus.OK,
    description: 'query task successfully',
  })
  @CommonErrorResponses()
  @Get('query')
  async queryTask(@Query() queryTaskDto: QueryTaskDto) {
    return await this.taskService.queryTask(queryTaskDto);
  }
}
