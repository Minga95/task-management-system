import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { TaskService } from 'src/app/service/task.service';
import { Task, TaskStatus } from 'src/app/model/task.model';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  filter: string = '';
  sortBy: string = 'title';
  statuses: TaskStatus[] = ['To Do', 'In Progress', 'Done'];
  filteredTasks: { [key: string]: Task[] } = {};

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateFilteredTasks();
    });
  }

  updateFilteredTasks(): void {
    this.filteredTasks = this.statuses.reduce((acc, status) => {
      acc[status] = this.tasks
        .filter(task => (this.filter === '' || task.status === this.filter))
        .filter(task => task.status === status)
        .sort((a, b) => this.sortBy === 'title' ? a.title.localeCompare(b.title) : a.status.localeCompare(b.status));
      return acc;
    }, {} as { [key: string]: Task[] });
  }

  openDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '400px',
      data: {
        task: task ? { ...task } : { id: 0, title: '', description: '', status: 'To Do' as TaskStatus }
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id === 0) {
          this.tasks.push(result);
        } else {
          const index = this.tasks.findIndex(t => t.id === result.id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
        }
        this.updateFilteredTasks();
      }
    });
  }

  editTask(task: Task): void {
    this.openDialog(task);
  }

  deleteTask(task: Task): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.updateFilteredTasks();
    }
  }

  onDrop(event: CdkDragDrop<Task[]>): void {
    const task: Task = event.item.data;
    const previousContainer = event.previousContainer;
    const currentContainer = event.container;

    if (previousContainer !== currentContainer) {
      const previousStatus = previousContainer.id as TaskStatus;
      const newStatus = currentContainer.id as TaskStatus;

      // Aggiorna lo stato dell'attività
      task.status = newStatus;

      // Rimuovi il task dal suo stato precedente
      this.tasks = this.tasks.filter(t => t.id !== task.id);

      // Aggiungi il task al nuovo stato
      this.tasks.push(task);

      // Rifresca la lista delle attività per aggiornare l'interfaccia utente
      this.updateFilteredTasks();
    }
  }
}
