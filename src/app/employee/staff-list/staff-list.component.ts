import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { Employee } from 'src/app/emp.model';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.css']
})
export class StaffListComponent {
  emplistdata: any[] | undefined;
  cities: any[] | undefined;
  usernames: any[] | undefined;
  dataSource: any[] = [];
  displayedColumns: string[] | undefined
  public searchForm: FormGroup | any;
  name: string | undefined
  city: string | undefined;
  selectedValue: string | undefined;
  selectedName: string | undefined;
  filtered_emp: any[] = [];
  filtereddata = false;
  constructor(
    private router: Router,
    private empService: EmployeeService,
  ) { }
  
  ngOnInit(){
    this.get_staff_details();
    this.getCities();
    this.searchFormInit();
    this.getNames();

  }
  get_staff_details(): any {
      this.empService.getAllEmpDetails().subscribe((data)=>{
        this.dataSource = data
        this.displayedColumns = ['id', 'username', 'name','department', 'tech_known','address', 'city', 'contact']
        // console.log(this.dataSource)
      });
    
  }

  // applyFilters():any{
  //   debugger
  //   const name = this.searchForm.get('name').value;
  //   const city = this.searchForm.get('city').value;

  //   this.name = name === null ? '' : name;
  //   this.city = city === null ? '' : city;

  //   // create string of our searching values and split if by '$'
  //   const filterValue = this.name + '$' + this.city ;
  //   // this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  searchFormInit() {
    this.searchForm = new FormGroup({
      // name: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      city: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
      user: new FormControl('', Validators.pattern('^[a-zA-Z ]+$')),
    });
  }

  filterData(){
    this.filtereddata = true
    const city = this.searchForm.value['city'] ? this.searchForm.value['city']: ''
    const firstname = this.searchForm.value['user'] ? this.searchForm.value['user']: ''
    this.empService.get_searched_data(city, firstname).subscribe((data) => {
      this.filtered_emp = data
      this.displayedColumns = ['id', 'username', 'name','department', 'tech_known','address', 'city', 'contact']
      console.log(this.filtered_emp)
    });
  }

  getCities(){
    this.empService.getAllCities().subscribe((data)=>{
      this.cities = data
    })
  }

  getNames(){
    this.empService.getUserNames().subscribe((data)=>{
      this.usernames = data
    })
  }
}
