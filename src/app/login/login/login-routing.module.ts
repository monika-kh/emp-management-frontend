import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login.component';
import { LoginuserComponent } from '../loginuser/loginuser.component';
import { RegisterComponent } from '../register/register.component';

const routes: Routes = [

  { path: 'register', component: RegisterComponent, title: 'register' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
