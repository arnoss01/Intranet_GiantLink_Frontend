import { Time } from "@angular/common";
import { Client } from "./client.model";
import { Commercial } from "./commercial.model";
import { Product } from "./product.model";
import { Service } from "./service.model";
import { User } from "./user.model";

export class Lead {

    id: number;
    user: User;
    commercial: Commercial;
    product: Product;
    client: Client;
    totalPoint: any;
    appointmentDate: Date;
    appointmentTime: Time;
    services: Array<Service> = [];

    constructor(user: User, commercial: Commercial, product: Product, client: Client, totalPoint: any, appointmentDate: Date, appointmentTime: Time) {
        this.user = user;
        this.commercial = commercial;
        this.product = product;
        this.client = client;
        this.totalPoint = totalPoint;
        this.appointmentDate = appointmentDate;
        this.appointmentTime = appointmentTime;
    }

}
