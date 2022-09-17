import { Project } from "./project.model";
import { User } from "./user.model";

export class Team {
    id: number;
    teamName: string;
    team_users: User[];
    project: Project;

    constructor(id: number, teamName: string, team_users: User[], project: Project) {
        this.id = id;
        this.teamName = teamName;
        this.team_users = team_users;
        this.project = project;
    }
}
