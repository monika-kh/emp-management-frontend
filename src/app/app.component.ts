import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from './local.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Employee Management';

  constructor(
    private localService: LocalService,
    private router: Router
  ) { }

  token: string | undefined;
  type: string | undefined;
  user_id: string | undefined;
  emp_id: string | undefined;

  ngOnInit(): void {
    this.token = this.localService.getToken('token');
    this.type = this.localService.getUserType('user_type');
    this.user_id = this.localService.getUserId('user_id');
    if (this.token != '') {
      if (this.type == 'HR') {
        this.router.navigateByUrl('dashboard');
      } else if (this.type == 'EMP') {
        this.router.navigateByUrl('user-detail');
      }
    } else {
      this.router.navigateByUrl('')
    }
  }

}