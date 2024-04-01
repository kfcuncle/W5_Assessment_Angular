import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../data-storage.service';
import { Task } from './task.model';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  task: Task;

  constructor(
    public dialog: MatDialog,
    private dataStorageService: DataStorageService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.dataStorageService.fetchTasks().subscribe((response) => {});
  }

  onAdd(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(TaskEditComponent, dialogConfig);
  }
}
