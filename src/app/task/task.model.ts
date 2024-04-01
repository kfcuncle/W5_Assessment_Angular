export class Task {
  public id: number;
  public title: string;
  public description: string;
  public category: string;
  public dueDate: Date;

  constructor(
    id: number,
    title: string,
    description: string,
    category: string,
    dueDate: Date
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.category = category;
    this.dueDate = dueDate;
  }
}
