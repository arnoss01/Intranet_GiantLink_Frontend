import { Campaign } from "./campaign.model";

export class Candidacy {
    id: number;
    status: string;
    candidacyDate: Date;
    qualifications: any[];
    campaign: Campaign;
    cv: any;
    constructor(id: number, status: string, candidacyDate: Date, qualifications: any[], campaign: Campaign, cv: any) {
        this.status = status;
        this.candidacyDate = candidacyDate;
        this.qualifications = qualifications;
        this.campaign = campaign;
        this.cv = cv;
    }
}
