
import {Training} from "./training.model";


export class Project {

    id : number;
    name : string ;
    description : string;
    trainings : Training[];


    constructor(id: number, name: string, description: string) {
        this.id = id;
        this.name = name;
        this.description = description;
    }
}
