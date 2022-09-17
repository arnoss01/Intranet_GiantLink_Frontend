import { Service } from "./service.model";

export class ServiceType {
    
    id:number;
    libelle:string;
	
    services:Array<Service>=[];

    constructor(libelle:string){
        this.libelle = libelle;
    }

   
}
