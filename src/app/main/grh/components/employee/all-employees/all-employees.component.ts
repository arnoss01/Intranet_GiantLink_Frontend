import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Employee } from "../../../models/employee.model";
import { EmployeeService } from "../../../services/employee.service";
import { HolidayBalance } from "../../../models/holiday-balance.model";

@Component({
  selector: "app-all-employees",
  templateUrl: "./all-employees.component.html",
  styleUrls: ["./all-employees.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AllEmployeesComponent implements OnInit {
  contentHeader: {
    headerTitle: string;
    actionButton: boolean;
    breadcrumb: {
      type: string;
      links: (
        | { name: string; isLink: boolean; link: string }
        | { name: string; isLink: boolean; link?: undefined }
      )[];
    };
  };

  holidaybalance: HolidayBalance = {
    id: 0,
    balance: 0,
    timestamp: null,
  };

  employees?: Employee[];
  employee: Employee = {
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    holidaybalance_id: 0,
    warnings: [],
    requestHolidays: [],
    requestAbsences: [],
    requestDepartures: [],
    requestMaterials: [],
    requestRecuperationHolidays: [],
    visits: [],
    holidayBalance: this.holidaybalance,
  };

  constructor(
    private modalService: NgbModal,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.getAllEmployees();

    this.contentHeader = {
      headerTitle: "Employees",
      actionButton: true,
      breadcrumb: {
        type: "",
        links: [
          {
            name: "Home",
            isLink: true,
            link: "/home",
          },
          {
            name: "Employees",
            isLink: false,
          },
        ],
      },
    };
  }

  //pagination

  page = 1;
  count = 0;
  firstName = "";
  totalPages = 0;
  chkBoxSelected = [];
  pageSize = 4;
  totalEmployees: number;

  public pageChanged(event: any): void {
    this.page = event;
    this.getAllEmployees();
  }

  getParams(page: number, pageSize: number, firstName: string) {
    let params: any = {};
    if (page) {
      params["page"] = page - 1;
    }
    if (pageSize) {
      params["size"] = pageSize;
    }
    if (firstName) {
      params["firstName"] = firstName;
    }
    return params;
  }

  // get employees

  public getAllEmployees() {
    this.employeeService
      .getEmployees(this.getParams(this.page, this.pageSize, this.firstName))
      .subscribe(
        (response) => {
          this.employees = response["content"];
          this.totalPages = response["totalPages"];
          this.count = response["totalElements"];
          this.totalEmployees = response["totalElements"];
        },
        (error) => {
          console.log(error);
        }
      );
  }

  //search for employees by first name

  searchEmployees(key: string): void {
    if (key === null || key === "") {
      this.getAllEmployees();
      return;
    }

    const filteredEmployees = this.employees.filter((employee) =>
      employee.firstName.toLowerCase().includes(key.toLowerCase())
    );

    this.employees = filteredEmployees;
  }
}
