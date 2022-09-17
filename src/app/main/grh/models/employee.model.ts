import { HolidayBalance } from "./holiday-balance.model";
import { RequestAbsence } from "./request-absence.model";
import { RequestDeparture } from "./request-departure.model";
import { RequestHoliday } from "./request-holiday.model";
import { RequestMaterial } from "./request-material.model";
import { RequestRecuperationHoliday } from "./request-recuperation-holiday.model";
import { RhRequest } from "./rh-request.model";
import { RhWarning } from "./rh-warning.model";
import { Visit } from "./visit.model";

export class Employee {
  id: number;
  firstName: String;
  lastName: String;
  email: String;
  phoneNumber: String;
  holidaybalance_id: number;
  holidayBalance: HolidayBalance;
  warnings: Array<RhWarning> = [];
  requestHolidays: Array<RequestHoliday> = [];
  requestAbsences: Array<RequestAbsence> = [];
  requestDepartures: Array<RequestDeparture> = [];
  requestMaterials: Array<RequestMaterial> = [];
  requestRecuperationHolidays: Array<RequestRecuperationHoliday> = [];
  visits: Array<Visit> = [];

  constructor(
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: String,
    holidaybalance_id: number,
    holidaybalance: HolidayBalance
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.holidaybalance_id = holidaybalance_id;
    this.holidayBalance = holidaybalance;
  }
}
