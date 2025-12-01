export interface IRemoveRepository {
  hardDelete(id: number): Promise<{ message: string }>;
  softDelete(id: number): Promise<{ message: string }>;
  restore(id: number): Promise<{ message: string }>;
}
