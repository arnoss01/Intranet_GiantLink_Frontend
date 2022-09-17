import { Employee } from "./employee.model";
import { EntityDepartment } from "./entity-department.model";

export class Team {

    id:number;
    teamName:string;
	teamDesc:string;
	departement_id:number;
    employees:Array<Employee>=[];
    departement:EntityDepartment;

    constructor(teamName:string,teamDesc:string){
        this.teamName=teamName;
        this.teamDesc=teamDesc;
    }
}
