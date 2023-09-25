
export interface IStatus {
  id?: number | null;
  status?: string | null;
  description?: string | null;
  dateCreation?:  Date | null;
  updatedAt?: Date | null;
}

export type NewStatus = Omit<IStatus, 'id'> & { id: null };
