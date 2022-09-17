import { Project } from "./project.model";

export class Option {

    id:number;
    optionName:string;
	project:Project;
	

    constructor(optionName:string, project:Project){
        this.optionName = optionName;
        this.project = project;
    }
}
