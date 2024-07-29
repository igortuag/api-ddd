import { randomUUID } from "crypto"

export class Entity {
  private _id: string
  protected props: any

  get id() {
    return this._id
  }

  constructor(props: any, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }
}