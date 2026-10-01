import { randomUUID } from "node:crypto";
import { LogExecutionTime } from "../decorators";
import { CreateDto, EntityAnalytics, EntityStatus, GadgetEntity, UpdateDto } from "../types";
import { InMemoryRepository } from "./in-memory.repository";

export class GadgetRepository extends InMemoryRepository<GadgetEntity> {
  @LogExecutionTime()
  createFromDto(dto: CreateDto<GadgetEntity>): GadgetEntity {
    const now = new Date();
    const entity = new GadgetEntity(
      randomUUID().slice(0, 8),
      dto.title,
      dto.price,
      dto.warrantyMonths,
      dto.specs,
      dto.status,
      now,
      now,
    );
    return super.create(entity);
  }

  @LogExecutionTime()
  override update(id: string, patch: UpdateDto<GadgetEntity>): GadgetEntity | null {
    return super.update(id, patch);
  }

  @LogExecutionTime()
  override findAll(): GadgetEntity[] {
    return super.findAll();
  }

  getStatusAnalytics(): EntityAnalytics<GadgetEntity> {
    const stats: EntityAnalytics<GadgetEntity> = {
      [EntityStatus.Active]: 0,
      [EntityStatus.Archived]: 0,
      [EntityStatus.Draft]: 0,
    };
    for (const item of this.items.values()) stats[item.status]++;
    return stats;
  }
}