import { Employee } from "./employee.model";

export abstract class RhRequest {
  id: number;
  requestDate: Date;
  city: String;
  employee_id: number;
  requeststatus_id: number;
  employee: Employee;

  constructor(
    employee: Employee,
    city: String,
    employee_id: number,
    requeststatus_id: number
  ) {
    this.employee = employee;
    this.city = city;
    this.employee_id = employee_id;
    this.requeststatus_id = requeststatus_id;
  }
}
