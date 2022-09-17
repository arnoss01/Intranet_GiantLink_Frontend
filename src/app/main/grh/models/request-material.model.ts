import { Employee } from "./employee.model";
import { Material } from "./material.model";
import { RhRequest } from "./rh-request.model";

export class RequestMaterial extends RhRequest {
  numberofdays: number;
  startDate: Date;
  returnDate: Date;
  agreement: Boolean;
  materials: Array<Material> = [];

  constructor(
    employee: Employee,
    city: String,
    employee_id: number,
    requeststatus_id: number,
    numberofdays: number,
    startDate: Date,
    returnDate: Date,
    agreement: Boolean,
    materials: Array<Material>
  ) {
    super(employee, city, employee_id, requeststatus_id);
    this.numberofdays = numberofdays;
    this.startDate = startDate;
    this.returnDate = returnDate;
    this.agreement = agreement;
    this.materials = materials;
  }
}
