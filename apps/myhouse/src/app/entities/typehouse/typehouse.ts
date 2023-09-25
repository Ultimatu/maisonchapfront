
export interface ITypeHouse {
  id?: number | null;
  type?: string | null;
  description?: string | null;
  dateCreation?:  Date | null;
  updatedAt?:  Date | null;
}

export type NewTypeHouse = Omit<ITypeHouse, 'id'> & { id: null };
