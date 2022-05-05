import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'f030a047-3011-414d-8e5b-981d81460fbb',
      title: 'Learn Nestjs',
      description: 'FrameWork Nestjs',
      status: TaskStatus.OPEN,
    },
    {
      id: 'c2e294bb-f81b-4ea5-bbc8-801b818fabe8',
      title: 'Learn Nextjs',
      description: 'FrameWork Nextjs',
      status: TaskStatus.OPEN,
    },
    {
      id: '8f1ed204-224a-47ef-a6eb-d2db84044ac9',
      title: 'Learn Expressjs',
      description: 'FrameWork Expressjs',
      status: TaskStatus.OPEN,
    },
    {
      id: '5807de2d-4e81-4eff-9dbd-37092fc383ee',
      title: 'Learn Reactjs',
      description: 'FrameWork Reactjs',
      status: TaskStatus.OPEN,
    },
  ];
  getAllTasks(): Task[] {
    return this.tasks;
  }
  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    if (status) {
      tasks = tasks.filter((task) => task.status === status.toUpperCase());
    }
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }
    return tasks;
  }
  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);
    if (!found) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return found;
  }
  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }
  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
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
}
