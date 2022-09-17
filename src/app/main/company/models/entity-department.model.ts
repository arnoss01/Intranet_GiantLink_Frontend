import { CompanyEntity } from "./company-entity.model";

export class EntityDepartment {
    id:number;
    name:string;
    timestamp:string;
    entity:CompanyEntity;
    entity_id:number;
    
    constructor (name:string){
        this.name=name;
    }
}
