
export class Campaign {
    id: number;
    name: string;
    description: string;
    nbPositions: number;
    closingDate: Date;
    regionsIds: number[];

    constructor(name: string, description: string, nbPositions: number, closingDate: Date, regionsIds: number[]) {
        this.name = name;
        this.description = description;
        this.nbPositions = nbPositions;
        this.closingDate = closingDate;
        this.regionsIds = regionsIds;
    }
}
