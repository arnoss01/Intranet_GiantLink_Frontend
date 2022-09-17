import { CompanyEntity } from "./company-entity.model";

export class Company {

    id:number;
    name:string;
	address:string;
	email:string;
	phoneNumber:string;
	image:string;
	webSite:string;
    timestamp:string;
    entities:Array<CompanyEntity>=[];

    constructor(name:string,address:string,email:string,phonenumber:string,website:string){
        this.name=name;
        this.address=address;
        this.email=email;
        this.phoneNumber=phonenumber;
        this.webSite=website;
    }
}
