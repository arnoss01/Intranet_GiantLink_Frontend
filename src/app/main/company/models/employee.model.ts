export class Employee {

    id: number;
    firstName: String;
    lastName:String;
    email: String;
    phoneNumber: number;
    hireDate: Date;
    team_id:number;
    //occupations:Array<Occupation>=[];
    

    constructor(firstName: String,lastName:String,email: String,phoneNumber: number,hireDate: Date){
        this.firstName = firstName;
        this.email = email;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
        this.hireDate = hireDate;
    }
    
}
