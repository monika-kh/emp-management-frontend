import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { LocalService } from '../local.service';
import { Employee } from '../emp.model';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent {

  detail: Employee | any;
  user_id: string | undefined;
  id: number | undefined;
  type: string | undefined;
  tech: string | undefined;

  constructor(
    private router: Router,
    private userService: UsersService,
    private localService: LocalService

  ) { }


  ngOnInit(): void {
    this.type = this.localService.getUserType('user_type');
    this.user_id = this.localService.getEmpId('emp_id');
    this.id = parseInt(this.user_id)
    this.getDetail()
  }

  getDetail() {
    if (this.id){
      this.userService.getUserdetail(this.id).subscribe((data: any) => {
        this.detail = data.employee;
        console.log('=========', this.detail)      
      }
  
      )
    }
   
  }

  onButtonClick(){
    this.router.navigate(['user-edit'])
  }
}




// calculate working days of a month
// const workdaysCount = () => 
//   [...new Array(new Date().getDate())]
//     .reduce((acc, _, monthDay) => {
//       const date = new Date()
//       date.setDate(1+monthDay)    
//       ![0, 6].includes(date.getDay()) && acc++
//       return acc      
//     }, 0)
    
// console.log(workdaysCount()) 