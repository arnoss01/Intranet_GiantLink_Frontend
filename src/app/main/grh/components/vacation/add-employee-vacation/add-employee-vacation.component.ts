import { Component, OnInit } from "@angular/core";
// import { Router } from "@angular/router";
// import {
//   NgbCalendar,
//   NgbDate,
//   NgbDateParserFormatter,
//   NgbDateStruct,
// } from "@ng-bootstrap/ng-bootstrap";
// import { Employee } from "../../../models/employee.model";
// import { HolidayBalance } from "../../../models/holiday-balance.model";
// import { RhRequestHoliday } from "../../../models/rh-request-holiday.model";
// import { RhRequest } from "../../../models/rh-request.model";
// import { EmployeeService } from "../../../services/employee.service";
// import { HolidayBalanceService } from "../../../services/holiday-balance.service";
// import { HolidayService } from "../../../services/holiday.service";
// import { RequestServiceService } from "../../../services/request-service.service";

@Component({
  selector: "app-employee-vacation",
  templateUrl: "./add-employee-vacation.component.html",
  styleUrls: ["./add-employee-vacation.component.scss"],
})
export class AddEmployeeVacationComponent implements OnInit {
  ngOnInit(): void {
    throw new Error("Method not implemented.");
  }
  // public hoveredDate: NgbDate | null = null;
  // public fromDate: NgbDate | null;
  // public toDate: NgbDate | null;
  // //public selectBasic: any[] = [];
  // public selectBasicLoading = false;
  // public contentHeader: object;
  // employees: Employee[];
  // holidayBalance: HolidayBalance;
  // balance: number = 0;
  // msgd: string = "";
  // ppdisabled: boolean = false;
  // paidOrUnpaid: any;
  // public today = this.calendar.getToday();
  // public basicDPdata: NgbDateStruct;
  // page = 1;
  // count = 0;
  // public sizeSelect: number = 2;
  // name = "";
  // public totalPages = 0;
  // request: RhRequest = {
  //   id: null,
  //   datetime: null,
  //   employee_id: null,
  // };
  // holidayRequest: RhRequestHoliday = {
  //   id: null,
  //   holidayTitle: "",
  //   holidayType: "",
  //   messageDetails: "",
  //   startDate: null,
  //   finishDate: null,
  //   rhRequest_id: null,
  // };
  // /*  paidHoliday: RhRequestPaidHoliday = {
  //     holidayBalance_id: null,
  //     messageDetails: "",
  //     rhRequestHoliday_id: null
  //   }
  //   unpaidHoliday: RhRequestUnpaidHoliday = {
  //     messageDetails: "",
  //     rhRequestHoliday_id: null
  //   }
  // */
  // constructor(
  //   private router: Router,
  //   private calendar: NgbCalendar,
  //   public formatter: NgbDateParserFormatter,
  //   private employeeService: EmployeeService,
  //   private rhService: RequestServiceService,
  //   private holidayService: HolidayService,
  //   private holidaybalanceService: HolidayBalanceService
  // ) {}
  // ngOnInit(): void {
  //   this.getAllEmployee();
  //   this.contentHeader = {
  //     headerTitle: "grh",
  //     actionButton: true,
  //     breadcrumb: {
  //       type: "",
  //       links: [
  //         {
  //           name: "Home",
  //           isLink: true,
  //           link: "/",
  //         },
  //         {
  //           name: "Holiday",
  //           isLink: true,
  //           link: "/",
  //         },
  //         {
  //           name: "Add Holidays",
  //           isLink: false,
  //         },
  //       ],
  //     },
  //   };
  // }
  // getAllEmployee(): void {
  //   const params = {
  //     page: this.page - 1,
  //     size: this.sizeSelect,
  //     name: this.name,
  //   };
  //   this.employeeService.getEmployees(params).subscribe({
  //     next: (response: any) => {
  //       const { content, totalElements, totalPages } = response;
  //       this.count = totalElements;
  //       this.totalPages = totalPages * 10;
  //       this.employees = response.content;
  //       console.log(this.employees);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
  // getBalance(e) {
  //   this.request.employee_id = e;
  //   this.holidaybalanceService.getBalanceByEmployee(e).subscribe({
  //     next: (value: any) => {
  //       this.holidayBalance = value;
  //       this.balance = value.balance;
  //       if (value.balance < 1) {
  //         this.ppdisabled = true;
  //       }
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
  // pop(e) {
  //   this.paidOrUnpaid = e;
  //   this.holidayRequest.holidayType = e;
  // }
  // async saveConge() {
  //   this.rhService.createRhRequest(this.request).subscribe({
  //     next: (data) => {
  //       this.holidayRequest.rhRequest_id = data.id;
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   this.holidayService.createHoliday(this.holidayRequest).subscribe({
  //     next: (data) => {
  //       this.router.navigate(["/all-vacation"]);
  //     },
  //     error: (err) => {
  //       console.error(err);
  //     },
  //   });
  // }
  // layoutRT(e: any) {
  //   console.log(e.target.value);
  //   /*if (e.target.value === 1) {
  //     el.style.display = 'block';
  //   } else {
  //     el.style.display = 'none';
  //   }*/
  // }
  // onDateSelection(date: NgbDate) {
  //   if (!this.fromDate && !this.toDate) {
  //     this.fromDate = date;
  //     this.holidayRequest.startDate = new Date(
  //       date.year,
  //       date.month - 1,
  //       date.day
  //     );
  //   } else if (
  //     this.fromDate &&
  //     !this.toDate &&
  //     date &&
  //     date.after(this.fromDate)
  //   ) {
  //     this.toDate = date;
  //     this.holidayRequest.finishDate = new Date(
  //       date.year,
  //       date.month - 1,
  //       date.day
  //     );
  //   } else {
  //     this.toDate = null;
  //     this.fromDate = date;
  //     console.log(this.fromDate);
  //   }
  // }
  // onDateTimeSelected(date: NgbDate) {
  //   //this.request.datetime = new Date(date.year, date.month - 1, date.day);
  // }
  // isHovered(date: NgbDate) {
  //   return (
  //     this.fromDate &&
  //     !this.toDate &&
  //     this.hoveredDate &&
  //     date.after(this.fromDate) &&
  //     date.before(this.hoveredDate)
  //   );
  // }
  // isInside(date: NgbDate) {
  //   return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  // }
  // isRange(date: NgbDate) {
  //   return (
  //     date.equals(this.fromDate) ||
  //     (this.toDate && date.equals(this.toDate)) ||
  //     this.isInside(date) ||
  //     this.isHovered(date)
  //   );
  // }
}
