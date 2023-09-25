import {IUser} from "../../entities/user/user";
import {ITypeHouse} from "../../entities/typehouse/typehouse";
import {IStatus} from "../../entities/status/status";



export interface IHouse {
  id: number | null | undefined;
  title?: string | null;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  numberOfRooms?: string | null;
  numberOfBathrooms?: string | null;
  numberOfFloors?: string | null;
  price?: string | null;
  surface?: string | null;
  disponibility?: string | null;
  user?: Pick<IUser, 'id'> | null;
  typeHouse?: Pick<ITypeHouse, 'id'> | null;
  status?: Pick<IStatus, 'id'> | null;

}

export type NewHouse = Omit<IHouse, 'id'> & { id: null };


export class House {
  id: number |null| undefined;
  address: string | null | undefined;
  city: string | null | undefined;
  country: string | null | undefined;
  description: string | null | undefined;
  disponibility: string | null | undefined;
  numberOfBathrooms: string | null | undefined;
  numberOfFloors: string | null | undefined;
  numberOfRooms: string | null | undefined;
  price: string | null | undefined;
  status: Pick<IStatus, "id"> | null | undefined;
  surface: string | null | undefined;
  title: string | null | undefined;
  typeHouse: Pick<ITypeHouse, "id"> | null | undefined;
  user: Pick<IUser, "id"> | null | undefined;

}
