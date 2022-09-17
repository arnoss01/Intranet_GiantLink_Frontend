export class Course {

    id: number;
    title: String;
    content: String;
    startDate: Date;
    updateDate: Date;

    constructor(title: String, content: String, startDate: Date, updateDate: Date) {
        this.title = title;
        this.content = content;
        this.startDate = startDate;
        this.updateDate = updateDate;
    }
}
