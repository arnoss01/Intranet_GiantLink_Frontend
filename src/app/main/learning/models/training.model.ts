export class Training {

id : number ;
name : string;
description : string
start_Date : Date;
last_Update : Date;


    constructor(id: number, name: string, start_Date: Date, last_Update: Date , description : string)
    {
        this.id = id;
        this.name = name;
        this.start_Date = start_Date;
        this.last_Update = last_Update;
        this.description = description;
    }


}
