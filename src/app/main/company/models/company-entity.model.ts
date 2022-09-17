import { EntityDepartment } from "./entity-department.model";


export class CompanyEntity {

    id:number;
    name:string;
    timestamp:string;
    departements:Array<EntityDepartment>=[];
    company_id:number;
    
}
