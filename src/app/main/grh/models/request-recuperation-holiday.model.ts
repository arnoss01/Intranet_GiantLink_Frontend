import { Employee } from "./employee.model";
import { RhRequest } from "./rh-request.model";

export class RequestRecuperationHoliday extends RhRequest {
  numberofdays: number;
  startDate: Date;
  startTime: Date;
  finishDate: Date;
  finishTime: Date;
  returnDate: Date;
  returnTime: Date;

  constructor(
    employee: Employee,
    city: String,
    employee_id: number,
    requeststatus_id: number,
    numberofdays: number,
    startDate: Date,
    startTime: Date,
    finishDate: Date,
    finishTime: Date,
    returnDate: Date,
    returnTime: Date
  ) {
    super(employee, city, employee_id, requeststatus_id);
    this.numberofdays = numberofdays;
    this.startDate = startDate;
    this.startTime = startTime;
    this.finishDate = finishDate;
    this.finishTime = finishTime;
    this.returnDate = returnDate;
    this.returnTime = returnTime;
  }
}
