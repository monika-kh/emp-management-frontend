import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalService } from '../local.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  token: string | undefined;
  type: string | undefined;
  empdetaillist : boolean = false;
  constructor(
    private router: Router,
    private localService: LocalService,) { }

    
  ngOnInit(): void {
    this.token = this.localService.getToken('token');
    this.type = this.localService.getUserType('user_type');
   }
  
  onBtnClick(){
    this.router.navigate(['/employee/add_attendence']);
  }

  onProfileClick(){
    this.router.navigate(['user-detail'])
  }

  onEditClick(){
    this.router.navigate(['user-edit'])
  }

  getStaff(){
    this.router.navigate(['/staff'])
    console.log("get all staff contact details")
    // return (this.empdetaillist == true)
  }

  logout(): void{
      if (this.token){
        this.localService.clearToken();
        window.location.reload();
       
      }
  }
}
