export interface BaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<TData> {
  success: boolean;
  data: TData;
  timestamp: Date;
  meta?: Record<string, unknown>;
}
