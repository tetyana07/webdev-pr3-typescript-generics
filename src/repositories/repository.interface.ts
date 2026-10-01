import { BaseEntity } from "../types/base.types";
import { UpdateDto } from "../types/dto.types";

export interface IRepository<T extends BaseEntity> {
  create(item: T): T;
  findById(id: string): T | null;
  findAll(): T[];
  deleteById(id: string): boolean;
  update(id: string, patch: UpdateDto<T>): T | null;
}

