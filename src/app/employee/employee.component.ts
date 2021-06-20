import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeServiceService } from '../employee-service.service';
import { PopupComponent } from '../popup/popup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Employee {
  name: string;
  company: {
    name: string;
  };
  address: {
    city: string;
    street: string;
    suite: string;
    zipcode: string;
  };
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  // control = new FormGroup({
  //   employeeName: new FormControl(''),
  //   employeeAddress: new FormControl(''),
  //   employeeCompany: new FormControl('')
  // });

  empNameCtrl = new FormControl();
  empAddressCtrl =  new FormControl();
  empCompanyCtrl = new FormControl();

  filteredEmployees: Observable<Employee[]>;

  filteredEmployeesByAddress: Observable<Employee[]>;

  filteredEmployeesByCompany: Observable<Employee[]>;

  employeeLists: any;
  restoredEmployee: any = [];
  filteredEmpLists: any = [];

  employees: Employee[] = [];

  constructor(private employeeService: EmployeeServiceService,
    public dialog: MatDialog) { 
      console.log('abcd', this.employees);
      this.filteredEmployees = this.empNameCtrl.valueChanges
      .pipe(
        startWith(''),
        map(emp => emp ? this._filterEmployees(emp) : this.employees.slice())
      );

      this.filteredEmployeesByCompany = this.empCompanyCtrl.valueChanges
      .pipe(
        startWith(''),
        map(emp => emp ? this._filterEmployeesByCompany(emp) : this.employees.slice())
      );
      console.log(this.filteredEmployeesByCompany);

      this.filteredEmployeesByAddress = this.empAddressCtrl.valueChanges
      .pipe(
        startWith(''),
        map(emp => emp ? this._filterEmployeesByAddress(emp) : this.employees.slice())
      );
    }

  ngOnInit()   {
    this.getAllEmployeeList();
    this.getRestoredEmployee();
  }

  
  private _filterEmployees(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.name.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterEmployeesByCompany(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => {
      console.log(emp.company.name);
      emp.company.name.toLowerCase().indexOf(filterValue) === 0
    }
  );
  }

  private _filterEmployeesByAddress(value: string): Employee[] {
    const filterValue = value.toLowerCase();

    return this.employees.filter(emp => emp.address.street.toLowerCase().indexOf(filterValue) === 0);
  }

  getAllEmployeeList() {

    this.employeeService.getEmployeeList().subscribe(
      (res) => {
        this.employeeLists = res;
        console.log('Response:', res);
        this.employees = this.employeeLists;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  searchByName(event) {
    console.log('Search:', event);
    // this.getAllEmployeeList();
    if(event) {
      this.employeeLists = this.employeeLists.filter(element => {
        if(element.name === event) {
          console.log('Searched List');
          return element;
        }
      });
    } else {
      this.getAllEmployeeList();
    }
  }

  searchByAddress(event) {
    console.log('Search:', event);
    // this.getAllEmployeeList();
    if(event) {
      this.employeeLists = this.employeeLists.filter(element => {
        if(element.address.street === event) {
          console.log('Searched List');
          return element;
        }
      });
    } else {
      this.getAllEmployeeList();
    }
  }

  searchByCompany(event) {
    console.log('Search:', event);
    // this.getAllEmployeeList();
    if(event) {
      this.employeeLists = this.employeeLists.filter(element => {
        if(element.company.name === event) {
          console.log('Searched List');
          return element;
        }
      });
    } else {
      this.getAllEmployeeList();
    }
  }

  openDialog(empId, i): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '271px',
      panelClass: 'my-dialog',
      data: { value: empId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('EmployeeId', this.employeeLists[i]);
      }
    });  
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(PopupComponent, {
      width: '271px',
      panelClass: 'my-dialog',
      // data: { value: empId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        console.log('EmployeeId');
        // this.employeeLists[i].deleteStatus = 'Yes';
      }
    });
  }

  deleteEmp(empId, i) {
    console.log('Employee Deleted ID:', empId);
    console.log('Employee Deleted Record:', this.employeeLists[i]);
    this.employeeService.setData(this.employeeLists[i]);
    this.employeeLists = this.employeeLists.filter(element => {
      if(element.id !== this.employeeLists[i].id) {
        console.log('Filtered List');
        return element;
      }
    });
    console.log('Filtered List', this.employeeLists);
  }

  getRestoredEmployee() {
    this.employeeService.getData().subscribe(data => {
      // do stuff with the data, for example:
      this.restoredEmployee = data.text;
      console.log('Restored Employee:', this.restoredEmployee);
      this.makeList();     
    }
    );
  }

  makeList() {
    this.employeeLists.push(this.restoredEmployee);
    console.log('Restored Employee Lists: ', this.employeeLists);
  }

}
