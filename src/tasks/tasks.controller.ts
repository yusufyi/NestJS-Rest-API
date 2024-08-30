import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.models';
import { CreateTaskDto } from './dto/create-tasks.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //This route is protected by the JwtAuthGuard
  //Only requests with a valid JWT token will be able to access this route
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProtectedTask() {
    return { message: 'Your token is valid, you accessed a protected route' };
  }

  //This route is not protected by the JwtAuthGuard
  //It is accessible to everyone
  //The route is used to get all tasks
  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    //if we have any filters defined, call tasksService.getTasksWithFilters
    //otherwise, just get all tasks
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  //This route is not protected by the JwtAuthGuard
  //It is accessible to everyone
  //The route is used to get a task by its id
  //The id is passed as a route parameter
  //The route parameter is accessed using the @Param decorator
  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  //This route is used to delete a task by its id
  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    this.tasksService.deleteTask(id);
  }

  //This route is used to update the status of a task
  //The id is passed as a route parameter
  //The status is passed as a body parameter
  //The route parameter is accessed using the @Param decorator
  //The body parameter is accessed using the @Body decorator
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }

  //This route is used to create a new task
  //The task details are passed as a body parameter
  //The body parameter is accessed using the @Body decorator
  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }
}
