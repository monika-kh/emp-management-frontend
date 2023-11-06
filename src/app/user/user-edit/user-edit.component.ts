import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, NgForm } from '@angular/forms';
import { UsersService } from '../users.service';
import { AllUser, Employee, Technology } from 'src/app/emp.model';
import { LocalService } from 'src/app/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private localService: LocalService,
    private router: Router,
    private _eref: ElementRef
  ) { }

  detail: Employee | any;
  userForm!: FormGroup;
  userid: string | undefined;
  u_id: string | undefined;
  id: number | undefined;
  department: string | undefined;
  email: string | undefined;
  firstname: string | undefined;
  lastname: string | undefined;
  type: string | undefined
  technology: Technology | any
  phone_number: string | undefined;
  address: string | undefined;
  city: string | undefined;
  tech_list !: []
  technologies_familiar_with: [] | undefined
  selectedOptions: any[] = [];
  showOptions = false;
  searchTerm = '';

  private previouslySelectedOptions: string[] = [];

  ngOnInit(): void {
    this.userid = this.localService.getEmpId('emp_id');
    this.id = parseInt(this.userid)
    this.initForm();
    this.getDetail();
    this.getTechlist()
    this.previouslySelectedOptions = this.userForm.value.technologies_familiar_with || [];
  }

  private initForm() {

    this.userForm = this.formBuilder.group({
      id: [null],
      firstname: [''],
      lastname: [''],
      username: [''],
      department: [''],
      email: [''],
      phone_number: [''],
      user_id: [null],
      technologies_familiar_with: [[]],
      address: [''],
      city: ['']
    });
  }

  getDetail() {
    this.userService.getUserdetail(this.id).subscribe((data: any) => {
      this.detail = data;
      this.tech_list = this.detail.employee.tech_list;
    })
  }


  getTechlist() {
    this.userService.getTechnologyList().subscribe((data: any) =>
      this.technology = data)
  }

  isSelected(techName: string): boolean {
    const selectedTechs = this.userForm.get('technologies_familiar_with')?.value;
    return selectedTechs?.includes(techName);
  }

  isNewSelected(techName: string): boolean {
    const selectedTechs = this.userForm.get('technologies_familiar_with')?.value;
    const wasSelected = this.previouslySelectedOptions.includes(techName);
    const isSelectedNow = selectedTechs?.includes(techName);
    return isSelectedNow && !wasSelected;
  }

  toggleOption(techName: string) {

    
    const selectedTechs = this.userForm.get('technologies_familiar_with') as FormControl;
    const index = this.selectedOptions.indexOf(techName);

    if (index === -1) {
      this.selectedOptions.push(techName);
      this.previouslySelectedOptions.push(techName);
    } else {
      this.selectedOptions.splice(index, 1);
      const prevIndex = this.previouslySelectedOptions.indexOf(techName);
      if (prevIndex !== -1) {
        this.previouslySelectedOptions.splice(prevIndex, 1);
      }
    }

    selectedTechs.setValue(this.selectedOptions); // Update the form control with the new values
  }

  closeDropDown() {
    this.showOptions = true;
    console.log('clicked outside');
  }


  onUpdate() {
    this.u_id = this.localService.getUserId('user_id');

    // Get the selected options from the selectedOptions array
    const selectedTechs = this.selectedOptions.length > 0 ? this.selectedOptions : this.userForm.value['technologies_familiar_with'];

    // Update the technologies_familiar_with form control with the selected options
    const technologiesFamiliarWithControl = this.userForm.get('technologies_familiar_with') as FormControl;
    technologiesFamiliarWithControl.setValue(selectedTechs);
    debugger
    const data = {
      first_name: this.userForm.value['firstname'],
      last_name: this.userForm.value['lastname'],
      user_name: this.userForm.value['username'],
      department: this.userForm.value['department'],
      phone_number: this.userForm.value['phone_number'],
      address: this.userForm.value['address'],
      city: this.userForm.value['city'],
      technologies_familiar_with: selectedTechs,
      user: this.u_id
    };

    this.userService.updateUserdetail(this.u_id, data).subscribe((data: any) => {
      this.router.navigateByUrl('user-detail');
      console.log(data);
    });
  }

}


