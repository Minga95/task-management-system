import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskListComponent } from './component/task-list/task-list.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';


const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '' }  // Redirect all unknown routes to the task list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
