export class Contrat {
    id: number;
    name: String;
    description: String;
    campaignId : number;

    constructor(name: String, description: String , campaignId : number) {
        this.name = name;
        this.description = description;
        this.campaignId = campaignId;
    }



}


