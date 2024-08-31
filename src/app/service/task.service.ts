import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [
    { id: 1, title: 'Task 1', description: 'Description 1', status: 'To Do' },
    { id: 2, title: 'Task 2', description: 'Description 2', status: 'In Progress' },
    { id: 3, title: 'Task 3', description: 'Description 3', status: 'Done' }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  // Add methods for CRUD operations
}
