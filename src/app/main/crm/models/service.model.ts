import { Lead } from "./lead.model";
import { ServiceType } from "./service-type.model";

export class Service {

    id:number;
    serviceName:string;
	point:any;
	statut:Boolean;
	serviceType:ServiceType;
	
    leads:Array<Lead>=[];

    constructor(serviceName:string, point:any, statut:Boolean, serviceType:ServiceType){
        this.serviceName = serviceName;
        this.point = point;
        this.statut = statut;
        this.serviceType = serviceType;
    }

   
}
