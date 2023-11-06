import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import  *  as CryptoJS from  'crypto-js';

@Component({
  selector: 'app-loginuser',
  templateUrl: './loginuser.component.html',
  styleUrls: ['./loginuser.component.css']
})
export class LoginuserComponent {
  constructor(
    private router: Router,
    private loginService: LoginService
  ){}

email : string | undefined
password : string | undefined
token: string | undefined
type: string | undefined
user_id: string | undefined
emp_id: string | undefined


loginForm: FormGroup = new FormGroup({
  email: new FormControl('', Validators.required),
  password: new FormControl('', Validators.required)
});

ngOnInit(): void { }

goToRegister(){
  this.router.navigateByUrl('/register');
  
}

loginUser(){
  const loginData = {
    email: this.loginForm.value['email'],
    password: this.loginForm.value['password']
  }
  this.loginService.loginUser(loginData).subscribe(
    (response:any) => {
        localStorage.setItem('token', (response["access"]));
        localStorage.setItem('user_type', (response["user_type"]));
        localStorage.setItem('user_id', (response["user_id"]));
        localStorage.setItem('emp_id', (response["employee_id"]));
        // localStorage.setItem('token', CryptoJS.AES.encrypt(response["access"], response["access"]).toString())
        if (response['user_type'] == "HR"){
          this.router.navigate(['/dashboard']);
            window.location.reload();
        }
        if (response['user_type'] == "EMP"){
          this.router.navigateByUrl( 'user-detail');
          window.location.reload();
        }
  
    },
    (error) => {
      console.log(error);
    }
  )    
}


}


