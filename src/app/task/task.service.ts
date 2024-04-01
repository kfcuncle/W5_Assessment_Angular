import { Injectable } from '@angular/core';
import { Task } from './task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  tasksChanged = new Subject<Task[]>();
  private tasks: Task[];

  constructor() {}

  setTasks(tasks: Task[]) {
    this.tasks = tasks;
    this.tasksChanged.next(this.tasks.slice());
  }

  getTasks() {
    return this.tasks.slice();
  }

  getTask(id: number) {
    return this.tasks[id];
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.tasksChanged.next(this.tasks.slice());
  }

  updateTask(id: number, newTask: Task) {
    this.tasks[id] = newTask;
    this.tasksChanged.next(this.tasks.slice());
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksChanged.next(this.tasks.slice());
  }
}
