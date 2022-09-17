import { Employee } from "./employee.model";
import { RhRequest } from "./rh-request.model";

export class RequestAbsence extends RhRequest {
  reason: String;
  absenceDate: Date;
  exitTime: Date;
  entryTime: Date;

  constructor(
    employee: Employee,
    city: String,
    employee_id: number,
    requeststatus_id: number,
    reason: String,
    absenceDate: Date,
    exitTime: Date,
    entryTime: Date
  ) {
    super(employee, city, employee_id, requeststatus_id);
    this.reason = reason;
    this.absenceDate = absenceDate;
    this.exitTime = exitTime;
    this.entryTime = entryTime;
  }
}
