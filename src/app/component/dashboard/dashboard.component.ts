import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/service/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTasks: number = 0;
  completedTasks: number = 0;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.totalTasks = tasks.length;
      this.completedTasks = tasks.filter(task => task.status === 'Done').length;
    });
  }
}
