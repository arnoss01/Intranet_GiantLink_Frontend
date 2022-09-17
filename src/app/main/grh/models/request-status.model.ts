import { RhRequest } from "./rh-request.model";

export class RequestStatus {
  id: number;
  name: string;
  rhrequests: Array<RhRequest> = [];

  constructor(name: string) {
    this.name = name;
  }
}
