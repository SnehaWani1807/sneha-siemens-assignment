import { Component, OnInit } from '@angular/core';
import { EmployeeServiceService } from '../employee-service.service';

@Component({
  selector: 'app-deleted-employee',
  templateUrl: './deleted-employee.component.html',
  styleUrls: ['./deleted-employee.component.scss']
})
export class DeletedEmployeeComponent implements OnInit {
  deletedEmployee: any;

  deletedEmployeeLists: any = [];

  constructor(private employeeService: EmployeeServiceService) { }

  ngOnInit(): void {
    this.getDeletedEmployee();
    // this.makeList();
  }

  getDeletedEmployee() {
    this.employeeService.getData().subscribe(data => {
      // do stuff with the data, for example:
      this.deletedEmployee = data.text;
      console.log('Deleted Employee:', this.deletedEmployee);
      this.makeList();     
    }
    );
  }

  makeList() {
    this.deletedEmployeeLists.push(this.deletedEmployee);
    console.log('Deleted Employee Lists: ', this.deletedEmployeeLists);
  }
  
  restoreEmp(empId, i) {
    console.log('Employee Restored ID:', empId);
    console.log('Employee Restored Record:', this.deletedEmployeeLists[i]);
    this.employeeService.setData(this.deletedEmployeeLists[i]);
    this.deletedEmployeeLists = this.deletedEmployeeLists.filter(element => {
      if(element.id !== this.deletedEmployeeLists[i].id) {
        console.log('Filtered List');
        // this.filteredEmpLists.push(this.employeeLists[i]);
        return element;
        // delete this.employeeLists[i];
      }
    });
    console.log('Filtered Deleted List', this.deletedEmployeeLists);
  }
  

  // get data(): any {
  //   return this.employeeService.sharedData;
  // }

  


}
