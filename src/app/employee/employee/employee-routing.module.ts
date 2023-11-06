import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddattendenceComponent } from '../addattendence/addattendence.component';
import { EmployeeComponent } from '../employee.component';
import { StaffListComponent } from '../staff-list/staff-list.component';

const routes: Routes = [

  {
    path: 'employee',
    component: EmployeeComponent,
    children: [
      { path: 'add_attendence', component: AddattendenceComponent, title: 'add-attendence' }
    ]
  },
  {
    path: 'staff',
    component: StaffListComponent,
    // children: [
    //   { path: 'add_attendence', component: AddattendenceComponent, title: 'add-attendence' }
    // ]
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
