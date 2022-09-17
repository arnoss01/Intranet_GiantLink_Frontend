import { RhWarningType } from "./rh-warning-type.model";

export class RhWarning {
  id: number;
  employee_id: number;
  rhWarningType_id: number;
  warningType: RhWarningType;
  messageDetail: String;
  datetime: Date;

  constructor(
    employee_id: number,
    rhWarningType_id: number,
    warningType: RhWarningType,
    messageDetail: String,
    datetime: Date
  ) {
    this.employee_id = employee_id;
    this.rhWarningType_id = rhWarningType_id;
    this.warningType = warningType;
    this.messageDetail = messageDetail;
    this.datetime = datetime;
  }
}
