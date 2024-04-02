import { Component } from '@angular/core';
import { Task } from '../task.model';
import { Subscription } from 'rxjs';
import { TaskService } from '../task.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  tasks: Task[];
  subscription: Subscription;

  constructor(
    public dialog: MatDialog,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.subscription = this.taskService.tasksChanged.subscribe(
      (tasks: Task[]) => {
        this.tasks = tasks;
      }
    );
  }

  onUpdate(index: number): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      id: this.tasks[index].id,
      title: this.tasks[index].title,
      description: this.tasks[index].description,
      category: this.tasks[index].category,
      dueDate: this.tasks[index].dueDate,
    };

    dialogConfig.id = index.toString();

    this.dialog.open(TaskEditComponent, dialogConfig);
  }

  onDelete(index: number): void {
    this.dataStorageService.deleteTask(this.tasks[index].id);
    this.taskService.deleteTask(index);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
