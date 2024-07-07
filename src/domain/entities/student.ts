import { randomUUID } from "crypto";

class Student {
  public id: string;
  public name: string;

  constructor( name: string, content: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
