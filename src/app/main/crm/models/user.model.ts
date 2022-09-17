import { Team } from "./team.model";

export class User {

    id: number;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    language: string;
    role: string;
    teams: Team[];

    constructor(id: number, firstName: string, lastName: string, userName: string, password: string, language: string, role: string, teams: Team[]) {
        this.id = id;
        this.firstName = firstName
        this.lastName = lastName;
        this.userName = userName;
        this.userName = userName;
        this.password = password;
        this.language = language;
        this.role = role;
        this.teams = teams;

    }
}
