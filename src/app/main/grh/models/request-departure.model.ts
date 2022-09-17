import { Employee } from "./employee.model";
import { RhRequest } from "./rh-request.model";

export class RequestDeparture extends RhRequest {
  reason: String;
  departureDate: Date;
  exitTime: Date;
  finishDate: Date;
  finishTime: Date;

  constructor(
    employee: Employee,
    city: String,
    employee_id: number,
    requeststatus_id: number,
    reason: String,
    departureDate: Date,
    exitTime: Date,
    finishTime: Date
  ) {
    super(employee, city, employee_id, requeststatus_id);
    this.reason = reason;
    this.departureDate = departureDate;
    this.exitTime = exitTime;
    this.finishTime = finishTime;
  }
}
