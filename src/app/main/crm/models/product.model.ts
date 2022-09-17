import { Lead } from "./lead.model";

export class Product {

    id:number;
    productName:string;
	
    leads:Array<Lead>=[];

    constructor(productName:string){
        this.productName = productName;
    }

}
