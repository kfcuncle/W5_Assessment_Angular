import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskService } from './task/task.service';
import { Task } from './task/task.model';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from './environment/environment';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private taskService: TaskService) {}

  fetchTasks() {
    return this.http.get<Task[]>(environment.baseUrl + '/tasksExist').pipe(
      tap((tasks) => {
        this.taskService.setTasks(tasks);
      })
    );
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(environment.baseUrl, task);
  }

  updateTask(task: Task) {
    this.http.put(environment.baseUrl, task).subscribe((response) => {
      console.log(response);
    });
  }

  deleteTask(id: number) {
    this.http.delete(environment.baseUrl + '/' + id).subscribe((response) => {
      console.log(response);
    });
  }
}
