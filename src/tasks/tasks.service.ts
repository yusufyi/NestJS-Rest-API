import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.models';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-tasks.dto';
@Injectable()
export class TasksService {
  //Tasks Array to store tasks in memory
  //Add sample tasks to the array
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Task 1',
      description: 'Task 1 Description',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Task 2',
      description: 'Task 2 Description',
      status: TaskStatus.IN_PROGRESS,
    },
    {
      id: '3',
      title: 'Task 3',
      description: 'Task 3 Description',
      status: TaskStatus.DONE,
    },
  ];

  //Get all tasks
  //Return all tasks in the tasks array
  getAllTasks(): Task[] {
    return this.tasks;
  }

  //Get tasks with filters
  //Return tasks that match the filter criteria
  //The filter criteria are passed in the filterDto object
  //The filter criteria are the status and search fields
  getTasksWithFilters(filterDto: any): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    //If the status field is defined, filter tasks by status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    //If the search field is defined, filter tasks by title or description
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }
    return tasks;
  }

  //Get task by id
  //Return the task with the specified id
  //If the task is not found, throw a NotFoundException
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException();
    } else {
      return this.tasks.find((task) => task.id === id);
    }
    return this.tasks.find((task) => task.id === id);
  }

  //Create a new task
  //Create a new task with the specified title and description
  //Add the new task to the tasks array
  //Return the new task
  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  //Delete a task by id
  //Remove the task with the specified id from the tasks array
  //If the task is not found, throw a NotFoundException
  deleteTask(id: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  //Update the status of a task
  //Update the status of the task with the specified id
  //Return the updated task
  //If the task is not found, throw a NotFoundException
  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
