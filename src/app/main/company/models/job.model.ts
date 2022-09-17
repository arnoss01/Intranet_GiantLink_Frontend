import { Project } from "app/main/crm/models/project.model";

export class Job {

    id:number;
    name:string;
	description:string;
    project:Project;
    project_id:number;

    constructor(name:string,description:string){
        this.name=name;
        this.description=description;
    }
}

