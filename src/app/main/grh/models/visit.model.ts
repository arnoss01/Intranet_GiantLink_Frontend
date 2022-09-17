export class Visit {
  id: number;
  datetime: string;
  name: string;
  cin: string;
  visitPurpose: string;
  observation: string;
  employee_id: number;

  constructor(
    name: string,
    datetime: string,
    cin: string,
    visitPurpose: string,
    observation: string,
    employee_id: number
  ) {
    this.name = name;
    this.cin = cin;
    this.visitPurpose = visitPurpose;
    this.observation = observation;
    this.employee_id = employee_id;
    this.datetime = datetime;
  }
}
