import { Lead } from "./lead.model";

export class Commercial {

    id:number;
    commercialName:string;
	statut:Boolean;
	
    leads:Array<Lead>=[];

    constructor(commercialName:string, statut:Boolean){
        this.commercialName = commercialName;
        this.statut = statut;
        
    }

    
}
