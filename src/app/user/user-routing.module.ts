import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserEditComponent } from './user-edit/user-edit.component';


const routes: Routes = [
  { path: 'user-detail', component: UserComponent, title: 'User Detail' },
  { path: 'user-edit', component: UserEditComponent, title: 'User Edit' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
