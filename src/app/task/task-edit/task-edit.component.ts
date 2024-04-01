import { TaskService } from './../task.service';
import { Task } from './../task.model';
import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DataStorageService } from '../../data-storage.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrl: './task-edit.component.css',
})
export class TaskEditComponent implements OnInit {
  editMode = false;
  taskForm: FormGroup;
  task: Task;
  index: number;

  constructor(
    private taskService: TaskService,
    private dataStorageService: DataStorageService,
    private dialogRef: MatDialogRef<TaskEditComponent>,
    @Inject(MAT_DIALOG_DATA) data: Task
  ) {
    this.task = data;
  }

  ngOnInit() {
    this.editMode = this.task != null;
    this.index = +this.dialogRef.id;
    this.initForm();
  }

  private initForm() {
    let title = '';
    let description = '';
    let category = '';
    let dueDate = new Date();

    if (this.editMode) {
      title = this.task.title;
      description = this.task.description;
      category = this.task.category;
      dueDate = this.task.dueDate;
    }

    this.taskForm = new FormGroup({
      title: new FormControl(title, Validators.required),
      description: new FormControl(description, Validators.required),
      category: new FormControl(category, Validators.required),
      dueDate: new FormControl(dueDate, Validators.required),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    if (this.editMode) {
      this.task.title = this.taskForm.value.title;
      this.task.description = this.taskForm.value.description;
      this.task.dueDate = this.taskForm.value.dueDate;
      this.task.category = this.taskForm.value.category;
      this.taskService.updateTask(+this.dialogRef.id, this.task);
      this.dataStorageService.updateTask(
        this.taskService.getTask(+this.dialogRef.id)
      );
    } else {
      this.taskService.addTask(this.taskForm.value);
      this.dataStorageService
        .addTask(this.taskForm.value)
        .subscribe((result) => {
          this.dataStorageService.fetchTasks().subscribe(result);
        });
    }
    this.dialogRef.close();
  }
}
