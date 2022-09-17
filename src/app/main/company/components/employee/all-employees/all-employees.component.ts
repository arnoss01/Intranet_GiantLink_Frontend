import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { CoreConfigService } from '@core/services/config.service';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { Employee } from 'app/main/company/models/employee.model';
import { EmployeeService } from 'app/main/company/services/employee.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-employees',
  templateUrl: './all-employees.component.html',
  styleUrls: ['./all-employees.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AllEmployeesComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }






}