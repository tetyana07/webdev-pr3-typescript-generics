import { BaseEntity } from "../types/base.types";
import { IRepository } from "./repository.interface";
import { UpdateDto } from "../types/dto.types";

export class InMemoryRepository<T extends BaseEntity> implements IRepository<T> {
  protected items: Map<string, T> = new Map();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Сутність з id=${item.id} уже існує`);
    }
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | null {
    return this.items.get(id) ?? null;
  }

  findAll(): T[] {
    return [...this.items.values()];
  }

  deleteById(id: string): boolean {
    return this.items.delete(id);
  }
    update(id: string, patch: UpdateDto<T>): T | null {
    const existing = this.items.get(id);
    if (!existing) return null;

    const updated = Object.assign(
      Object.create(Object.getPrototypeOf(existing)),
      existing,
      patch,
      { id: existing.id, createdAt: existing.createdAt, updatedAt: new Date() },
    ) as T;

    this.items.set(id, updated);
    return updated;
  }
}
