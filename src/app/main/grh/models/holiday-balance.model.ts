export class HolidayBalance {
  id: number;
  balance: number;
  timestamp: Date;

  public constructor(balance: number) {
    this.balance = balance;
  }
}
