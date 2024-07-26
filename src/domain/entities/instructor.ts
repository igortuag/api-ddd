import { randomUUID } from "crypto";
import { Entity } from "../../core/entities/entity";

interface InstructorProps {
  name: string;
}
export class Instructor extends Entity {
  public id: string;
  public name: string;

  constructor(props: InstructorProps, id?: string) {
    this.name = props.name;
    this.id = id ?? randomUUID();
  }
}