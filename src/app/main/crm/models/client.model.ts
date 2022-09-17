import { ThrowStmt } from "@angular/compiler";
import { Lead } from "./lead.model";

export class Client {

    id:number;
    firstName:string;
	lastName:string;
    adress:string;
    tele:string;
	email:string;
	gsm:string;
	cp:string;
	city:string;
    leads:Array<Lead>=[];

    constructor(id:number, firstName:string, lastName:string, adress:string, tele:string, email:string,
         gsm:string, cp:string, city:string){

            this.firstName = firstName;
            this.lastName = lastName;
            this.adress = adress;
            this.tele = tele;
            this.email = email;
            this.gsm = gsm;
            this.cp = cp;
            this.city = city;
    }
    


	
}
