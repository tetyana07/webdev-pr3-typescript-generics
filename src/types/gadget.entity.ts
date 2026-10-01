import { FrozenEntity } from "../decorators";
import { BaseEntity } from "./base.types";
import { EntityStatus } from "./entity-status.enum";

@FrozenEntity()
export class GadgetEntity implements BaseEntity {
  constructor(
    public id: string,
    public title: string,
    public price: number,
    public warrantyMonths: number,
    public specs: [cpu: string, ramGb: number],
    public status: EntityStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}

