import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";

export class Student extends Entity {
  public id: string;
  public name: string;

  constructor(name: string, content: string, id?: string) {
    this.name = name;
    this.id = id ?? randomUUID();
  }
}
