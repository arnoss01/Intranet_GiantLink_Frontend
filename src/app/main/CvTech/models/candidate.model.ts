export class Candidate {

    id: number;
    civility: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    adress: string;
    city: string;
    country: string;
    birthDate: Date;
    availability: string;
    message: string

    constructor(id: number, civility: string, firstName: string, lastName: string, email: string, phone: string, adress: string,
        city: string, country: string, birthDate: Date, availability: string, message: string) {
        this.id = id;
        this.civility = civility;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.adress = adress;
        this.city = city;
        this.country = country;
        this.birthDate = birthDate;
        this.availability = availability;
        this.message = message;
    }
}
