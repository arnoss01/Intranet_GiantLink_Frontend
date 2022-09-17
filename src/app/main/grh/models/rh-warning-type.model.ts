import { RhWarning } from "./rh-warning.model";

export class RhWarningType {
  id: number;
  title: String;
  datetime: Date;
  description: String;
  warnings: Array<RhWarning> = [];

  constructor(title: String, description: String) {
    this.title = title;
    this.description = description;
  }
}
